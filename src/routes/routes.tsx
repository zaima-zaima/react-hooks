import { RouteObject, createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import DefaultPage from "../pages/DefaultPage";
import PageA from "../pages/PageA";
import PageB from "../pages/PageB";
import PageC from "../pages/PageC";

export const routes = [
    {
        path: "/", element: <Main />, children: [
            { name: "home", path: "/", element: <DefaultPage /> },
            { name: "pageC", path: "/page/pageC", element: <PageC /> },
            { name: "pageA", path: "/page/pageA/:a/:b", element: <PageA /> },
            { name: "pageB", path: "/page/pageB/c", element: <PageB /> }
        ]
    }
] as RouteObject[]


const router = createBrowserRouter(routes);


export default router; 