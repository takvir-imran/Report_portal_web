export default function LoginButton({btnName, type}){

    return (
        <div>
            <button type={type} className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">{btnName}</button>
        </div>
    );
}