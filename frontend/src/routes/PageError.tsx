import { Link } from "react-router-dom";

export default () => {
    return (
        <>
            <h2>Oops!</h2>
            <h1>404 Not Found</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <Link to={`/`}>Go to Home page</Link>
        </>
    );
};

