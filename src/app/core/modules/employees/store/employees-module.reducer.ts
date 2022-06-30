import { Role } from '../../../../shared/interfaces/loginResponse';
import * as applicationsActions from './actions/applications.actions';
import { createReducer, on } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Application } from 'src/app/shared/interfaces/applicationResponse';

export interface EmployeesModuleState extends AppState {
  employeesModule: EmployeesModuleStateForReducer;
}

interface EmployeesModuleStateForReducer {
  applications: Application[];
  role: Role[];
}

export const initialState: EmployeesModuleStateForReducer = {
  applications: [],
  role: [],
};

export const employeesModuleReducer = createReducer(
  initialState,
  on(applicationsActions.getApplicationsSuccess, (state, { applications }) => {
    return { ...state, applications };
  })
);
