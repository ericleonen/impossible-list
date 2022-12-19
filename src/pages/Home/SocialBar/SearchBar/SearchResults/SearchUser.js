import { connect } from "react-redux";
import { setViewUser } from "../../../../../actions/socialActions";

const SearchUser = ({ name, id, setViewUser }) => {
    const onClick = () => {
        setViewUser(id);
    };

    return (
        <button 
            onClick={onClick}
            className="flex p-4 hover:bg-gray-100"
        >
            <p>{ name }</p>
        </button>
    );
};

export default connect(() => ({}), { setViewUser })(SearchUser);