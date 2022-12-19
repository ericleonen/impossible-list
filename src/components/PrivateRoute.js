import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ auth, children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuth !== true) {
            navigate("/login");
        }
    });

    return children;
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);