export interface WebHookResponse {
  data: WebHook[];
  pagination: Pagination;
}

export interface WebHook {
  id: number;
  date: string;
  webhookUrl: string;
  event: string;
  status: boolean;
  statusCode: number;
  response: string;
  userId: number;
  email: string;
  employeeID: string;
}

export interface Pagination {
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
}
