import FormExtra from "../../components/FormExtra";
import FormHeading from "../../components/FormHeading";
import FormInput from "../../components/FormInput";
import FormSubmit from "../../components/FormSubmit";
import FullPage from "../../components/FullPage";
import TextLink from "../../components/TextLink";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import { clearAuthErrors } from "../../actions/errorActions";

const Login = ({ auth, errors, loginUser, clearAuthErrors }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = () => {
        loginUser({
            email,
            password
        });
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuth) {
            navigate("/home");
        }
    }, [auth, navigate]);
    
    const location = useLocation();

    useEffect(() => {
        clearAuthErrors();
    }, [location, clearAuthErrors]);

    return (
        <FullPage verticalCenter horizontalCenter>
            <div className="p-8 rounded-lg shadow-md max-w-[27rem] bg-white">
                <FormHeading>Continue your journey into the <span className="text-blue-500">impossible</span></FormHeading>
                <FormExtra>Don't have an account? <TextLink text="Sign up" to="/signup" /></FormExtra>
                <div className="pt-5">
                    <FormInput
                        setValue={setEmail}
                        value={email} 
                        label="Email" 
                        placeholder="Your email address"
                        error={errors.email}
                    />
                    <FormInput
                        setValue={setPassword}
                        value={password} 
                        label="Password" 
                        placeholder="Your password" 
                        sensitive 
                        error={errors.password}
                    />
                    <FormSubmit 
                        onClick={onSubmit}
                        label="Log in" 
                    />
                </div>
            </div>
        </FullPage>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors.auth
});

export default connect(mapStateToProps, { loginUser, clearAuthErrors })(Login);