"use client";

import {Table, Box, Button} from "@chakra-ui/react";
import React from "react";

type DataTableProps<T extends Record<string, unknown>> = {
    data?: T[];
};

export default function DataTable<T extends Record<string, unknown>>({
                                                                         data = [],
                                                                     }: DataTableProps<T>) {

    if (data.length === 0) {
        return <p>No data found</p>;
    }

    const columns = Object.keys(data[0]) as (keyof T)[];

    return (
        <Box
            overflowX="auto"
            maxW="100%"
            w="100%"
            maxH="65vh"
            overflowY="auto"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            bg="white"
            boxShadow="sm"
            css={{
                '&::-webkit-scrollbar': {
                    height: '12px',
                    width: '12px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '6px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555',
                },
            }}
        >
            <Table.Root size="sm" variant="outline">
                <Table.Header
                    position="sticky"
                    top={0}
                    bg="gray.50"
                    zIndex={1}
                >
                    <Table.Row>
                        {columns.map((col) => (
                            <Table.ColumnHeader
                                key={String(col)}
                                whiteSpace="nowrap"
                                px="4"
                                py="3"
                                fontSize="sm"
                                fontWeight="semibold"
                                color="gray.700"
                                textTransform="capitalize"
                            >
                                {String(col).replace(/_/g, ' ')}
                            </Table.ColumnHeader>
                        ))}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {data.map((row, rowIndex) => (
                        <Table.Row
                            key={rowIndex}
                            _hover={{ bg: "gray.50" }}
                            borderBottom="1px solid"
                            borderColor="gray.100"
                        >
                            {columns.map((col) => (
                                <Table.Cell
                                    key={String(col)}
                                    whiteSpace="nowrap"
                                    px="4"
                                    py="2"
                                    fontSize="sm"
                                    color="gray.600"
                                >
                                    {String(row[col])}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Box>
    );
}