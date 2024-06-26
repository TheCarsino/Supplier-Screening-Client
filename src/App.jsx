import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Org_Estructura from "./pages/Supplier_Screening/Supplier";

import "./App.scss";
import PrivateRoute from "./hooks/PrivateRoute";
import { URL_SUPPLIERS } from "./config";

function App() {
  return (
    <div className="wrapper" id="main">
      {/*Main components on each page*/}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route
          path={`${URL_SUPPLIERS}`}
          exact
          element={
            <PrivateRoute>
              <Org_Estructura />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
