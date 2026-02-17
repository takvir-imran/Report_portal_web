import { NextRequest, NextResponse } from "next/server";
import {getTokens} from "../../../GlobalComponent/cookieMiddleware";


export async function GET(req: NextRequest) {
    console.log('🟢 ========== API Route /api/reports called ==========');

    try {
        const searchParams = req.nextUrl.searchParams;
        const table = searchParams.get('table');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const store = searchParams.get('store') || "";
        const ip = searchParams.get('ip') || "";

        console.log('🟢 Parameters:', { table, startDate, endDate, store });

        if (!startDate || !endDate || !table) {
            console.error('❌ Missing required parameters');
            return NextResponse.json(
                { message: "Table, start date and end date are required" },
                { status: 400 }
            );
        }

        console.log('🟢 Step 1: Getting token...');
        let token: string | undefined;

        try {
            token = await getTokens();
            console.log('🟢 Token retrieved:', token ? 'YES (length: ' + token.length + ')' : 'NO');
        } catch (tokenError) {
            console.error('❌ getTokens() threw error:', tokenError);
            return NextResponse.json(
                {
                    message: "Failed to get authentication token",
                    error: tokenError instanceof Error ? tokenError.message : String(tokenError)
                },
                { status: 500 }
            );
        }

        if (!token) {
            console.error('❌ Token is undefined or empty');
            return NextResponse.json(
                { message: "Authentication token missing - please log in" },
                { status: 401 }
            );
        }

        console.log('🟢 Step 2: Building API URL...');
        let apiUrl = "";

        switch (table) {
            case "MIS":
                apiUrl = `http://10.26.0.99/bdmis/?sDate=${startDate}&eDate=${endDate}&dpc=${store}`;
                break;
            case "Consumption":
                apiUrl = `http://${ip}/cons/?sDate=${startDate}&eDate=${endDate}&dpc=${store}`;
                break;
            case "Pay Type":
                apiUrl = `http://${ip}/pt/?sDate=${startDate}&eDate=${endDate}&dpc=${store}`;
                break;
            case "Order Line":
                apiUrl = `http://${ip}/ol/?sDate=${startDate}&eDate=${endDate}&dpc=${store}`;
                break;
            default:
                console.error('❌ Invalid table:', table);
                return NextResponse.json(
                    { message: `Invalid table selection: ${table}` },
                    { status: 400 }
                );
        }

        if (store) {
            apiUrl += `&store=${store}`;
        }

        console.log('🟢 Step 3: Fetching from external API:', apiUrl);

        let response;
        try {
            response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log('🟢 External API response status:', response.status);
            console.log('🟢 External API response ok:', response.ok);
        } catch (fetchError) {
            console.error('❌ Fetch failed:', fetchError);
            return NextResponse.json(
                {
                    message: "Cannot connect to external API",
                    error: fetchError instanceof Error ? fetchError.message : String(fetchError),
                    url: apiUrl
                },
                { status: 503 }
            );
        }

        console.log('🟢 Step 4: Reading response body...');
        // Read the body as text first (only once!)
        const responseText = await response.text();

        if (!response.ok) {
            console.error('❌ External API error response:', responseText.substring(0, 500));
            return NextResponse.json(
                {
                    message: `External API error (${response.status})`,
                    details: responseText.substring(0, 200)
                },
                { status: response.status }
            );
        }

        console.log('🟢 Step 5: Parsing JSON...');
        let data;
        try {
            data = JSON.parse(responseText);
            console.log('🟢 Data parsed. Type:', Array.isArray(data) ? 'Array' : typeof data);
            console.log('🟢 Records count:', Array.isArray(data) ? data.length : 'N/A');
        } catch (parseError) {
            console.error('❌ JSON parse error:', parseError);
            console.error('❌ Response text:', responseText.substring(0, 500));
            return NextResponse.json(
                { message: "External API returned invalid JSON", details: responseText.substring(0, 200) },
                { status: 500 }
            );
        }

        console.log('🟢 ========== Success! Returning data ==========');
        return NextResponse.json(data);

    } catch (error) {
        console.error('❌ ========== UNEXPECTED ERROR ==========');
        console.error('❌ Type:', error instanceof Error ? error.constructor.name : typeof error);
        console.error('❌ Message:', error instanceof Error ? error.message : String(error));
        console.error('❌ Stack:', error instanceof Error ? error.stack : 'No stack');

        return NextResponse.json(
            {
                message: "Server error",
                error: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}