import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

export default () => {
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
};

