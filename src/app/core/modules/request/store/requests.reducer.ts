import { createReducer } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

export interface RequestsModuleState extends AppState {
  requestsModule: RequestsModuleStateForReducer;
}

interface RequestsModuleStateForReducer {}

export const initialState: RequestsModuleStateForReducer = {};

export const requestsModuleReducer = createReducer(initialState);
