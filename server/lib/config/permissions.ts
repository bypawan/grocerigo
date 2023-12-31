const permissions = {
  USER: {
    canViewProfile: true,
    canEditProfile: true,
    canDeleteProfile: true,
    canViewUsers: false,
    canCreateProduct: false,
    canEditProduct: false,
    canDeleteProduct: false,
    canViewWishlist: true,
    canEditWishlist: true,
    canDeleteWishlist: true,
    canViewCart: true,
    canEditCart: true,
    canDeleteCart: true,
    canCreateAddress: true,
    canViewAddress: true,
    canEditAddress: true,
    canDeleteAddress: true,
  },
  ADMIN: {
    canViewProfile: true,
    canEditProfile: true,
    canDeleteProfile: true,
    canViewUsers: true,
    canCreateProduct: true,
    canEditProduct: true,
    canDeleteProduct: true,
    canViewWishlist: false,
    canEditWishlist: false,
    canDeleteWishlist: false,
    canViewCart: false,
    canEditCart: false,
    canDeleteCart: false,
    canCreateAddress: false,
    canViewAddress: false,
    canEditAddress: false,
    canDeleteAddress: false,
  },
} as const;

interface Permissions {
  [key: string]: {
    [action: string]: boolean;
  };
}

export const permissionsWihIndexSignature: Permissions = permissions;
