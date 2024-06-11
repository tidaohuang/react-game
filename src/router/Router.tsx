import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import RotateGame from "../games/RotateGame/RotateGame";



export const routes: RouteObject[] = [
    {
        path: '/react-game/',
        element: <App />,
        children: [
            { path: 'rotate', element: <RotateGame /> },
        ]
    }
]

export const router = createBrowserRouter(routes);