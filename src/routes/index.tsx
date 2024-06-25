import React from "react";
import { Route, Navigate, RouteProps } from "react-router-dom";

// components
import PrivateRoute from "./PrivateRoute";

// import Root from './Root';

// lazy load all the views

// auth
const Login = React.lazy(() => import("../pages/auth/Login"));
const OTP = React.lazy(() => import("../pages/auth/OTP"));
const OTPR = React.lazy(() => import("../pages/auth/OTPR"))
const Logout = React.lazy(() => import("../pages/auth/Logout"));
const Confirm = React.lazy(() => import("../pages/auth/Confirm"));
const ForgetPassword = React.lazy(() => import("../pages/auth/ForgetPassword"));
const Register = React.lazy(() => import("../pages/auth/Register"));



// landing
const Landing = React.lazy(() => import("../pages/landing/"));

// dashboard
const Dashboard1 = React.lazy(() => import("../pages/dashboard/Dashboard1/"));


// apps
const AllOrders = React.lazy(() => import("../pages/apps/Order/index"));
const AllClients = React.lazy(() => import("../pages/apps/Clients/index"));

const AllProducts = React.lazy(() => import("../pages/apps/Product/index"));
const Commission = React.lazy(() => import("../pages/apps/Commission/index"));
const Payout = React.lazy(() => import("../pages/apps/Payout/Payout"));
const Profile = React.lazy(() => import("../pages/apps/Profile/Profile"));
const Settings = React.lazy(() => import("../pages/apps/Settings/Settings"))
const AppProductDetails = React.lazy(() => import("../pages/apps/Product/Products/ProductDetails/ProductDetails"));
const AppShoppingCart = React.lazy(() => import("../pages/apps/Product/Products/Shopping Cart/Cart"));
// - chat
const ChatApp = React.lazy(() => import("../pages/apps/Chat/"));



// extra pages

const Error404 = React.lazy(() => import("../pages/error/Error404"));
const Error404Two = React.lazy(() => import("../pages/error/Error404Two"));
const Error404Alt = React.lazy(() => import("../pages/error/Error404Alt"));
const Error500 = React.lazy(() => import("../pages/error/Error500"));
const Error500Two = React.lazy(() => import("../pages/error/Error500Two"));

const Maintenance = React.lazy(() => import("../pages/other/Maintenance"));


// charts
const ApexChart = React.lazy(() => import("../pages/charts/Apex"));
const ChartJs = React.lazy(() => import("../pages/charts/ChartJs"));



export interface RoutesProps {
  path: RouteProps["path"];
  name?: string;
  element?: RouteProps["element"];
  route?: any;
  exact?: boolean;
  icon?: string;
  header?: string;
  roles?: string[];
  children?: RoutesProps[];
}

// root routes
// const rootRoute: RoutesProps = {
//     path: '/',
//     exact: true,
//     element: () => <Root />,
//     route: Route,
// };


const dashboard1Routes: RoutesProps = {
  path: "/apps/dashboard",
  name: "Dashboard",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "airplay",
  element: <Dashboard1 />,
};
const rootRoutes: RoutesProps = {
  path: "/",
  name: "Dashboard",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "airplay",
  element: <Dashboard1 />,
};



const orderAppRoutes: RoutesProps = {
  path: "/apps/orders",
  name: "Orders",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "layers",
  element: <AllOrders />,
};
const clientAppRoutes: RoutesProps = {
  path: "/apps/clients",
  name: "Clients",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "users",
  element: <AllClients />,
};
const productAppRoutes: RoutesProps = {
  path: "/apps/products",
  name: "Products",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "calendar",
  element: <AllProducts />,
};

const productDetailsAppRoutes = {
  path: "/apps/products/:id",
  name: "Product Details",
  route: PrivateRoute,
  roles: ["Admin"],
  element: <AppProductDetails />,
};
const commissionAppRoutes: RoutesProps = {
  path: "/apps/commission",
  name: "Commission",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "award",
  element: <Commission />,
};
const payoutAppRoutes: RoutesProps = {
  path: "/apps/payout",
  name: "Payout",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "activity",
  element: <Payout />,
};
const chatAppRoutes = {
  path: "/apps/chat",
  name: "Messaging",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "message-square",
  element: <ChatApp />,
};
const chartsAppRoutes = {
  path: "/apps/charts",
  name: "Reports",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "bar-chart-2",
  element: <ApexChart />,
};
const profileAppRoutes = {
  path: "/apps/profile",
  name: "Profile",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "user",
  element: <Profile />,
};
const settingsAppRoutes = {
  path: "/apps/settings",
  name: "Settings",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "settings",
  element: <Settings />,
};

const cartAppRoutes = {
  path: "/apps/shoppingcart",
  name: "Shopping Cart",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "shopping-cart",
  element: <AppShoppingCart />,
};




const appRoutes = [
  orderAppRoutes,
  productAppRoutes,
  commissionAppRoutes,
  payoutAppRoutes,
  chatAppRoutes,
  chartsAppRoutes,
  settingsAppRoutes,
  productDetailsAppRoutes,
  profileAppRoutes,
  cartAppRoutes,
  clientAppRoutes,
  rootRoutes
];


// auth
const authRoutes: RoutesProps[] = [
  {
    path: "/auth/login",
    name: "Login",
    element: <Login />,
    route: Route,
  },
  {
    path: "/auth/verifyOTP/:email",
    name: "OTP",
    element: <OTP />,
    route: Route,
  },
  {
    path: "/auth/verifyOTPR/:email",
    name: "OTP",
    element: <OTPR />,
    route: Route,
  },
  {
    path: "/auth/register",
    name: "Register",
    element: <Register />,
    route: Route,
  },
  {
    path: "/auth/confirm",
    name: "Confirm",
    element: <Confirm />,
    route: Route,
  },
  {
    path: "/auth/forget-password",
    name: "Forget Password",
    element: <ForgetPassword />,
    route: Route,
  },

  {
    path: "/auth/logout",
    name: "Logout",
    element: <Logout />,
    route: Route,
  },

];

// public routes
const otherPublicRoutes = [
  {
    path: "/landing",
    name: "landing",
    element: <Landing />,
    route: Route,
  },
  {
    path: "/maintenance",
    name: "Maintenance",
    element: <Maintenance />,
    route: Route,
  },
  {
    path: "/error-404",
    name: "Error - 404",
    element: <Error404 />,
    route: Route,
  },
  {
    path: "/error-404-two",
    name: "Error - 404 Two",
    element: <Error404Two />,
    route: Route,
  },
  {
    path: "/error-500",
    name: "Error - 500",
    element: <Error500 />,
    route: Route,
  },
  {
    path: "/error-500-two",
    name: "Error - 500 Two",
    element: <Error500Two />,
    route: Route,
  },

];

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
  let flatRoutes: RoutesProps[] = [];

  routes = routes || [];
  routes.forEach((item: RoutesProps) => {
    flatRoutes.push(item);

    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const authProtectedRoutes = [
  ...appRoutes,
  dashboard1Routes,
];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export {
  publicRoutes,
  authProtectedRoutes,
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
};
