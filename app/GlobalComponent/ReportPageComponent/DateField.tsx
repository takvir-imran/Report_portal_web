"use client";

import { Input, Flex, Field } from "@chakra-ui/react";

type DateFieldProps = {
    fieldObj: string;
    name: string;
    value?: Date;
    onChange: (date?: Date) => void;
};

function formatDate(date?: Date) {
    if (!date) return "";
    return date.toISOString().slice(0, 10);
}

export default function DateField({
                                      fieldObj,
                                      name,
                                      value,
                                      onChange,
                                  }: DateFieldProps) {
    return (
        <Field.Root width="auto">
            <Field.Label px="2" fontSize="sm" mb="1" color="gray.600">
                {fieldObj}
            </Field.Label>

            <Flex
                align="center"
                height="48px"
                bg="white"
                px="4"
                borderRadius="md"
                boxShadow="md"
            >
                <Input
                    type="date"
                    name={name}
                    value={formatDate(value)}
                    onChange={(e) =>
                        onChange(
                            e.target.value
                                ? new Date(e.target.value)
                                : undefined
                        )
                    }
                    width="100%"
                    variant="flushed"
                />
            </Flex>
        </Field.Root>
    );
}
