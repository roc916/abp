import { AuthService, NAVIGATE_TO_MANAGE_PROFILE } from '@abp/ng.core';
import { UserMenuService } from '@abp/ng.theme.shared';
import { Injector, inject, provideAppInitializer } from '@angular/core';
import { eUserMenuItems } from '../enums/user-menu-items';

export const BASIC_THEME_USER_MENU_PROVIDERS = [
  provideAppInitializer(() => {
    const initializerFn = configureUserMenu(inject(Injector));
    return initializerFn();
  }),
];

export function configureUserMenu(injector: Injector) {
  const userMenu = injector.get(UserMenuService);
  const authService = injector.get(AuthService);
  const navigateToManageProfile = injector.get(NAVIGATE_TO_MANAGE_PROFILE);

  return () => {
    userMenu.addItems([
      {
        id: eUserMenuItems.MyAccount,
        order: 100,
        textTemplate: {
          text: 'AbpAccount::MyAccount',
          icon: 'fa fa-cog',
        },
        action: () => navigateToManageProfile(),
      },
      {
        id: eUserMenuItems.Logout,
        order: 101,
        textTemplate: {
          text: 'AbpUi::Logout',
          icon: 'fa fa-power-off',
        },
        action: () => {
          authService.logout().subscribe();
        },
      },
    ]);
  };
}
