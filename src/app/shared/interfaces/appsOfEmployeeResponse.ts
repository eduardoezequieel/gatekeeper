export interface AppsOfEmployeeResponse {
  data:       App[];
  pagination: Pagination;
}

export interface App {
  id:           number;
  name:         string;
  description:  string;
  image:        string;
  public:       boolean;
  enabled:      boolean;
  webHook:      string;
  roleCount:    number;
  redirectUris: string[];
}

export interface Pagination {
  totalPages:   number;
  itemsPerPage: number;
  totalItems:   number;
  currentPage:  number;
  nextPage:     number;
  previousPage: number;
}
