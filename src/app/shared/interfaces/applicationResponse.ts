import { Pagination } from './webHookResponse';

export interface ApplicationResponse {
  data: Application[];
  pagination: Pagination;
}

export interface Application {
  id: number;
  name: string;
  description: string;
  image: string;
  public: boolean;
  enabled: true;
  webHook: string;
  roleCount: number;
  redirectUris: string[];
}

export interface ApplicationRoles {
  data: Roles[];
}

export interface Roles {
  id: number;
  name: string;
  description: string;
  default: boolean;
  weight: number;
  isSelected: boolean;
}
