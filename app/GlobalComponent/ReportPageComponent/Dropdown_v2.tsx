"use client";

import { useState } from "react";
import {
    Portal,
    Select,
    createListCollection,
} from "@chakra-ui/react";

type DropdownItem = {
    id: string;
    label: string;
    value: string;
};

type DropdownProps = {
    options: string[];
    placeholder: string;
    name: string;
    defaultValue?: string;
};

export default function Dropdown_v2({
                                        options,
                                        placeholder,
                                        name,
                                        defaultValue = "",
                                    }: DropdownProps) {

    // ✅ create stable, unique ids
    const collection = createListCollection<DropdownItem>({
        items: options.map((opt, index) => ({
            id: `${opt}-${index}`,
            label: opt,
            value: opt,
        })),
    });
    const [value, setValue] = useState<string[]>(
        defaultValue ? [defaultValue] : []
    );

    return (
        <>
            {/* form value */}
            <input
                type="hidden"
                name={name}
                value={value[0] ?? ""}
            />

            <Select.Root
                collection={collection}
                value={value}
                onValueChange={(e) => setValue(e.value)}
            >
                {/* width container */}
                <Select.Control width="150px">
                    {/* visible select */}
                    <Select.Trigger
                        bg="white"
                        mt="1.85rem"
                        boxShadow="md"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="md"
                        height="3rem"
                        px={3}
                        _hover={{ borderColor: "gray.300" }}
                        _focusVisible={{
                            borderColor: "blue.500",
                            boxShadow:
                                "0 0 0 1px var(--chakra-colors-blue-500)",
                        }}
                    >
                        <Select.ValueText
                            placeholder={placeholder}
                            color="gray.600"
                        />
                    </Select.Trigger>

                    <Select.IndicatorGroup
                        position="absolute"
                        right="0.1rem"
                        top="50%"
                        transform="translateY(-10%)"
                    >
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>

                <Portal>
                    <Select.Positioner>
                        <Select.Content
                            bg="white"
                            border="1px solid"
                            borderColor="gray.200"
                            borderRadius="md"
                            boxShadow="lg"
                            maxH="240px"
                            overflowY="auto"
                            width="150px"
                        >
                            {collection.items.map((item) => (
                                <Select.Item
                                    key={item.id}
                                    item={item}
                                >
                                    {item.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
        </>
    );
}
