import "./App.css";

import AppRoutes from "./AppRoutes";

import { SessionContextProvider } from "./base/contexts/SessionContext";

import { BaseContextProvider } from "./base/contexts/BaseContext";
import { BrowserRouter } from "react-router-dom";
import Header from "./base/components/Header";
import Footer from "./base/components/Footer";

function App() {
  return (
    <BrowserRouter>
      <SessionContextProvider>
        <BaseContextProvider>
          <div className="App">
            <Header />
            <AppRoutes />
            <Footer />
          </div>
        </BaseContextProvider>
      </SessionContextProvider>
    </BrowserRouter>
  );
}

export default App;
