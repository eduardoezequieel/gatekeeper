export interface RolesResponse {
  data: Roles[];
}

export interface Roles {
  id:          number;
  name:        string;
  description: string;
  default:     boolean;
  weight:      number;
}
