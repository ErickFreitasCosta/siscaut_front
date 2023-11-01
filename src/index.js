// /*!

// =========================================================
// * Argon Dashboard React - v1.2.3
// =========================================================

// * Product Page: https://www.creative-tim.com/product/argon-dashboard-react
// * Copyright 2023 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// */
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// import "assets/plugins/nucleo/css/nucleo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/scss/argon-dashboard-react.scss";

// import AdminLayout from "layouts/Admin.js";
// import AuthLayout from "layouts/Auth.js";


// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <BrowserRouter>
 
//     <Routes>

//       <Route path="/" element={<Navigate to="/auth/Login" replace/>} />

//       <Route path="/admin/*" element={<AdminLayout />} />
//       <Route path="/auth/*" element={<AuthLayout />} />
      
//       <Route path="*" element={<Navigate to="/auth/Login" replace />} />
//     </Routes>
//   </BrowserRouter>
// );

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

const ProtectedRoute = ({ element }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Aqui você deve adicionar sua lógica real de autenticação
    // Por exemplo, usando Firebase Authentication
    // Substitua a seguinte linha com a sua lógica de autenticação:
    // setAuthenticated(suaLógicaDeAutenticação());
    setAuthenticated(true); // Apenas um exemplo, substitua esta linha com sua lógica real
  }, []);

  return authenticated ? element : <Navigate to="/admin/index" replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/Login" replace />} />
        <Route
          path="/admin/*"
          element={<ProtectedRoute element={<AdminLayout />} />}
        />
        <Route
          path="/auth/*"
          element={<ProtectedRoute element={<AuthLayout />} />}
        />
        <Route path="*" element={<Navigate to="/auth/Login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

root.render(<App />);
