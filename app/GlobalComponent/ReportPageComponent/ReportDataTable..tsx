"use client";

import React, { useState, useEffect } from "react";
import {Box, Button, Spinner, Text} from "@chakra-ui/react";
import DataTable from "./DataTable";


type ReportDataTableProps = {
    table: string;
    startDate: string;
    endDate: string;
    store: string;
    ip: string;
};

export default function ReportDataTable({table, startDate, endDate, store, ip}: ReportDataTableProps)
{
    const [data, setData] = useState<Record<string, unknown>[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const downloadCsv = () => {
        const params = new URLSearchParams({
            table,
            startDate,
            endDate,
            store,
            ip,
        });

        window.location.href =
            `/api/datatable/bdmis/csv?${params.toString()}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Format dates to YYYY-MM-DD if needed
                const formatDate = (dateStr: string) => {
                    try {
                        const date = new Date(dateStr);
                        return date.toISOString().split('T')[0];
                    } catch {
                        return dateStr; // Return as-is if formatting fails
                    }
                };

                const formattedStartDate = formatDate(startDate);
                const formattedEndDate = formatDate(endDate);

                // Build query params
                const params = new URLSearchParams({
                    table,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                });

                if (store) {
                    params.append('store', store);
                }
                if (ip) {
                    params.append('ip', ip);
                }

                const url = `/api/datatable/bdmis/?${params.toString()}`;
                console.log('🔵 Fetching from URL:', url);

                // Fetch data from your API
                const response = await fetch(url);

                console.log('🔵 Response status:', response.status);
                console.log('🔵 Response ok:', response.ok);

                // Try to get the response body regardless of status
                let responseData;
                try {
                    responseData = await response.json();
                    console.log('🔵 Response data:', responseData);
                } catch (jsonError) {
                    console.error('❌ Failed to parse JSON:', jsonError);
                    const text = await response.text();
                    console.log('🔵 Response text:', text);
                    throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
                }

                if (!response.ok) {
                    const errorMessage = responseData?.message || responseData?.error || `HTTP ${response.status}`;
                    console.error('❌ API Error:', errorMessage);
                    throw new Error(errorMessage);
                }

                console.log('✅ Data received successfully');

                // Ensure result is an array
                if (Array.isArray(responseData)) {
                    setData(responseData);
                } else if (responseData.data && Array.isArray(responseData.data)) {
                    setData(responseData.data);
                } else {
                    console.error('❌ Invalid data format:', responseData);
                    throw new Error('Invalid data format received from API');
                }
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An error occurred';
                setError(errorMessage);
                console.error('❌ Error fetching report data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [table, startDate, endDate, store, ip]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" p={8}>
                <Spinner size="xl" />
                <Text ml={4}>Loading {table} report...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Box p={8} bg="red.50" borderRadius="md" border="1px solid" borderColor="red.200">
                <Text color="red.500" fontWeight="bold" mb={2}>Error loading data:</Text>
                <Text color="red.600" fontSize="sm">{error}</Text>
                <Text color="gray.600" fontSize="xs" mt={4}>
                    Check the browser console for more details.
                </Text>
            </Box>
        );
    }

    if (data.length === 0) {
        return (
            <Box p={8} bg="gray.50" borderRadius="md">
                <Text color="gray.600">No data found for the selected filters.</Text>
            </Box>
        );
    }

    return (
        <Box p={8}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                {table} Report ({startDate} to {endDate})
            </Text>
            <DataTable data={data} />
            <Button onClick={downloadCsv} mt="1.85rem" size="lg" bg="blue.600" color="white" _hover={{bg: "blue.700"}} >Download Report</Button>
        </Box>
    );
}