import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import RotateGame from "../games/RotateGame/RotateGame";
import FiveSecondsGame from "../games/FiveSecondsGame/FiveSecondsGame";



export const routes: RouteObject[] = [
    {
        path: '/react-game/',
        element: <App />,
        children: [
            { path: 'rotate', element: <RotateGame /> },
            { path: '5seconds', element: <FiveSecondsGame /> },
        ]
    }
]

export const router = createBrowserRouter(routes);