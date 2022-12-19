import { RxCross2 } from "react-icons/rx";

const ModalHeader = ({ children, closeModal }) => {
    return (
        <div className="relative flex flex-col items-center w-full py-4 text-lg font-semibold shadow-md">
            <button 
                onClick={closeModal}
                className="absolute top-1/2 translate-y-[-50%] text-xl left-3 rounded-full p-2 hover:bg-gray-200 font-semibold text-gray-400 hover:text-red-500">
                <RxCross2 />
            </button>
            { children }
        </div>
    );
};

export default ModalHeader;