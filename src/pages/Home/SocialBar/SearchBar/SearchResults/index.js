import { connect } from "react-redux";
import SearchUser from "./SearchUser";

const SearchResults = ({ searchUsers }) => {
    if (searchUsers.length !== 0) {
        return (
            <div className="absolute flex flex-col w-full bg-white rounded-lg shadow-md top-full">
                { 
                    searchUsers.map((user, index) => {
                        return <SearchUser 
                                    name={user.name} 
                                    id={user._id} 
                                    key={`user_${index}`}
                                />
                    })
                }
            </div>
        );
    }
};

const mapStateToProps = state => ({
    searchUsers: state.social.searchUsers
});

export default connect(mapStateToProps)(SearchResults);