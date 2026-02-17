"use client";

import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

/* ---------- Props ---------- */

type CountViewProps = {
    table: string;
    startDate: string;
    endDate: string;
    store: string;
};

export default function CountView({
                                      table,
                                      startDate,
                                      endDate,
                                      store,
                                  }: CountViewProps) {
    const [count, setCount] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!startDate || !endDate) return;

        const fetchCount = async () => {
            try {
                const response = await fetch(
                    `http://10.26.0.99/${table}/count/?sDate=${startDate}&eDate=${endDate}&dpc=${store}`,
                    { cache: "no-store" }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch count");
                }

                const result: number = await response.json();
                setCount(result);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load count"
                );
            }
        };

        fetchCount();
    }, [table, startDate, endDate, store]);

    /* ---------- UI ---------- */

    if (error) {
        return (
            <Text color="red.500">
                {error}
            </Text>
        );
    }

    return (
        <Text>
            Total{" "}
            <Text as="strong">
                {count}
            </Text>{" "}
            data found
        </Text>
    );
}
