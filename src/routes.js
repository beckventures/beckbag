import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Interested from "views/Interested.js";
import UserProfile from "views/UserProfile.js";
import Matching from "views/Matching.js";
import Upcoming from "views/Upcoming.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    collapse: true,
    rtlName: "لوحة القيادة",
    icon: "face",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/upcoming",
    name: "Upcoming Flights",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: Upcoming,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/interestedtravelers",
    name: "Interested Travelers",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: Interested,
    layout: "/admin"
  },
  {
    path: "/confirmedtravelers",
    name: "Pending Trips",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/match",
    name: "Matchmaking",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: Matching,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
];
export default routes;
