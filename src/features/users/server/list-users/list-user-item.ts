export type ListUserItem = {
  id: string;
  username: string;
  email: string;
  fullname: string;
  phone?: string;
  isActive: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
};
