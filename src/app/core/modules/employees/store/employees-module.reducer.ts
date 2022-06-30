import { Roles } from 'src/app/shared/interfaces/rolesResponse';
import * as applicationsActions from './actions/applications.actions';
import * as rolesActions from './actions/roles.actions';
import { createReducer, on } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Application } from 'src/app/shared/interfaces/applicationResponse';

export interface EmployeesModuleState extends AppState {
  employeesModule: EmployeesModuleStateForReducer;
}

interface EmployeesModuleStateForReducer {
  applications: Application[];
  roles: Roles[];
}

export const initialState: EmployeesModuleStateForReducer = {
  applications: [],
  roles: [],
};

export const employeesModuleReducer = createReducer(
  initialState,
  on(applicationsActions.getApplicationsSuccess, (state, { applications }) => {
    return { ...state, applications };
  }),
  on(rolesActions.getRolesSuccess, (state, { roles }) => {
    return { ...state, roles };
  })
);
