import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {User} from '../model/user.model';
import {AuthActions, AuthActionTypes} from '../auth/auth.actions';
import {storeFreeze} from 'ngrx-store-freeze';
import {routerReducer} from '@ngrx/router-store';

export interface AppState { }

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

// MetaReducers are applied after all other reducers have been executed
// storeFreeze is added to check for unsafe mutation of the store state
export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [storeFreeze] : [];
