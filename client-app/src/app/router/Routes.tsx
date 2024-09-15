import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../../features/common/layout/App";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventForm from "../../features/events/form/EventForm";
import EventDetails from "../../features/events/details/EventDetails";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import ProfilePage from "../../features/users/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: 'events', element: <EventDashboard />},
                {path: 'events/:id', element: <EventDetails />},
                {path: 'createEvent', element: <EventForm key='create' />},
                {path: 'manage/:id', element: <EventForm key='manage' />},
                {path: 'profiles/:username', element: <ProfilePage />},
            ]},
            {path: 'not-found', element: <NotFound />},            
            {path: 'server-error', element: <ServerError />},            
            {path: '*', element: <Navigate replace to='not-found' />},            
        ]
    }
]

export const router = createBrowserRouter(routes);