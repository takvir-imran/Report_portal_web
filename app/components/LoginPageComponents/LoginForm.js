import Image from "next/image";
import ButtonComponent from "../ButtonComponet";
import InputField from "./InputField";
import LoginButton from "./LoginButton";
import Link from "next/link";

export default function LoginForm(){

    return (
        <div className="relative min-h-screen grid place-items-center">
        {/* Background image */}
            <Image src="/source/Background_image.png" alt="background" fill className="object-cover opacity-20 -z-10"/>

            {/* Foreground content */}
            <div className="w-full max-w-md py-16 place-items-center grid bg-gray-50 rounded-lg shadow-2xl">
                <Image src="/source/Dominos_RMS.png" alt="logo" height={80} width={80}/>
                <p className="py-4 text-2xl">Sign In</p>
                <form>
                <div className="flex flex-col gap-4">
                    <InputField name="email" type="text" placeholder="Name@jublfood.com" />
                    <InputField name="pws" type="password" placeholder="Password" />
                    <LoginButton btnName="Sign In" type="submit" />
                </div>
                </form>
                <div>
                <p className="mt-8">
                    <Link className="text-blue-600 underline" href="/Sign_Up">Sign Up</Link> to create account
                </p>
                </div>
            </div>
        </div>
    );
}