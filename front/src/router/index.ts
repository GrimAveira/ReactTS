import AddPanel from "../components/pages/AddPanel";
import Applications from "../components/pages/Applications";
import Contacts from "../components/pages/Contacts";
import Login from "../components/pages/Login";
import Main from "../components/pages/Main";
import PDF from "../components/pages/PDF";
import PageNotFound from "../components/pages/PageNotFound";
import PersonalAccaunt from "../components/pages/PersonalAccaunt";
import Registration from "../components/pages/Registration";
import ReportApplication from "../components/pages/ReportApplication";

export const publicShellRoutes: { path: string; element: () => JSX.Element }[] =
  [
    { path: "/contacts", element: Contacts },

    { path: "/", element: Main },
  ];
export const privateShellRoutes = [
  { path: "/report", element: ReportApplication },
  { path: "/pdf", element: PDF },
  { path: "/accaunt", element: PersonalAccaunt },
  { path: "/addPanel", element: AddPanel },
  { path: "/applications", element: Applications },
];
export const publicNotShellRoutes = [
  { path: "/login", element: Login },
  { path: "/registration", element: Registration },
  { path: "*", element: PageNotFound },
];
