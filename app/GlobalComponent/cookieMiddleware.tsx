import { cookies } from "next/headers";

export default async function GetCookies() {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;
    const email = cookieStore.get("email")?.value;
    const firstName = cookieStore.get("firstName")?.value;
    const lastName = cookieStore.get("lastName")?.value;
    const role = cookieStore.get("role")?.value;


    return {
        firstName: firstName,
        lastName: lastName,
        role: role,
        email: email,
        token: token,
    };
}

export async function checkToken() {
    const cookieStore = await cookies();
    return Boolean(cookieStore.get("token")?.value);
}

export async function getEmail() {
    const cookieStore = await cookies();
    return cookieStore.get("email")?.value;
}

export async function getTokens() {
    const cookieStore = await cookies();
    return cookieStore.get("token")?.value;
}

