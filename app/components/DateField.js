export default function DateField({fieldObj, date, onChange, name}){
    
    return (
        <div>
            <label htmlFor="StartDate" className="px-2 text-sm">{fieldObj}</label>
            <div className="flex items-center h-12 bg-white rounded-sm px-4 shadow-sm">
                <input
                    type="date"
                    placeholder=""
                    name={name}
                    value={date}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-transparent border-none text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1 transition duration-200"/>
            </div>
        </div>
    );
}