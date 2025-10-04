export type GetUserResponse = {
  id: string;
  username: string;
  fullname: string;
  email: string;
  phone: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  roles: string[];
};
