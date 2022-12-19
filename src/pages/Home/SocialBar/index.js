import FollowingList from "./FollowingList";
import SearchBar from "./SearchBar";

const SocialBar = () => {
    return (
        <div className="h-full p-4">
            <SearchBar />
            <FollowingList />
        </div>
    );
};

export default SocialBar;