import React, { Suspense, lazy } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

// ---------------------------------------------------

import { AuthLayout, DashboardLayout } from './layouts';
import { Page404, Loading } from './pages';
import { useSelector } from 'react-redux';

// ---------------------------------------------------

const Load = (path) => (props) => {
    const Component = lazy(() => import(path));

    return (
        <Suspense fallback={<Loading />}>
            <Component {...props} />
        </Suspense>
    )
}

const Login = Load('./pages/auth/LoginPage.jsx');
const Register = Load('./pages/auth/RegisterPage.jsx');
const Forgot = Load('./pages/auth/ForgotPage.jsx');
const Chats = Load('./pages/dashboard/ChatsPage.jsx');
const Groups = Load('./pages/dashboard/GroupsPage.jsx');
const Calls = Load('./pages/dashboard/CallsPage.jsx');
const Settings = Load('./pages/dashboard/SettingsPage.jsx');

// ----------------------------------------------------
const ProtectedRoute = ({ Component }) => {
    const isLoggedIn = useSelector(s => s.user.isLoggedIn);
    if (!isLoggedIn) return <Navigate to={'/auth/login'} replace />

    return <Component />
}
const GuestRoute = ({ Component }) => {
    const isLoggedIn = useSelector(s => s.user.isLoggedIn);
    if (isLoggedIn) return <Navigate to={'/chats'} replace />

    return <Component />
}
const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute Component={DashboardLayout} />,
        children: [
            { element: <Navigate to={'chats'} replace />, index: true },
            { path: 'chats', element: <Chats /> },
            { path: 'groups', element: <Groups /> },
            { path: 'calls', element: <Calls /> },
            { path: 'settings', element: <Settings /> },

            { path: "*", element: <Page404 /> }
        ]
    },
    {
        path: "/auth",
        element: <GuestRoute Component={AuthLayout} />,
        children: [
            { element: <Navigate to={'login'} replace />, index: true },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: 'forgot', element: <Forgot /> },

            { path: "*", element: <Page404 /> }
        ]
    },

    { path: "*", element: <Page404 /> },
]);

//-----------------------------------------------------
const Router = () => {
    return <RouterProvider router={router} />
}

export default Router