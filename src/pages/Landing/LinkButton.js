import { Link } from "react-router-dom";

const LinkButton = ({ label, theme, to }) => {
    if (theme === "white") {
        return (
            <Link 
                to={to}
                className="px-3 py-1 ml-2 text-sm transition-all rounded-full hover:bg-gray-200">
                { label }
            </Link>
        );
    }
    else if (theme === "blue") {
        return (
            <Link 
                to={to}
                className="px-3 py-1 ml-2 text-sm text-white transition-all bg-blue-500 rounded-full hover:bg-blue-600">
                { label }
            </Link>
        );
    }
};

export default LinkButton;