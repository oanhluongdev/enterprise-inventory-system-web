declare module "*.json" {
  interface Common {
    applicationTitle: string;
    loading: string;
    saving: string;
    save: string;
    cancel: string;
    close: string;
    ok: string;
    success: string;
    error: string;
    addNew: string;
    detail: string;
    edit: string;
    delete: string;
    copy: string;
  }

  interface Business {
    businessData: string;
    business: string;
    userManagement: string;
    users: string;
    roles: string;
    companyManagement: string;
    companies: string;
    companyUnit: string;
  }

  interface Role {
    roles: string;
    addNewRole: string;
    editRole: string;
    roleDetail: string;
    messageCreateRoleSuccess: string;
    messageCreateRoleFailed: string;
    messageUpdateRoleSuccess: string;
    messageUpdateRoleFailed: string;
    messageDeleteRoleConfirm: string;
    messageDeleteRoleSuccess: string;
    messageDeleteRoleFailed: string;
  }

  interface User {
    users: string;
    addNewUser: string;
    editUser: string;
    userDetail: string;
    username: string;
    password: string;
    confirmPassword: string;
    fullname: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    active: string;
    resetPassword: string;
    roles: string;
    messageCreateUserSuccess: string;
    messageCreateUserFailed: string;
    messageUpdateUserSuccess: string;
    messageUpdateUserFailed: string;
    messageDeleteUserConfirm: string;
    messageDeleteUserSuccess: string;
    messageDeleteUserFailed: string;
    messageResetPasswordSuccess: string;
    messageResetPasswordFailed: string;
  }

  interface Company {
    companies: string;
    addNewCompany: string;
    editCompany: string;
    companyDetail: string;
    name: string;
    legalName: string;
    registrationNumber: string;
    taxId: string;
    website: string;
    email: string;
    phone: string;
    logoUrl: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    currencyCode: string;
    timezone: string;
    active: string;
    messageCreateCompanySuccess: string;
    messageCreateCompanyFailed: string;
    messageUpdateCompanySuccess: string;
    messageUpdateCompanyFailed: string;
    messageDeleteCompanyConfirm: string;
    messageDeleteCompanySuccess: string;
    messageDeleteCompanyFailed: string;
  }

  interface StringResources {
    common: Common;
    business: Business;
    role: Role;
    user: User;
    company: Company;
  }

  const value: StringResources;
  export = value;
}
