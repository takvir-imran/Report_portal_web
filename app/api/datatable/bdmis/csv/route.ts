import { NextRequest, NextResponse } from "next/server";
import {getTokens} from "../../../../GlobalComponent/cookieMiddleware";

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;

        const table = params.get("table");
        const startDate = params.get("startDate");
        const endDate = params.get("endDate");
        const store = params.get("store") || "";
        const ip = params.get("ip") || "";

        if (!table || !startDate || !endDate) {
            return NextResponse.json(
                { message: "Missing parameters" },
                { status: 400 }
            );
        }

        const token = await getTokens();

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        let apiUrl = "";

        switch (table) {
            case "MIS":
                apiUrl = `http://10.26.0.99/download/?sDate=${startDate}&eDate=${endDate}&dpc=${store}`;
                break;

            case "Consumption":
                apiUrl = `http://${ip}/cons/csv/?sDate=${startDate}&eDate=${endDate}&dpc=${store}`;
                break;

            case "Pay Type":
                apiUrl = `http://${ip}/pt/csv/?sDate=${startDate}&eDate=${endDate}&dpc=${store}`;
                break;

            case "Order Line":
                apiUrl = `http://${ip}/ol/csv/?sDate=${startDate}&eDate=${endDate}&dpc=${store}`;
                break;

            default:
                return NextResponse.json(
                    { message: "Invalid table" },
                    { status: 400 }
                );
        }

        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const csv = await response.text();

        if (!response.ok) {
            return NextResponse.json(
                { message: "External API error", details: csv },
                { status: response.status }
            );
        }

        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename=${table}_${store}_${startDate}_${endDate}.csv`,
            },
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
