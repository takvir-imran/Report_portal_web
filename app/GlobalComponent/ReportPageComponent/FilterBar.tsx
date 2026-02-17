"use client";

import React, { useState } from "react";
import {
    Flex,
    chakra,
    Box, Button,
} from "@chakra-ui/react";

import StoreDropDown from "./StoreDropDown";

import DateField from "./DateField";
import Dropdown_v2 from "./Dropdown_v2";

type FilterBarProps = {
    action: string | ((formData: FormData) => void);
};

export function FilterBar({ action }: FilterBarProps) {
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [loading, setLoading] = useState(false);

    const list = ["MIS", "Consumption", "Pay Type", "Order Line"];

    return (
        <chakra.form action={action} style={{ width: "100%" }}>
            <Flex
                bg="gray.100"
                h="96px"
                px="64px"
                gap={4}
                alignItems="center"
            >
                <DateField
                    fieldObj="Start Date"
                    name="Start_Date"
                    value={startDate}
                    onChange={setStartDate}
                />

                <DateField
                    fieldObj="End Date"
                    name="End_Date"
                    value={endDate}
                    onChange={setEndDate}
                />

                <Box width="150px">
                    <Dropdown_v2
                        options={list}
                        placeholder="Select Table"
                        name="DataTable"
                    />
                </Box>

                <Box width="150px">
                    <StoreDropDown name="Store" />
                </Box>

                <Button
                    mt="1.85rem"
                    type="submit"
                    size="lg"
                    bg="blue.600"
                    color="white"
                    loading={loading}
                >
                    Search
                </Button>
            </Flex>
        </chakra.form>
    );
}
