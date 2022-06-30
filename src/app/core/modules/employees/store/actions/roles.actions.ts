import { Roles } from 'src/app/shared/interfaces/rolesResponse';
import { createAction, props } from '@ngrx/store';

export const getRoles = createAction(
  '[Employees Module] Get roles'
);

export const getRolesSuccess = createAction(
  '[Employees Module] Gotten roles',
  props<{ roles: Roles[] }>()
);
