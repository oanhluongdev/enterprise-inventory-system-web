export const hasPermissions = (
  userPermissions: string,
  permission: string
): boolean => {
  const permissions = userPermissions.split(",");
  return permissions.includes(permission);
};
