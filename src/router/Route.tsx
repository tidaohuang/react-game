import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'react-game', element: <App /> },
        ]
    }
]

export const router = createBrowserRouter(routes);