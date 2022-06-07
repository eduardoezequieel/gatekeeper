export interface RolesOfEmployeeInAppResponse {
  data: AppsRoles[];
}

export interface AppsRoles {
  assigned: boolean;
  id:       number;
  name:     string;
}
