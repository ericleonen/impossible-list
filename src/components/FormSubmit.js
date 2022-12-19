const FormSubmit = ({ label, onClick, danger }) => {
    return (
        <button 
            onClick={onClick}
            className={"hover:shadow-md w-full px-4 py-3 mt-4 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600" + (danger ? " bg-red-500 hover:bg-red-600" : "")}>
            { label }
        </button>
    );
};

export default FormSubmit;