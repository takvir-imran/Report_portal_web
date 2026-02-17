"use client";

import Image from "next/image";
import NextLink from "next/link";
import React, {useState} from "react";
import {useRouter} from "next/navigation";

import {
    Box,
    Button,
    Flex,
    Input,
    Link,
    Stack,
    Text,
} from "@chakra-ui/react";

import {login} from "../../../services/auth.service";
import { useAuth } from "../../lib/AuthProvider";

export default function LoginForm() {
    const router = useRouter();
    const auth = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and password required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            // Call API
            const res = await login({email, password});

            // Read token from cookie (login API sets it)
            const getCookie = (name: string) => {
                if (typeof document === "undefined") return null;
                const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
                return match ? decodeURIComponent(match[2]) : null;
            };

            const token = getCookie("token");

            // Determine firstName (from API if provided, otherwise derive from email)
            const deriveFirstName = (emailStr: string | undefined | null) => {
                if (!emailStr) return undefined;
                const local = emailStr.split("@")[0];
                const part = local.split(/[._\-]/)[0] || local;
                return part.charAt(0).toUpperCase() + part.slice(1);
            };

            const firstName = res?.firstName || res?.email ? deriveFirstName(res?.email || email) : deriveFirstName(email);

            // Update auth context immediately so header shows correct display name
            if (token) {
                auth.login({ email: res?.email || email, firstName, role: "", permission: "Limited Access" }, token);
            }

            router.push("/");
        } catch (err) {
            console.log(err);
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box position="relative" minH="100vh" overflow="hidden">
            <Flex minH="100vh" align="center" justify="center" zIndex={1}>
                <Box
                    w="100%"
                    maxW="md"
                    py={16}
                    px={10}
                    bg="white"
                    borderRadius="lg"
                    boxShadow="2xl"
                    textAlign="center"
                >
                    <Flex justify="center" mb={4}>
                        <Image
                            src="/source/Dominos_RMS.png"
                            alt="logo"
                            width={80}
                            height={80}
                        />
                    </Flex>

                    <Text fontSize="2xl" mb={6} fontWeight="bold">
                        Sign In
                    </Text>

                    <form onSubmit={handleSubmit}>
                        <Stack gap={4}>
                            <Input
                                type="email"
                                placeholder="name@jublfood.com"
                                size="lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <Input
                                type="password"
                                placeholder="Password"
                                size="lg"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            {error && (
                                <Text color="red.500" fontSize="sm">
                                    {error}
                                </Text>
                            )}

                            <Button
                                type="submit"
                                size="lg"
                                bg="blue.600"
                                color="white"
                                _hover={{bg: "blue.700"}}
                                loading={loading}
                            >
                                Sign In
                            </Button>
                        </Stack>
                    </form>

                    <Text mt={8}>
                        Don’t have an account?{" "}
                        <Link as={NextLink} href="/Sign_Up" color="blue.600" textDecoration="underline">Sign Up</Link>
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}
