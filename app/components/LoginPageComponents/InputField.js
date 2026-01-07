export default function InputField({type, placeholder}){

    return <input className="w-80 rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-gray-600, focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition" type={type}  placeholder={placeholder} />
}