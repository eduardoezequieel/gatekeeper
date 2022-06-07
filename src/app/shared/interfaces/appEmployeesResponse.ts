import { Pagination } from "./applicationResponse";
import { Employee } from "./employeesResponse";

export interface AppEmployeesResponse {
  data:       Employee[];
  pagination: Pagination;
}
