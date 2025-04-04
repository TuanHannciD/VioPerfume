import Accounts from "views/Accounts";
import Dashboard from "views/Dashboard.js";
import Brands from "views/Brands";
import UserProfile from "views/UserProfile.js";
import Oders from "views/Oders";
import OrderPage from "views/OrderPage";
import Voucher from "views/Vouchers";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/accounts",
    name: "Accounts",
    icon: "tim-icons icon-single-02",
    component: <Accounts />,
    layout: "/admin"
  },
  {
    path: "/brands",
    name: "Brands",
    icon: "tim-icons icon-laptop",
    component: <Brands/>,
    layout: "/admin"
  },
  {
    path: "/orderPages",
    name: "OrderPages",
    icon: "tim-icons icon-laptop",
    component: <OrderPage/>,
    layout: "/admin"
  },

  {
    path: "/oders",
    name: "Oders",
    icon: "tim-icons icon-cart",
    component: <Oders/>,
    layout: "/admin"
  },

  {
    path: "/vouchers",
    name: "Vouchers",
    icon: "tim-icons icon-tag",
    component: <Voucher/>,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: "tim-icons icon-atom",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-badge",
    component: <UserProfile />,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: <Tables></Tables>,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: <Typography />,
  //   layout: "/admin",
  // }
];
export default routes;
