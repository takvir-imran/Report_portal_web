"use client";

import {
    Portal,
    Select,
    createListCollection,
} from "@chakra-ui/react";

type Option = {
    label: string;
    value: string;
};

type DropdownProps = {
    options: Option[];
    placeholder?: string;
    value?: string;
    onChange: (value: string) => void;
};

export default function Dropdown({
                                        options,
                                        placeholder,
                                        value = "",
                                        onChange,
                                    }: DropdownProps) {
    const collection = createListCollection({
        items: options,
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
    });

    return (
        <Select.Root
            collection={collection}
            value={value ? [value] : []}
            onValueChange={(e) => onChange(e.value[0])}
            width="100%"
        >
            <Select.Trigger>
                <Select.ValueText placeholder={placeholder} />
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Trigger>

            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {collection.items.map((item) => (
                            <Select.Item
                                key={item.value}
                                item={item}
                            >
                                <Select.ItemText />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    );
}
