import { FaSearch } from "react-icons/fa";
import { connect } from "react-redux";
import { searchUsers } from "../../../../actions/socialActions";
import SearchResults from "./SearchResults";

const SearchBar = ({ userId, searchUsers }) => {
    const onChange = ({ target }) => {
        searchUsers(target.value, userId);
    };

    const onBlur = () => {
        setTimeout(() => searchUsers(null, null), 100);
    }

    const onFocus = onChange;

    return (
        <div className="relative flex transition-all bg-white border-2 border-transparent rounded-lg group focus-within:border-blue-500 hover:shadow-md">
            <div className="p-4 font-semibold text-gray-500 transition-all group-hover:text-blue-500 group-focus-within:text-blue-500">
                <FaSearch />
            </div>
            <input
                onFocus={onFocus}
                onChange={onChange}
                onBlur={onBlur}
                type="text" 
                className="w-full py-3 pr-4 bg-transparent focus:outline-none"
                placeholder="Search users..."
            />
            <SearchResults />
        </div>
    );
};

const mapStateToProps = state => ({
    userId: state.auth.user.id
});

export default connect(mapStateToProps, { searchUsers })(SearchBar);