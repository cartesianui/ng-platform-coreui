import { Component, computed, inject, Input } from '@angular/core';
import { AuthHttpService, SessionService, TokenService } from '@cartesianui/platform-core';
import { HeaderActionsService } from '../../services/header-actions.service';
import { UserMenuSectionsService } from '../../services/user-menu-sections.service';

/**
 * Shared user menu — avatar trigger + dropdown (profile / settings /
 * feature-contributed sections / logout). Placed either in the sidebar FOOTER
 * (console / sidebar apps, `placement="sidebar"`) or in the HEADER top-right
 * (topnav apps, `placement="header"`).
 *
 * The menu is shell-only: feature-contributed groups (e.g. shopifier's store
 * switcher) arrive generically via `UserMenuSectionsService`, so this stays
 * free of any feature/domain knowledge.
 */
@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  standalone: false
})
export class UserMenuComponent {
  /** 'header' = topnav pill; 'sidebar' = sidebar-footer card. */
  @Input() placement: 'header' | 'sidebar' = 'header';

  readonly #sessionService = inject(SessionService);
  readonly #tokenService = inject(TokenService);
  readonly #authHttp = inject(AuthHttpService);
  readonly #headerActions = inject(HeaderActionsService);
  readonly #menuSections = inject(UserMenuSectionsService);

  /** Feature-contributed actions (e.g. POS/Care "Done for Today") — shown in
   *  the menu alongside Sign Out (moved out of the header). */
  readonly headerActions = this.#headerActions.actions;

  /** Feature-contributed dropdown groups (e.g. shopifier's store switcher). */
  readonly menuSections = this.#menuSections.sections;

  /** Resolved avatar URL with static fallback when no user image exists. */
  readonly avatarSrc = computed(() => this.#sessionService.thumbnailUrl ?? './assets/img/avatars/0.png');

  /** Display name for the trigger + dropdown card. */
  readonly displayName = computed(() => this.#sessionService.profileName ?? this.#sessionService.user?.name ?? this.#sessionService.user?.email ?? '');

  /** Email shown as the secondary line. */
  readonly displayEmail = computed(() => this.#sessionService.profileEmail ?? this.#sessionService.user?.email ?? '');

  /** Initials avatar (matches the source design — e.g. "James Wilson" → "JW"). */
  readonly initials = computed(() => {
    const name = (this.displayName() || '').trim();
    if (!name) return '?';
    const parts = name.split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase() || '?';
  });

  /** Tenant + domain settings are host/tenant-admin only. */
  readonly canManageWorkspace = computed(() => this.#sessionService.isHostAdmin || this.#sessionService.isTenantAdmin);

  logout(): void {
    // The HttpOnly `refreshToken` cookie (separate from the JS-visible
    // `Cartesian.AuthRefreshToken` one — see AuthHttpService) can only be
    // cleared by the server. Skipping this call is why logout "worked"
    // locally but CartesianHttpInterceptor would silently mint a fresh
    // access token off that cookie on the next 401. Wait for it (success
    // or failure — AuthHttpService already swallows errors) before wiping
    // local state and navigating away, so the request isn't cancelled
    // mid-flight by the redirect.
    this.#authHttp.logout().subscribe(() => {
      this.#tokenService.clearToken();
      this.#tokenService.clearRefreshToken();
      location.href = '/';
    });
  }
}
