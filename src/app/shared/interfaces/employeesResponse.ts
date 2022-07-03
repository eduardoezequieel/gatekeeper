import { Pagination } from './webHookResponse';
export interface EmployeesResponse {
  data: Employee[];
  pagination: Pagination
}

export interface Employee {
  id:               number;
  zohoUniqueId:     string;
  name:             string;
  username:         string;
  email:            string;
  image:            string;
  department:       string;
  designation:      string;
  developerType:    string;
  technology:       string;
  platform:         string;
  dateOfBirth:      string;
  dateOfJoining:    string;
  addedTime:        null;
  gender:           string;
  reportingTo:      string;
  employeeTtype:    string;
  zohoPeopleRole:   string;
  enabled:          boolean;
  firstAttempt:     boolean;
  twoFactorEnabled: boolean;
  employeeID:       string;
  role:             Role;
  createdAt:        string;
  updatedAt:        string;
}

export interface Role {
  id:          number;
  name:        string;
  description: string;
  default:     boolean;
  weight:      number;
}
