import {getTokens} from "../../GlobalComponent/cookieMiddleware";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import { NextResponse } from "next/server";


export async function GET() {
    try {
        const token: string | undefined = await getTokens();

        if(!token){
            return NextResponse.json(
                { message: "Token not found in cookies" },
                { status: 401 }
            );
        }

        const response = await fetch(
            "http://10.26.0.99/store/",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                cache: "no-store",
            }
        );

        const text = await response.text();

        if (!response.ok) {
            return NextResponse.json(
                {
                    backendStatus: response.status,
                    backendMessage: text,
                },
                { status: response.status }
            );
        }
        return NextResponse.json(JSON.parse(text));
    } catch (err) {
        console.error("API ERROR:", err);

        return NextResponse.json(
            {
                message: "Internal server error",
                error: String(err),
            },
            { status: 500 }
        );
    }
}
