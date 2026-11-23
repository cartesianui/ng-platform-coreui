import { InjectionToken } from '@angular/core';

/**
 * Per-app wiring for the user menu's Settings links. The menu is shared by
 * every app, but each app mounts `@cartesianui/system-settings` under its own
 * shell (`/admin/settings`, `/pos/settings`, …), so the base path cannot be
 * hard-coded here.
 */
export interface UserMenuConfig {
  /** Where the app mounts the `@cartesianui/system-settings` routes. */
  settingsPath: string;
  /** Show Tenant / Domain Settings (still only for host/tenant admins). */
  showWorkspaceSettings: boolean;
}

export const DEFAULT_USER_MENU_CONFIG: UserMenuConfig = {
  settingsPath: '/admin/settings',
  showWorkspaceSettings: true
};

/** Override per app: `{ provide: USER_MENU_CONFIG, useValue: { settingsPath: '/pos/settings' } }`. */
export const USER_MENU_CONFIG = new InjectionToken<Partial<UserMenuConfig>>('USER_MENU_CONFIG');
