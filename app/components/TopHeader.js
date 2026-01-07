
import Link from "next/link";
import Image from "next/image";
import { Bebas_Neue } from 'next/font/google';
export default function TopHeader (){

    return (
        <header className="flex justify-between bg-white shadow-md h-16 px-16 items-center">
            <div className="flex items-center">
                <Image className="" src="/source/Dominos_pizza_logo.png" alt="logo" height={30} width={30}></Image>
                <h1 className={`px-2 text-xl`}>Dominos Report Portal</h1>
            </div>
            
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <ul className="flex space-x-8">
                    <li><Link className="px-6 py-6 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 font-bold" href="/">Home</Link></li>
                    <li><Link className="px-6 py-6 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 font-bold"  href="/Report">Report</Link></li>
                    <li><Link className="px-6 py-6 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 font-bold" href="/About">About</Link></li>
                </ul>
            </nav>
            <div>
                <Link className="px-6 py-6 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200 font-bold" href="/Login">Login</Link>
            </div>
        </header>
    );
}