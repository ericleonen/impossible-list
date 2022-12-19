const FormInput = ({ label, placeholder, sensitive, value, setValue, error }) => {
    return (
        <label className="block mb-4">
            <p className={
                "font-semibold text-gray-500"
                + (error ? " text-red-500" : "")}>
                    { label }
            </p>
            <input 
                className={
                    "w-full px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 focus:bg-gray-100" 
                    + (error ? " border-red-500 bg-red-100 hover:bg-red-200 focus:bg-red-200" : "")}
                type={sensitive ? "password" : "text"}
                placeholder={placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <p className="w-full mt-1 text-sm font-semibold text-right text-red-500">{ error }</p>
        </label>
    );
};

export default FormInput;