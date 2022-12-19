import LinkButton from "./LinkButton";
import Logo from "../../components/Logo";

const NavBar = () => {
    return (
        <div className="flex items-center w-full px-8 py-3 bg-white shadow-md">
            <Logo />
            <div className="flex ml-auto">
                <LinkButton to="/signup" label="Sign up" theme="blue" />
                <LinkButton to="/login" label="Login" theme="white" />
            </div>
        </div>
    );
};

export default NavBar;