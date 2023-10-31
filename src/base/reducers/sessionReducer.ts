import { Session, Alert } from '../types/types'

export const initialSession: Session = {
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
  | { type: 'ALERT_SHOW', payload: Alert}
  | { type: 'LOGIN', payload: Session }
  | { type: 'LOGOUT' }

export const sessionReducer = (state: Session, action: StateAction) : any => {
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
      return initialSession;
    default:
      return state;
  }
}
