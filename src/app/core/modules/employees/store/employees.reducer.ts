import { Employee } from '../../../../shared/interfaces/employeesResponse';
import * as employeesActions from './employees.actions';
import { createReducer, on } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Application } from 'src/app/shared/interfaces/applicationResponse';
import { PageEvent } from '@angular/material/paginator';

export interface EmployeesModuleState extends AppState {
  employeesModule: EmployeesModuleStateForReducer;
}

interface EmployeesModuleStateForReducer {
  employees: {
    data: Employee[];
    pagination: PageEvent;
    totalEmployees: number;
    filteredEmployeesIds: number[];
  };
  employeeDetails: {
    employeeIdDetails?: number;
    applications: {
      data: Application[];
      pagination: PageEvent;
      totalApps: number;
    };
    filteredApplicationsIds: number[];
  };
}

export const initialState: EmployeesModuleStateForReducer = {
  employees: {
    data: [],
    pagination: {
      pageIndex: 0,
      pageSize: 15,
      length: 0,
    },
    totalEmployees: 0,
    filteredEmployeesIds: [],
  },
  employeeDetails: {
    employeeIdDetails: undefined,
    applications: {
      data: [],
      pagination: {
        pageIndex: 0,
        pageSize: 15,
        length: 0,
      },
      totalApps: 0,
    },
    filteredApplicationsIds: [],
  },
};

export const mergeArrays = (oldState: any[], newState: any[]) => {
  const mergedArray: any[] = oldState.concat(newState);
  const arrayIds = new Set();
  const filteredArray: any[] = [];

  mergedArray.forEach((element) => arrayIds.add(element.id));

  arrayIds.forEach((id) => {
    let index = mergedArray.findIndex((element) => element.id == id);
    filteredArray.push(mergedArray[index]);
  });

  return filteredArray;
};

export const employeesModuleReducer = createReducer(
  initialState,
  on(employeesActions.getEmployeesSuccess, (state, { employees }) => {
    return {
      ...state,
      employees: {
        data: mergeArrays(state.employees.data, employees.data),
        pagination: {
          ...state.employees.pagination,
          length: employees.pagination.totalItems,
        },
        totalEmployees: employees.pagination.totalItems,
        filteredEmployeesIds: [],
      },
    };
  }),
  on(employeesActions.updatePagination, (state, { pageEvent }) => {
    return {
      ...state,
      employees: {
        ...state.employees,
        pagination: {
          ...state.employees.pagination,
          pageIndex: pageEvent.pageIndex,
          pageSize: pageEvent.pageSize,
        },
      },
    };
  }),
  on(
    employeesActions.updatePaginationEmployeeDetails,
    (state, { pageEvent }) => {
      return {
        ...state,
        employeeDetails: {
          ...state.employeeDetails,
          applications: {
            ...state.employeeDetails.applications,
            pagination: {
              ...state.employeeDetails.applications.pagination,
              pageIndex: pageEvent.pageIndex,
              pageSize: pageEvent.pageSize,
            },
          },
        },
      };
    }
  ),
  on(employeesActions.getEmployeeFromStore, (state, { id }) => {
    return {
      ...state,
      employeeDetails: {
        employeeIdDetails: id,
        applications: {
          data: [],
          pagination: {
            pageIndex: 0,
            pageSize: 15,
            length: 0,
          },
          totalApps: 0,
        },
        filteredApplicationsIds: [],
      },
    };
  }),
  on(employeesActions.getEmployeeSuccess, (state, { employee }) => {
    return {
      ...state,
      employees: {
        ...state.employees,
        data: [...state.employees.data, employee],
      },
    };
  }),
  on(employeesActions.getAppsOfEmployeeSuccess, (state, { applications }) => {
    return {
      ...state,
      employeeDetails: {
        ...state.employeeDetails,
        applications: {
          data: mergeArrays(
            state.employeeDetails.applications.data,
            applications.data
          ),
          pagination: {
            ...state.employeeDetails.applications.pagination,
            length: applications.pagination.totalItems,
          },
          totalApps: applications.pagination.totalItems,
        },
      },
    };
  }),
  on(employeesActions.getFilteredEmployeesSuccess, (state, { employees }) => {
    if (employees.length > 0) {
      const ids: number[] = [];
      employees.forEach((employee) => ids.push(employee.id));

      return {
        ...state,
        employees: {
          ...state.employees,
          data: mergeArrays(state.employees.data, employees),
          pagination: {
            pageIndex: 0,
            pageSize: 15,
            length: employees.length,
          },
          filteredEmployeesIds: ids,
        },
      };
    } else {
      return state;
    }
  }),
  on(employeesActions.clearFiltersFromEmployeesPagination, (state) => {
    return {
      ...state,
      employees: {
        ...state.employees,
        pagination: {
          pageIndex: 0,
          pageSize: 15,
          length: state.employees.totalEmployees,
        },
      },
    };
  }),
  on(employeesActions.clearFiltersFromEmployeesDetailsPagination, (state) => {
    return {
      ...state,
      employeeDetails: {
        ...state.employeeDetails,
        applications: {
          ...state.employeeDetails.applications,
          pagination: {
            pageIndex: 0,
            pageSize: 15,
            length: state.employeeDetails.applications.totalApps,
          },
        },
      },
    };
  }),
  on(employeesActions.searchAppsOfEmployee, (state) => {
    return {
      ...state,
      employeeDetails: {
        ...state.employeeDetails,
        filteredApplicationsIds: [],
      },
    };
  }),
  on(
    employeesActions.searchAppsOfEmployeeSuccess,
    (state, { applications }) => {
      if (applications.length > 0) {
        const ids: number[] = [];
        applications.forEach((app) => ids.push(app.id));

        return {
          ...state,
          employeeDetails: {
            ...state.employeeDetails,
            applications: {
              ...state.employeeDetails.applications,
              data: mergeArrays(
                state.employeeDetails.applications.data,
                applications
              ),
              pagination: {
                pageIndex: 0,
                pageSize: 15,
                length: ids.length,
              },
            },
            filteredApplicationsIds: ids,
          },
        };
      } else {
        return state;
      }
    }
  )
);
