// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import Minuta from "views/Minuta/MinutaForm.jsx";
import MinutaTable from "views/Minuta/MinutaTable.jsx";
import EmpresaComponent from "../views/Empresa/EmpresaComponent";
import AsistenteComponent from "../views/Asistente/AsistenteComponent";
import ProyectoComponent from "../views/Proyecto/ProyectoComponent";
import MovimientoComponent from "../views/Movimiento/MovimientoComponent";
import HoraComponent from "../views/Hora/HoraComponent";
import ProgramadorComponent from "../views/Programador/ProgramadorComponent";
const dashboardRoutes = [
  {
    path: "/minuta",
    sidebarName: "Crear Minuta",
    navbarName: "Minuta Form",
    icon: Dashboard,
    component: Minuta
  },
  {
    path: "/minutaTabla",
    sidebarName: "Minutas",
    navbarName: "Minuta Tabla",
    icon: Dashboard,
    component: MinutaTable
  },
  {
    path: "/empresa",
    sidebarName: "ABM Empresa",
    navbarName: "ABM Empresa",
    icon: Dashboard,
    component: EmpresaComponent
  },
  {
    path: "/asistente",
    sidebarName: "ABM Empleados",
    navbarName: "ABM Empleados",
    icon: Dashboard,
    component: AsistenteComponent
  },
  {
    path: "/programador",
    sidebarName: "ABM Programadores",
    navbarName: "ABM Programadores",
    icon: Dashboard,
    component: ProgramadorComponent
  },
  {
    path: "/proyecto",
    sidebarName: "ABM Proyecto",
    navbarName: "ABM Proyecto",
    icon: Dashboard,
    component: ProyectoComponent
  },
  {
    path: "/movimiento",
    sidebarName: "ABM Movimiento",
    navbarName: "ABM Movimiento",
    icon: Dashboard,
    component: MovimientoComponent
  },
  {
    path: "/hora",
    sidebarName: "ABM Hora",
    navbarName: "ABM Hora",
    icon: Dashboard,
    component: HoraComponent
  },
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/table",
    sidebarName: "Table List",
    navbarName: "Table List",
    icon: "content_paste",
    component: TableList
  },
  {
    path: "/typography",
    sidebarName: "Typography",
    navbarName: "Typography",
    icon: LibraryBooks,
    component: Typography
  },
  {
    path: "/icons",
    sidebarName: "Icons",
    navbarName: "Icons",
    icon: BubbleChart,
    component: Icons
  },
  {
    path: "/maps",
    sidebarName: "Maps",
    navbarName: "Map",
    icon: LocationOn,
    component: Maps
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    icon: Notifications,
    component: NotificationsPage
  },
  {
    path: "/upgrade-to-pro",
    sidebarName: "Upgrade To PRO",
    navbarName: "Upgrade To PRO",
    icon: Unarchive,
    component: UpgradeToPro
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default dashboardRoutes;
