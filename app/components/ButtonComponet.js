export default function ButtonComponent({btnName, type}){

    return (
        <div>
            <button type={type} className="mt-5.5 px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">{btnName}</button>
        </div>
    );
}