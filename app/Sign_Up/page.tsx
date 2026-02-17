"use client";

import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/react";
import SignUpForm from "../GlobalComponent/SignUpComponent/SignUpForm";

export default function SignUpPage() {
    return (
        <Box minH="100vh">
            <Flex minH="100vh" align="center" justify="center">
                <Box
                    w="100%"
                    maxW="md"
                    p={10}
                    bg="white"
                    borderRadius="lg"
                    boxShadow="xl"
                >
                    <Flex justify="center" mb={4}>
                        <Image
                            src="/source/Dominos_RMS.png"
                            alt="logo"
                            width={80}
                            height={80}
                        />
                    </Flex>

                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        mb={6}
                        textAlign="center"
                    >
                        Create Account
                    </Text>

                    <SignUpForm />
                </Box>
            </Flex>
        </Box>
    );
}
