export type OrderType = "asc" | "desc";
export type PaginationParams = {
  page: number;
  size: number;
  order: OrderType;
  search?: string;
};

export type PaginatedResult<T> = {
  page: number;
  totalPages: number;
  totalItems: number;
  items: T[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
