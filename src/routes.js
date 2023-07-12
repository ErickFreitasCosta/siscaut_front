/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import CreateUser from "components/CreateUser.js";
import CreateChip from "components/CreateChip.js";
import CreatePhone from "components/CreatePhone.js";
import CreateHt from "components/CreateHt.js";
import CreateModem from "components/CreateModem.js";

var routes = [
  {
    path: "/index",
    name: "Painel",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/createUser",
    name: "Cadastrar Usuário",
    icon: "ni ni-single-02 text-primary",
    component: <CreateUser />,
    layout: "/auth",
  },
  {
    path: "/createPhone",
    name: "Cadastrar Aparelho",
    icon: "fas fa fa-mobile text-primary",
    component: <CreatePhone />,
    layout: "/auth",
  },
  {
    path: "/createHT",
    name: "Cadastrar HT",
    icon: "fas fa fa-walkie-talkie text-primary",
    component: <CreateHt />,
    layout: "/auth",
  },
  {
    path: "/createModem",
    name: "Cadastrar Modem",
    icon: "fas fa fa-wifi text-primary",
    component: <CreateModem />,
    layout: "/auth",
  },
  {
    path: "/createChip",
    name: "Cadastrar Chip",
    icon: "fas fa-sim-card text-primary",
    component: <CreateChip />,
    layout: "/auth",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  }
];
export default routes;
