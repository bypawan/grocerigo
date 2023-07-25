export const permissions = {
  USER: {
    canViewProfile: true,
    canEditProfile: true,
    canDeleteProfile: true,
    canViewUsers: false,
    canCreateProduct: false,
    canEditProduct: false,
    canDeleteProduct: false,
  },
  ADMIN: {
    canViewProfile: true,
    canEditProfile: true,
    canDeleteProfile: true,
    canViewUsers: true,
    canCreateProduct: true,
    canEditProduct: true,
    canDeleteProduct: true,
  },
};
