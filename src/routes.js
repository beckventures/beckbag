import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import TableList from "views/TableList.js";
import Interested from "views/Interested.js";
import UserProfile from "views/UserProfile.js";
import Matching from "views/Matching.js";
import Upcoming from "views/Upcoming.js";
import Trips from "views/Trips.js";
import Ongoing from "views/Ongoing.js";
import Completed from "views/Completed.js";
import Messaging from "views/Messaging.js";

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
    path: "/pending",
    name: "Pending Trips",
    collapse: true,
    rtlName: "لوحة القيادة",
    icon: "face",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/packages/pending",
    name: "Pending Packages",
    collapse: true,
    rtlName: "لوحة القيادة",
    icon: "face",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/inprocess",
    name: "In Process",
    collapse: true,
    rtlName: "لوحة القيادة",
    icon: "face",
    component: Upcoming,
    layout: "/admin"
  },
  {
    path: "/packages/inprocess",
    name: "In Process Packages",
    collapse: true,
    rtlName: "لوحة القيادة",
    icon: "face",
    component: Upcoming,
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
    path: "/trips",
    name: "All Trips",
    collapse: true,
    rtlName: "لوحة القيادة",
    icon: "face",
    component: Trips,
    layout: "/admin"
  },
  {
    path: "/ongoing",
    name: "Ongoing",
    collapse: true,
    rtlName: "لوحة القيادة",
    icon: "face",
    component: Ongoing,
    layout: "/admin"
  },
  {
    path: "/packages/ongoing",
    name: "Ongoing Packages",
    collapse: true,
    rtlName: "لوحة القيادة",
    icon: "face",
    component: Ongoing,
    layout: "/admin"
  },
  {
    path: "/completed",
    name: "Completed",
    collapse: true,
    rtlName: "لوحة القيادة",
    icon: "face",
    component: Completed,
    layout: "/admin"
  },
  {
    path: "/packages/completed",
    name: "Completed Packages",
    collapse: true,
    rtlName: "لوحة القيادة",
    icon: "face",
    component: Completed,
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
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/messaging",
    name: "Message",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: Messaging,
    layout: "/admin"
  }
];
export default routes;
