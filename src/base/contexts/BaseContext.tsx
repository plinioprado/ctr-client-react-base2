import React, { createContext, useReducer, useContext } from "react";

import { baseReducer, initialState } from "../reducers/baseReducer";
import config from "../config.json";

import { SessionContext } from "./SessionContext";

const BaseContext = createContext<any>(null);

const BaseContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { alertShow, doRequest } = useContext(SessionContext);

  const [state, dispatch] = useReducer(baseReducer, initialState);

  const getList = async (table: string) => {
    try {
      const json = await doRequest(`${config.api.url}${table}`, "get", null);
      dispatch({
        type: "LIST_GET",
        payload: {
          list: json.data,
          format: json.format,
        },
      });
    } catch (err: any) {
      alertShow("error", err.message);
    }
  };

  const clearList = () => dispatch({ type: "LIST_CLEAR" });

  const getItem = async (table: string, cod: string | number) => {
    try {
      const json = await doRequest(
        `${config.api.url}${table}/${cod}`,
        "get",
        null,
      );
      const opNew: boolean = cod == 0;
      dispatch({
        type: "ITEM_GET",
        payload: {
          item: {
            ...json.data,
            opNew: opNew,
          },
          format: json.format,
        },
      });
    } catch (err: any) {
      alertShow("error", err.message);
    }
  };

  const fetchItem = async (table: string, cod: string | number) => {
    try {
      const json = await doRequest(
        `${config.api.url}${table}/${cod}`,
        "get",
        null,
      );
      return json.data;
    } catch (err: any) {
      alertShow("error", err.message);
    }
  };

  const getOptionList = async (table: string) => {
    try {
      const json = await doRequest(
        `${config.api.url}${table}/option`,
        "get",
        null,
      );
      return json.data;
    } catch (err: any) {
      alertShow("error", err.message);
    }
  };

  const updateField = (name: string, value: any) =>
    dispatch({
      type: "FIELD_UPDATE",
      payload: { field: { name: name, value: value } },
    });

  const createItem = async (table: string, item: any) => {
    try {
      const json = await doRequest(`${config.api.url}${table}`, "post", item);
      if (json.error) throw json.error;
      await getList(table);

      return true;
    } catch (err: any) {
      alertShow("error", err.message);
      return false;
    }
  };

  const updateItem = async (table: string, item: any) => {
    try {
      const json = await doRequest(`${config.api.url}${table}`, "put", item);
      if (json.error) throw json.error;
      await getList(table);

      return true;
    } catch (err: any) {
      alertShow("error", err.message);
      return false;
    }
  };

  const deleteItem = async (table: string, fieldValue: any) => {
    try {
      const json = await doRequest(
        `${config.api.url}${table}/${fieldValue}`,
        "delete",
        null,
      );
      dispatch({
        type: "ITEM_DELETE",
        payload: json.data || {},
      });
    } catch (err: any) {
      alertShow("error", err.message);
    }
  };

  const clearItem = () => dispatch({ type: "ITEM_CLOSE" });

  // validate

  const itemValidate = () => {
    let errors: { [key: string]: string } = {};
    state.format.columns.forEach((it: any) => {
      const value = state.item[it.name];
      if (it.type === "boolean") {
        if (it.required === true && ![true, false].includes(value))
          errors[it.name] = "required";
        if (![undefined, true, false].includes(value))
          errors[it.name] = "invalid";
      } else if (it.type === "number") {
        if (it.required === true && !value) errors[it.name] = "required";
      } else if (["string", "password", "email"].includes(it.type)) {
        if (it.required === true && !value.trim()) errors[it.name] = "required";
        else if (it.minlength && value.trim().length < it.minlength)
          errors[it.name] = `min ${it.minlength} characters`;
        else if (it.maxlength && value.trim().length > it.maxlength)
          errors[it.name] = `max ${it.maxlength} characters`;
      }
    });
    return errors;
  };

  // helpers

  const format: any = state.format;

  const shop = {
    format: format,
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
    clearItem,
  };

  return <BaseContext.Provider value={shop}>{children}</BaseContext.Provider>;
};

export { BaseContext, BaseContextProvider };
