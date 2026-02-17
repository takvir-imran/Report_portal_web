import {cookies} from "next/headers";
import TopHeaderClient from "./TopHeaderClient";


export default async function TopHeader() {
    const cookieStore = await cookies();
    const token: string | undefined = cookieStore.get("token")?.value;
    const email: string | undefined = cookieStore.get("email")?.value;

    return <TopHeaderClient />
}