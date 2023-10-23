//import React from "react";
import "./App.css";

import AppRoutes from "./AppRoutes";

import { BaseContextProvider } from "./base/BaseContext";
import { BrowserRouter } from "react-router-dom";
import Header from "./base/components/Header";
import Footer from "./base/components/Footer";

function App() {
  return (
    <BrowserRouter>
      <BaseContextProvider>
        <div className="App">
          <Header />
          <AppRoutes />
          <Footer />
        </div>
      </BaseContextProvider>
    </BrowserRouter>
  );
}

export default App;
