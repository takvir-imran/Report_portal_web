import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("📥 Received body:", body);

        const backendResponse = await fetch(
            "http://10.26.0.99/api/signup/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        const rawText = await backendResponse.text();

        console.log("📦 Raw backend response:", rawText);

        let result: unknown;

        try {
            result = rawText ? JSON.parse(rawText) : {};
        } catch {
            result = { message: rawText };
        }

        return NextResponse.json(result as object, {
            status: backendResponse.status,
        });

    } catch (error) {
        console.error("❌ Signup proxy error:", error);

        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
