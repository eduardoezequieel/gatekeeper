export interface LoginResponse {
  data: {
    employee: User;
    tokens: Tokens;
  };
}

export interface User {
  id: number;
  zohoUniqueId: string;
  name: string;
  username: string;
  email: string;
  image: string;
  department: null;
  designation: null;
  developerType: null;
  technology: null;
  platform: null;
  dateOfBirth: null;
  dateOfJoining: null;
  addedTime: null;
  gender: null;
  reportingTo: null;
  employeeTtype: null;
  zohoPeopleRole: null;
  enabled: boolean;
  firstAttempt: boolean;
  twoFactorEnabled: boolean;
  employeeID: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  default: boolean;
  weight: number;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UpdatePass {
  data: User;
}
