import { NextResponse } from "next/server";
import {getTokens} from "../../../../GlobalComponent/cookieMiddleware";

interface Store {
    code: string;
    ip?: string;
    IP?: string;
    status?: number;
}

// Add 'async' and await params
export async function GET(
    request: Request,
    { params }: { params: Promise<{ code: string }> }  // params is now a Promise
) {
    const { code } = await params;  // Await params here!

    console.log("--- API ROUTE HIT ---");
    console.log("Searching for Code:", code);

    try {
        let token;
        try {
            token = await getTokens();
            console.log("🔑 Token obtained:", token ? "Yes" : "No");
        } catch (tokenError) {
            console.error("❌ Token error:", tokenError);
            return NextResponse.json({ message: "Auth error" }, { status: 401 });
        }

        if (!token) {
            console.error("❌ No token available");
            return NextResponse.json({ message: "No auth token" }, { status: 401 });
        }

        const res = await fetch("http://10.26.0.99/store/", {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });

        console.log("🌐 Backend response status:", res.status);

        if (!res.ok) {
            console.error("Backend failed with status:", res.status);
            return NextResponse.json({ message: "Backend error" }, { status: 500 });
        }

        const stores: Store[] = await res.json();
        console.log(`📦 Received ${stores.length} stores from backend`);

        if (stores.length > 0) {
            console.log("First store sample:", JSON.stringify(stores[0]));
        }

        // Now use 'code' instead of 'params.code'
        const store = stores.find(s => s.code.toLowerCase() === code.toLowerCase());

        if (!store) {
            console.warn(`❌ Store ${code} not found in the list of ${stores.length} stores.`);
            console.log("Available store codes:", stores.slice(0, 10).map(s => s.code));
            return NextResponse.json({ message: "Not found" }, { status: 404 });
        }

        const ip = store.IP || store.ip || null;
        console.log("✅ Match found! IP is:", ip);
        return NextResponse.json({ ip });

    } catch (err) {
        console.error("💥 Critical API Error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}