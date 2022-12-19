import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import FormExtra from "../../components/FormExtra";
import FormHeading from "../../components/FormHeading";
import FormInput from "../../components/FormInput";
import FormSubmit from "../../components/FormSubmit";
import FullPage from "../../components/FullPage";
import TextLink from "../../components/TextLink";
import { clearAuthErrors } from "../../actions/errorActions";
import { useLocation } from "react-router-dom";

const SignUp = ({ errors, auth, registerUser, clearAuthErrors }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();

    const onSubmit = () => {
        registerUser({
            name,
            email,
            password,
            password2
        },
        navigate);
    };

    useEffect(() => {
        if (auth.isAuth) {
            navigate("/home");
        }
    });

    const location = useLocation();

    useEffect(() => {
        clearAuthErrors();
    }, [location]);

    return (
        <FullPage verticalCenter horizontalCenter>
            <div className="bg-white p-8 rounded-lg shadow-md max-w-[27rem]">
                <FormHeading>Begin your journey into the <span className="text-blue-500">impossible</span></FormHeading>
                <FormExtra>Already have an account? <TextLink text="Log in" to="/login"/></FormExtra>
                <div className="pt-5">
                    <FormInput
                        value={name}
                        setValue={setName}
                        label="Name" 
                        placeholder="Your name"
                        error={errors.name} 
                    />
                    <FormInput
                        value={email}
                        setValue={setEmail} 
                        label="Email" 
                        placeholder="Your email address"
                        error={errors.email}
                    />
                    <FormInput
                        value={password}
                        setValue={setPassword}
                        label="Password" 
                        placeholder="6-30 characters" 
                        sensitive 
                        error={errors.password}
                    />
                    <FormInput 
                        value={password2}
                        setValue={setPassword2}
                        label="Password Confirm" 
                        placeholder="Must match password" 
                        sensitive 
                        error={errors.password2}
                    />
                    <FormSubmit 
                        onClick={onSubmit}
                        label="Create account" 
                    />
                </div>
            </div>
        </FullPage>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors.auth
});

export default connect(mapStateToProps, { registerUser, clearAuthErrors })(SignUp);