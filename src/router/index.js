import {createBrowserRouter} from "react-router-dom";
import Layout from "../pages/Layout";
import Boards from "../components/board/Boards";
import SingleBoard from "../components/board/SingleBoard";
import Users from "../components/user/Users";


export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {index: true, element: <Boards/>, exact: true},
            {path: '/boards', element: <Boards/>},
            {path: '/boards/:id', element: <SingleBoard/>},
            {path: '/users', element: <Users/>},
        ]
    }
])