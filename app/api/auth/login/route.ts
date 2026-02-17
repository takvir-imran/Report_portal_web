import { NextRequest, NextResponse } from "next/server";

type AspNetLoginResponse = {
    userID: number;
    email: string;
    token: string;
};

export async function POST(req: NextRequest) {
    const body = await req.json();

    const res = await fetch("http://10.26.0.99/api/signin/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        return NextResponse.json(
            { message: "Invalid email or password" },
            { status: 401 }
        );
    }

    const data: AspNetLoginResponse = await res.json();


    const response = NextResponse.json({
        userID: data.userID,
        email: data.email,
    });

    response.cookies.set("token", data.token, {
        path: "/",
        maxAge: 60 * 30,
        sameSite: "lax",
    });

    response.cookies.set("email", data.email, {
        path: "/",
        maxAge: 60 * 30,
        sameSite: "lax",
    });

    return response;
}
