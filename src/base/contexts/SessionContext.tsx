import React, { createContext, useReducer } from "react";
import {
  sessionReducer,
  initialStateSession,
} from "../reducers/sessionReducer";
import config from "../config.json";

const SessionContext = createContext<any>(null);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(sessionReducer, initialStateSession);

  const alertHide = () => dispatch({ type: "ALERT_HIDE" });

  const alertShow = (type: string, message: string) => {
    const variant =
      type === "error"
        ? "danger"
        : type === "succcess"
        ? "success"
        : type === "alert"
        ? "primary"
        : "";
    dispatch({
      type: "ALERT_SHOW",
      payload: {
        variant: variant,
        message: `${type}: ${message}`,
      },
    });
  };

  const isLogged = () => state.user_name;

  const logout = () => dispatch({ type: "LOGOUT" });

  const login = async (email: string, pass: string, tenant: string) => {
    try {
      const json: any = await doRequest(`${config.api.url}login`, "post", {
        email,
        pass,
        tenant,
      });

      dispatch({
        type: "LOGIN",
        payload: {
          user_id: json.data.user_id,
          user_name: json.data.user_name,
          user_role: json.data.user_role,
          auth_access: json.data.auth_access,
          auth_token: json.data.auth_token,
          tenant_cod: json.data.tenant_cod,
          tenant_name: json.data.tenant_name,
          selectOptions: json.data.selectOptions,
        },
      });
      return true;
    } catch (err: any) {
      alertShow("error", err.message);
      return false;
    }
  };

  const sessionGetValue = (key: string) => {
    return state.session[key] || "";
  };

  // helpers

  type RequestOptions = {
    method: string;
    headers: {
      Authorization: string;
      "Content-Type": string;
    };
    body?: string;
  };

  const doRequest = async (url: string, method: string, body: any) => {
    try {
      const authorization = state.user_id
        ? `${state.user_id}:${state.auth_token}`
        : "0:";
      let options: RequestOptions = {
        method: method,
        headers: {
          Authorization: authorization,
          "Content-Type": "application/json",
        },
      };
      if (body) options.body = JSON.stringify(body);
      const res = await fetch(url, options);
      const response = await res.json();
      if (res.status !== 200) throw response;

      return response;
    } catch (err: any) {
      throw err;
    }
  };

  const shop = {
    alertShow,
    alertHide,
    isLogged,
    session: state,
    sessionGetValue,
    login,
    logout,
    doRequest,
  };

  return (
    <SessionContext.Provider value={shop}>{children}</SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
