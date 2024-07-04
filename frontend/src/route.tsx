import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./routes/MainLayout";

import PageError from "./routes/PageError";

import ViewHome from "./routes/views/ViewHome";
import ViewProfile from "./routes/views/ViewProfile";

const Root = () => {
    const Router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            errorElement: <PageError />,
            children: [
                {
                    path: "/",
                    element: <ViewHome />,
                },
                {
                    path: "/profile",
                    element: <ViewProfile />,
                },
            ],
        },
    ]);
    return <RouterProvider router={Router} />;
};

export { Root };

