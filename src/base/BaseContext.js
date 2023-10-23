import { createContext, useReducer } from 'react';

import baseReducer, { initialState } from './baseReducer'
import config from "./config.json";

const BaseContext = createContext();

const BaseContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(baseReducer, initialState);

  const getList = async (table: string) => {
    try {
      const json = await doRequest(`${config.api.url}${table}`, 'get', null);
      dispatch({
        type: 'LIST_GET',
        payload: {
          list: json.data,
          format: json.format
        }
      });
    } catch (err) {
      alertShow('error', err.message);
    }
  };

  const clearList = () => dispatch({ type: 'LIST_CLEAR' });

  const getItem = async (table, cod) => {
    try {
      const json = await doRequest(`${config.api.url}${table}/${cod}`, 'get', null);
      dispatch({ type: 'ITEM_GET', payload: {
        item: {
          ...json.data,
          opNew: (cod === 0)
        },
        format: json.format
      }});
    } catch (err) {
      alertShow('error', err.message);
    }
  };

  const fetchItem = async (table, cod) => {
    try {
      const json = await doRequest(`${config.api.url}${table}/${cod}`, 'get', null);
      return json.data;
    } catch (err) {
      alertShow('error', err.message);
    }
  };

  const getOptionList = async (table) => {
    try {
      const json = await doRequest(`${config.api.url}${table}/option`, 'get', null);
      return json.data;

    } catch (err) {
      alertShow('error', err.message);
    }
  }

  const updateField = ({name, value}) => dispatch({type: 'FIELD_UPDATE', payload: {name, value}});

  const createItem = async (table, item) => {
    try {
      const json = await doRequest(`${config.api.url}${table}`, 'post', item);
      if (json.error) throw json.error;
      await getList(table);

      return true;
    } catch (err) {
      alertShow('error', err.message);
      return false;
    }
  }

  const updateItem = async (table, item) => {
    try {
      const json = await doRequest(`${config.api.url}${table}`, 'put', item);
      if (json.error) throw json.error;
      await getList(table);

      return true;
    } catch (err) {
      alertShow('error', err.message);
      return false;
    }
  }

  const deleteItem = async (table, fieldValue) => {
    try {
      const json = await doRequest(`${config.api.url}${table}/${fieldValue}`, 'delete', null);
      dispatch({
        type: 'ITEM_DELETE',
        payload: json.data || {}
      });
    } catch (err) {
      alertShow('error', err.message);
    }
  }

  const submitItem = () => dispatch({ type: 'ITEM_SUBMIT' });

  const login = async (email, pass, tenant) => {
    try {
      const json = await doRequest(`${config.api.url}login`, 'post', { email, pass, tenant });
      dispatch({ type: 'LOGIN', payload: { session: json.data }});
      return true;
    } catch (err) {
      alertShow('error', err.message);
      return false;
    }
  };

  const clearItem = () => dispatch({ type: 'ITEM_CLOSE' });

  const logout = () => dispatch({ type: 'LOGOUT'});

  const isLogged = () => state.session && state.session.user_name;

  const alertHide = () => dispatch({ type: 'ALERT_HIDE' })

  const alertShow = (type, message) => {
    const variant = { error: 'danger', success: 'success', alert: 'primary'}
    dispatch({
      type: 'ALERT_SHOW',
      payload: {
        session: {
          alert: {
            type: variant[type],
            message: `${type}: ${message}`
          }
        }
      }
    })
  };

  // validate

  const itemValidate = () => {
    let errors = {}
    state.format.columns.forEach(it => {
        const value = state.item[it.name];
        if (it.type === 'boolean') {
          if (it.required === true && ![true, false].includes(value)) errors[it.name] = 'required';
          if (![undefined, true, false].includes(value)) errors[it.name] = 'invalid';
        } else if (it.type === 'number') {
          if (it.required === true && !value) errors[it.name] = 'required';
        } else if (['string', 'password', 'email'].includes(it.type)) {
          if (it.required === true && !value.trim()) errors[it.name] = 'required';
          else if (it.minlength && value.trim().length < it.minlength) errors[it.name] = `min ${it.minlength} characters`;
          else if (it.maxlength && value.trim().length > it.maxlength) errors[it.name] =  `max ${it.maxlength} characters`;
        }
      });
    return errors;
  };

  // helpers

  const doRequest = async (url, method, body) => {
    try {
      let options = {
        method: method,
        headers: {
          'Authorization': `${state.session.user_id}:${state.session.auth_token}`,
          'Content-Type': 'application/json'
        }
      };
      if (body !== null) options.body = JSON.stringify(body);
      const res = await fetch(url, options);
      const response = await res.json();
      if (res.status !== 200) throw response;

      return response;
    } catch (err) {
      throw err;
    }
  }

  const shop = {
    access: state.session.auth_access ? JSON.parse(state.session.auth_access) : {},
    accessJSON: state.session.auth_access,
    alertHide,
    format: state.format,
    item: state.item,
    list: state.list,
    session: state.session,
    itemValidate,
    getItem,
    fetchItem,
    getList,
    clearList,
    getOptionList,
    updateField,
    createItem,
    updateItem,
    deleteItem,
    submitItem,
    clearItem,
    login,
    logout,
    isLogged
  }

  return <BaseContext.Provider value={shop}>{children}</BaseContext.Provider>;

}

export { BaseContext, BaseContextProvider }
