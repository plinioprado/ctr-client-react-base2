export const initialState = {
  format: {},
  item: {},
  list: [],
  session: {
    auth_token: '',
    auth_access: '',
    user_id: '',
    user_name: '',
    user_role: '',
    table: null,
    alert: {
      variant: null,
      message: null
    },
    selectOptions: {}
  }
};

const baseReducer = (state, action) => {
  switch (action.type) {
    case 'LIST_GET':
      return {
        ...state,
        list: action.payload.list,
        format: action.payload.format
      };
    case 'LIST_CLEAR':
      return {
        ...state,
        list: [],
        format: {}
      };
    case 'ITEM_GET':
      return {
        ...state,
        item: action.payload.item,
        format: action.payload.format
      };
    case 'FIELD_UPDATE':
      return {
        ...state,
        item: {
          ...state.item,
          [action.payload.name]: action.payload.value
        }
      };
    case 'ITEM_DELETE':
      const keyName = Object.keys(action.payload)[0]
      const keyValue = action.payload[keyName]
      return {
        ...state,
        list: state.list.filter(it => it[keyName].toString() !== keyValue.toString()),
        item: {}
      };
    case 'ITEM_CLOSE':
      return {
        ...state,
        item: {}
      };
    case 'LOGIN':
      return {
        ...state,
        session: action.payload.session
      };
    case 'LOGOUT':
      return initialState;
    case 'ALERT_SHOW':
      return {
        ...state,
        session: {
          ...state.session,
          alert: {
            variant: action.payload.session.alert.type || 'error',
            message: action.payload.session.alert.message || 'Error',
          }
        }
      };
    case 'ALERT_HIDE':
      return {
        ...state,
        session: {
          ...state.session,
          alert: null
        }
      };
    default:
      return state;
  }
}

export default baseReducer;
