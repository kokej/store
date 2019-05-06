import * as fromUser from './user.reducers';
import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../../../../environments/environment';

export interface UserState {
    user: fromUser.UserState;
}

export const reducers: ActionReducerMap<UserState> = {
    user: fromUser.reducers
};

export const getUserState = createFeatureSelector<any>('user');

export const getUserData = createSelector(getUserState, fromUser.getUserData);
export const getUserLoggedIn = createSelector(getUserState, fromUser.getUserLoggedIn);
export const getUserLogging = createSelector(getUserState, fromUser.getUserLogging);
export const getUserMessage = createSelector(getUserState, fromUser.getUserMessage);

// export const metaReducers: MetaReducer<UserState>[] = !environment.production ? [] : [];
