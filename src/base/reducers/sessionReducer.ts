import { StateSession, StateSessionAlert } from '../types/types'

export const initialStateSession: StateSession = {
  user_id: 0,
  user_name: '',
  user_role: '',
  auth_access: '',
  auth_token: '',
  tenant_cod: '',
  tenant_name: '',
  selectOptions: '',
  alert: {
    variant: '',
    message: ''
  }
};

export type StateAction =
  | { type: 'ALERT_HIDE'}
  | { type: 'ALERT_SHOW', payload: StateSessionAlert}
  | { type: 'LOGIN', payload: StateSession }
  | { type: 'LOGOUT' }

export const sessionReducer = (state: StateSession, action: StateAction) : any => {
  switch (action.type) {
    case 'ALERT_SHOW':
      return {
        ...state,
        alert: {
          variant: action.payload.variant || 'error',
          message: action.payload.message || 'Error',
        }
      }
    case 'ALERT_HIDE':
      return {
        ...state,
        alert: null
      }
    case 'LOGIN':
      return {
        ...state,
        ...action.payload
      }
    case 'LOGOUT':
      return initialStateSession;
    default:
      return state;
  }
}
