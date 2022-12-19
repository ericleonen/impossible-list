import Shader from "./Shader";

const ModalBase = ({ children }) => {
    return (
        <>
            <Shader />
            <div className="absolute z-20 left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col bg-white rounded-lg shadow-md w-1/3 min-w-[30rem]">
                { children }
            </div>
        </>
    );
};

export default ModalBase;