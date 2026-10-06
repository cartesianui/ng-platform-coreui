import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntitlementsService, PermissionCheckerService } from '@cartesianui/platform-core';
import { INavDataWithPermission } from '../types';
import { NavFilterService } from '../services/nav-filter.service';
import { resolveNavLabels } from '../utils/nav-label.util';

/**
 * Sidebar-less shell (POS / Care): the filtered nav is rendered as
 * horizontal links in the header instead of a side rail. We still resolve
 * `data.navItems` here (permission/role/entitlement filtered + labels),
 * then hand the list to <app-default-header> via its `navItems` input.
 */
@Component({
  selector: 'app-workspace-layout',
  templateUrl: './workspace-layout.component.html',
  standalone: false
})
export class WorkspaceLayoutComponent {
  protected permissionService = inject(PermissionCheckerService);
  private navFilterService = inject(NavFilterService);
  private entitlementsService = inject(EntitlementsService);

  public navItems: INavDataWithPermission[] = [];

  private readonly rawNavItems: INavDataWithPermission[];

  public constructor(private route: ActivatedRoute) {
    this.rawNavItems = route.snapshot.data['navItems'];

    // Entitlements load asynchronously (one HTTP round-trip after boot,
    // fail-open until then — see EntitlementsService). `rebuild()` reads
    // `entitlementsService.has()`, which reads the `loaded` signal, so this
    // effect re-runs once more when `loaded` flips true — same pattern as
    // ConsoleLayoutComponent (the sidebar shell) uses for the same reason.
    effect(() => this.rebuild());
  }

  private rebuild(): void {
    // No cast needed anymore — getGrantedPermissions() is honestly typed
    // string[] now (RPH-020); the old `as unknown as string[]` papered over
    // a stale map-shaped annotation.
    const grantedPermissions = this.permissionService.getGrantedPermissions();
    const assignedRoles = this.permissionService.getAllAssignedRoles();
    const hasEntitlement = (key: string) => this.entitlementsService.has(key);

    const filtered = this.navFilterService.filterNavByPermissionsAndRoles(
      this.rawNavItems,
      grantedPermissions,
      assignedRoles,
      false,
      hasEntitlement
    );
    this.navItems = resolveNavLabels(filtered);
  }
}
