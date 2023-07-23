export const permissions = {
  USER: {
    canViewProfile: true,
    canEditProfile: true,
    canDeleteProfile: true,
    canViewUsers: false,
    canCreateProduct: false,
  },
  ADMIN: {
    canViewProfile: true,
    canEditProfile: true,
    canDeleteProfile: true,
    canViewUsers: true,
    canCreateProduct: true,
  },
};
