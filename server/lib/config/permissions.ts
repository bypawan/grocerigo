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
  },
} as const;

interface Permissions {
  [key: string]: {
    [action: string]: boolean;
  };
}

export const permissionsWihIndexSignature: Permissions = permissions;
