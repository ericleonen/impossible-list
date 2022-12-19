import UtilButton from "./UtilButton";
import { logoutUser } from "../../../actions/authActions";
import { connect } from "react-redux";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { setViewUser } from "../../../actions/socialActions";
import isEmpty from "is-empty";
import { FaHome } from "react-icons/fa";

const UtilityBar = ({ logoutUser, isSocial, setViewUser }) => {
    const navigate = useNavigate();

    return (
        <div className="h-full p-4">
            {
               isSocial && 
               <UtilButton 
                    icon={FaHome}
                    text="My List"
                    onClick={() => setViewUser(null)}
               />
            }
            <UtilButton 
                onClick={() => logoutUser(navigate)}
                icon={BiLogOut}
                text="Log Out"
            />
        </div>
    );
};

const mapStateToProps = state => ({
    isSocial: !isEmpty(state.social.viewUser)
});

export default connect(mapStateToProps, { logoutUser, setViewUser })(UtilityBar);