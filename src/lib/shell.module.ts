import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
;

import { CommonModule as CartesianCommonModule } from '@cartesianui/platform-common';
import { SystemNotificationsBannerComponent } from '@cartesianui/system-notification';
import { CartaAssistantComponent } from '@cartesianui/ai-carta';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  DropdownModule,
  FooterModule,
  GridModule,
  HeaderModule,
  NavModule,
  ProgressModule,
  SharedModule as CoreUiAngularSharedModule,
  SidebarModule,
  UtilitiesModule,
  OffcanvasModule,
  // Standalone CoreUI components/directives
  ContainerComponent,
  ShadowOnScrollDirective,
  SidebarBrandComponent,
  SidebarComponent,
  SidebarFooterComponent,
  SidebarHeaderComponent,
  SidebarNavComponent,
  SidebarToggleDirective,
  SidebarTogglerDirective,
  AvatarComponent,
  BadgeComponent,
  BreadcrumbRouterComponent,
  DropdownComponent,
  DropdownDividerDirective,
  DropdownHeaderDirective,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownToggleDirective,
  HeaderComponent,
  HeaderNavComponent,
  HeaderTogglerDirective,
  NavItemComponent,
  NavLinkDirective,

  OffcanvasComponent as COffcanvasComponent,
  OffcanvasBodyComponent,
  OffcanvasHeaderComponent,
  OffcanvasTitleDirective,
  OffcanvasToggleDirective,
  ButtonCloseDirective,

  BreadcrumbComponent,
  BreadcrumbItemComponent,
  //BreadcrumbRouterService
} from '@coreui/angular';

import { IconModule, IconSetService, IconDirective } from '@coreui/icons-angular';

// Import 3rd party modules
import { NgScrollbarModule } from 'ngx-scrollbar';

import {
  DefaultFooterComponent,
  DefaultHeaderComponent,
  ConsoleLayoutComponent,
  DefaultPageTitleComponent,
  OffcanvasComponent,
  UserMenuComponent
} from './console';

import {
  WorkspaceLayoutComponent
} from './workspace';

const APP_CONTAINERS = [
  OffcanvasComponent,
  DefaultFooterComponent,
  DefaultHeaderComponent,
  UserMenuComponent,
  DefaultPageTitleComponent,
  ConsoleLayoutComponent,
  WorkspaceLayoutComponent,
];

@NgModule({
  imports: [
    // Angular core
    CommonModule,
    NgTemplateOutlet,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CartesianCommonModule,

    // 3rd party
    NgScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),

    // CoreUI NgModules
    IconModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    NavModule,
    ButtonModule,
    ProgressModule,
    BadgeModule,
    UtilitiesModule,
    CoreUiAngularSharedModule,
    OffcanvasModule,

    // Standalone CoreUI components/directives
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarBrandComponent,
    SidebarNavComponent,
    SidebarFooterComponent,
    SidebarToggleDirective,
    SidebarTogglerDirective,
    ContainerComponent,
    IconDirective,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ShadowOnScrollDirective,
    AvatarComponent,
    BadgeComponent,
    BreadcrumbRouterComponent,
    DropdownComponent,
    DropdownDividerDirective,
    DropdownHeaderDirective,
    DropdownItemDirective,
    DropdownMenuDirective,
    DropdownToggleDirective,
    HeaderComponent,
    HeaderNavComponent,
    HeaderTogglerDirective,
    NavItemComponent,
    NavLinkDirective,

    // CoreUI Offcanvas standalone components
    COffcanvasComponent,
    OffcanvasBodyComponent,
    OffcanvasHeaderComponent,
    OffcanvasTitleDirective,
    OffcanvasToggleDirective,
    ButtonCloseDirective,

    BreadcrumbComponent,
    BreadcrumbItemComponent,

    // System-notification banner (standalone) — owns its own HTTP fetch
    // + render. Slotted into the default layout's notification area.
    SystemNotificationsBannerComponent,

    // CartaAI assistant (standalone) — shell-level launcher + chat panel.
    // Slotted into the default header. Depends only on common/core (no
    // coreui dep), so importing it here introduces no dependency cycle.
    CartaAssistantComponent
  ],
  declarations: [...APP_CONTAINERS],
  providers: [
    IconSetService
  ],
  exports: [
    DefaultPageTitleComponent,
    OffcanvasComponent,
    // Exposed so feature shells (e.g. the AI Workforce layout) can reuse the
    // standard app header/footer/user-menu — an exact copy of the console
    // chrome, no theme changes.
    DefaultHeaderComponent,
    DefaultFooterComponent,
    UserMenuComponent,
    //BreadcrumbRouterService
  ]
})
export class ShellModule {
  static forRoot(): ModuleWithProviders<ShellModule> {
    return {
      ngModule: ShellModule,
      providers: []
    };
  }

  static forFeature(): ModuleWithProviders<ShellModule> {
    return {
      ngModule: ShellModule,
      providers: []
    };
  }
}
