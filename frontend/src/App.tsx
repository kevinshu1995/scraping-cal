import * as React from "react";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";

const ViewHome = React.lazy(() => import("./views/ViewHome"));
const ViewProfile = React.lazy(() => import("./views/ViewProfile"));

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
                    <Route element={<ViewHome />} index />
                    <Route element={<ViewProfile />} path="profile" />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function MainLayout() {
    return (
        <div>
            <ThemeProvider defaultTheme="dark" storageKey="theme">
                <h1>Scraping.Cal</h1>
                <ModeToggle />
                <Outlet />
            </ThemeProvider>
        </div>
    );
}

function ErrorPage() {
    return (
        <>
            <h2>Oops!</h2>
            <h1>404 Not Found</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <Link to={`/`} className={buttonVariants()}>
                Go to Home page
            </Link>
        </>
    );
}

