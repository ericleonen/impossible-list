const FullPage = ({ children, verticalCenter, horizontalCenter }) => {
    return (
        <div className={
            "bg-gray-200 flex flex-col w-full h-screen overflow-hidden" 
            + (verticalCenter ? " justify-center" : "")
            + (horizontalCenter ? " items-center" : "")
        }>
            { children }
        </div>
    );
};

export default FullPage;