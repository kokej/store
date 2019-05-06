import * as fromUser from '../actions/user.actions';
import { User } from '../../models/user.model';
import { UserFormType } from '../../UserFormType';

export interface UserState {
    data: User;
    loggedIn: boolean;
    logging: boolean;
    message: string;
    providerId: string;
    params: UserFormType;
}

export const initialState: UserState = {
    data: null,
    loggedIn: false,
    logging: false,
    message: null,
    providerId: null,
    params: null
};

export function reducers(state = initialState, action: fromUser.LoginAction): UserState {
    switch (action.type) {
        case fromUser.LOGIN_USER: {
            const params = action.payload;
            return {
                ...state,
                logging: true,
                providerId: null,
                params
            };
        }
        case fromUser.LOGIN_USER_WITH_PROVIDER: {
            return {
                ...state,
                logging: true,
                providerId: 'google'
            };
        }
        case fromUser.LOGIN_USER_FAIL: {
            return {
                ...state,
                loggedIn: false,
                logging: false,
                providerId: null,
                message: 'login error',
                params: null
            };
        }
        case fromUser.LOGIN_USER_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                loggedIn: true,
                logging: false,
                providerId: null,
                message: 'login success',
                params: null,
                data
            };
        }
        case fromUser.LOGOUT_USER: {
            return {
                ...state,
                logging: true
            };
        }
        case fromUser.LOGOUT_USER_FAIL: {
            return {
                ...state,
                loggedIn: true,
                logging: false,
                message: 'logout error'
            };
        }
        case fromUser.LOGOUT_USER_SUCCESS: {
            const data = initialState.data;
            return {
                ...state,
                loggedIn: false,
                logging: false,
                message: 'logout success',
                providerId: null,
                data
            };
        }
    }
    return state;
}

export const getUserLoggedIn = (state: UserState) => state.loggedIn;
export const getUserLogging = (state: UserState) => state.logging;
export const getUserMessage = (state: UserState) => state.message;
export const getUserData = (state: UserState) => state.data;
