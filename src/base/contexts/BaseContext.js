import { createContext, useReducer, useContext } from 'react';

import baseReducer, { initialState } from '../reducers/baseReducer'
import config from "../config.json";

import { SessionContext } from '../contexts/SessionContext';

const BaseContext = createContext();

const BaseContextProvider = ({children}) => {

  const { alertShow, doRequest } = useContext(SessionContext);

  const [state, dispatch] = useReducer(baseReducer, initialState);

  const getList = async (table) => {
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

  const clearItem = () => dispatch({ type: 'ITEM_CLOSE' });

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

  const shop = {
    format: state.format,
    item: state.item,
    list: state.list,
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
  }

  return <BaseContext.Provider value={shop}>{children}</BaseContext.Provider>;

}

export { BaseContext, BaseContextProvider }
