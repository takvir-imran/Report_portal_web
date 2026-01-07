'use client';

import { useEffect, useState } from "react";
import ButtonComponent from "./ButtonComponet";
import DownloadBtn from "./DownloadBtn";
import CountView from "./CountView";

export default function DataTable({ table ,startDate, endDate, store }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    var response;

    useEffect(() => {
        if (!startDate || !endDate) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `http://10.26.0.99/${table}?sDate=${startDate}&eDate=${endDate}&dpc=${store}`,
                    { cache: "no-store" }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    if (loading) return <p>Loading data...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!Array.isArray(data) || data.length === 0)
        return <p className="text-gray-500">No data available</p>;

    const columns = Object.keys(data[0]);

    return (
    <>
    <div className="relative">
        <div className="max-h-[72vh] overflow-auto">
            <table className="min-w-full border-collapse">
                <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                        {columns.map(col => (
                            <th
                                key={col}
                                className="px-4 py-2 text-left text-sm font-semibold border-b"
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                            {columns.map(col => (
                                <td
                                    key={col}
                                    className="px-4 py-2 text-sm border-b whitespace-nowrap"
                                >
                                    {String(row[col])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    <div className="flex px-8 justify-between items-center">
        <CountView startDate={startDate} endDate={endDate} store={store} table={table}/>
        <DownloadBtn btnName="Download" type="button" startDate={startDate} endDate={endDate} store={store} />
    </div>
    </>
);

}
