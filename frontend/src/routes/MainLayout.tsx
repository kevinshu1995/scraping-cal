import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

function App() {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <h1>Scraping.Cal</h1>
                <ModeToggle />
                <Outlet />
            </ThemeProvider>
        </>
    );
}

export default App;

