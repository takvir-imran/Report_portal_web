"use client";

import { useState } from "react";
import { FilterBar } from "../GlobalComponent/ReportPageComponent/FilterBar";
import TopHeaderClient from "../GlobalComponent/TopHeaderClient";
import ReportDataTable from "../GlobalComponent/ReportPageComponent/ReportDataTable.";
import { getIP } from "../lib/getIP";

export default function ReportPage() {
    const [filters, setFilters] = useState({
        table: "",
        startDate: "",
        endDate: "",
        store: "",
        ip: "",
    });

    const action = async (formData: FormData) => {

        const table = formData.get("DataTable")?.toString() || "";
        const startDate = formData.get("Start_Date")?.toString() || "";
        const endDate = formData.get("End_Date")?.toString() || "";
        const store = formData.get("Store")?.toString() || "";
        const ip: string = (await getIP(store)) ?? "";

        setFilters({ table, startDate, endDate, store, ip });

    };

    return (
        <>
            <TopHeaderClient />
            <FilterBar action={action} />

            {filters.table && filters.startDate && filters.endDate && (
                <ReportDataTable
                    table={filters.table}
                    startDate={filters.startDate}
                    endDate={filters.endDate}
                    store={filters.store}
                    ip = {filters.ip}
                />
            )}
        </>
    );
}