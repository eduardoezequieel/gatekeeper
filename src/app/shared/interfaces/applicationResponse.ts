export interface ApplicationsResponse {
  pagination: Pagination;
  data:  Application[];
}
  
export interface Application {
    id:           number;
    name:         string;
    description:  string;
    image:        string;
    public:       boolean;
    enabled:      boolean;
    webHook:      string;
    roleCount:    number;
    redirectUris: string[] | null;
}

export interface Pagination {
  totalPages:   number;
  totalItems:   number;
  nextPage:     number;
  previousPage: null;
  itemsPerPage: number;
  currentPage:  number;
}
