import { Pagination } from './webHookResponse';

export interface AllRequestsResponse {
  data: ApplicationAccess[];
  pagination: Pagination;
}
export interface ApplicationAccess {
  id: number;
  application: MinorSimpleApplication;
  employee: MinorSimpleEmployee;
  message: string;
  createdAt: string;
  isSelected: boolean;
}

export interface MinorSimpleApplication {
  id: number;
  name: string;
}

export interface MinorSimpleEmployee {
  id: number;
  name: string;
}
export interface SimpleAssignEmployeeRole {
  id: number;
  name: string;
}
export interface AssignEmployeeResponse {
  data: {
    id: number;
    application: MinorSimpleApplication;
    employee: MinorSimpleEmployee;
    applicationRoles: SimpleAssignEmployeeRole[];
  };
}
