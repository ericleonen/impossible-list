const UtilButton = ({ text, icon: Component, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className="flex flex-col items-center justify-center p-3 mt-auto text-2xl text-gray-600 transition-all rounded-lg hover:bg-white hover:shadow-md hover:text-blue-500">
            <Component />
            <p className="mt-1 text-xs">{ text }</p>
        </button>
    );
};

export default UtilButton;