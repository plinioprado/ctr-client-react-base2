import { Routes, Route } from "react-router-dom";

import AuxList from "./base/components/aux/AuxList";
import Home from "./base/components/Home";
import Login from "./base/components/Login";
import { useContext } from "react";

import { BaseContext } from "./base/BaseContext";
import Session from "./base/components/Session";

function AppRoutes() {
  const { isLogged } = useContext(BaseContext);

  return isLogged() ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/role" element={<AuxList table="role" />} />
      <Route path="/tenant" element={<AuxList table="tenant" />} />
      <Route path="/setting" element={<AuxList table="setting" />} />
      <Route path="/user" element={<AuxList table="user" />} />
      <Route path="/country" element={<AuxList table="country" />} />
      <Route path="/currency" element={<AuxList table="currency" />} />
      <Route path="/session" element={<Session />} />
    </Routes>
  ) : (
    <Login />
  );
}

export default AppRoutes;
