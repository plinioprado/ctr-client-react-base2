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


export type StateAction =
  | { type: 'LIST_GET', payload: any}
  | { type: 'LIST_CLEAR'}
  | { type: 'ITEM_GET', payload: any }
  | { type: 'FIELD_UPDATE', payload: any }
  | { type: 'ITEM_DELETE', payload: any }
  | { type: 'ITEM_CLOSE'}

export const baseReducer = (state = initialState, action: StateAction) => {
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
      const keyName : string = Object.keys(action.payload)[0]
      const keyValue : string = action.payload[keyName];
      const list : object[] = state.list.filter(it => {
        const val : string = it[keyName] || '';
        return val.toString() !== keyValue})
      return {
        ...state,
        list: list,
        item: {}
      };
    case 'ITEM_CLOSE':
      return {
        ...state,
        item: {}
      };
    default:
      return state;
  }
}
