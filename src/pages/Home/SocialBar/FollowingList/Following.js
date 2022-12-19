import isEmpty from "is-empty";
import { connect } from "react-redux";
import { setViewUser } from "../../../../actions/socialActions";

const Following = ({ name, id, setViewUser, viewUserId }) => {
    const onClick = () => {
        setViewUser(id);
    };

    if (viewUserId === id) {
        return (
            <div className="w-full px-3 py-2 font-semibold text-left transition-all rounded-lg">
                { name }
            </div>
        );
    }

    return (
        <button 
            onClick={onClick}
            className="w-full px-3 py-2 text-left transition-all rounded-lg hover:shadow-md hover:bg-white"
        >
            { name }
        </button>
    );
};

const mapStateToProps = state => ({
    viewUserId: !isEmpty(state.social.viewUser) ? state.social.viewUser._id : null
});

export default connect(mapStateToProps, { setViewUser })(Following);