"use client";

import NextLink from "next/link";
import Image from "next/image";
import {
    Box,
    Flex,
    HStack,
    Link,
    Text,
    Spacer,
    Button,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import {useAuth} from "../lib/AuthProvider";
import {NAV_PERMISSIONS, Permission} from "../../config/permissions";

/* -------- Types -------- */

type NavLinkProps = {
    href: string;
    children: ReactNode;
};

/* -------- Component -------- */

export default function TopHeaderClient() {
    const { user, isAuthenticated, logout } = useAuth();

    const canAccess = (allowed: Permission[]) =>
        !!user && allowed.includes(user.permission);

    return (
        <Box
            as="header"
            bg="white"
            boxShadow="md"
            h="64px"
            px="64px"
            suppressHydrationWarning
        >
            <Flex h="100%" align="center" suppressHydrationWarning>
                {/* Logo */}
                <HStack gap={2} suppressHydrationWarning>
                    <Link
                        as={NextLink}
                        href="/"
                        display="flex"
                        alignItems="center"
                        gap={2}
                        suppressHydrationWarning
                    >
                        <Image
                            src="/source/Dominos_pizza_logo.png"
                            alt="logo"
                            width={30}
                            height={30}
                        />
                        <Text fontSize="xl" fontWeight="bold" color="gray.700" suppressHydrationWarning>
                            Report Portal
                        </Text>
                    </Link>
                </HStack>

                <Spacer />

                {/* Navigation (Permission Based) */}
                {isAuthenticated && (
                    <HStack gap={8} suppressHydrationWarning>
                        {canAccess(NAV_PERMISSIONS.HOME) && (
                            <NavLink href="/">Home</NavLink>
                        )}

                        {canAccess(NAV_PERMISSIONS.REPORT) && (
                            <NavLink href="/Report">Report</NavLink>
                        )}

                        {canAccess(NAV_PERMISSIONS.ABOUT) && (
                            <NavLink href="/About">About</NavLink>
                        )}

                        {canAccess(NAV_PERMISSIONS.ADMIN) && (
                            <NavLink href="/Admin">Admin</NavLink>
                        )}
                    </HStack>
                )}

                <Spacer />

                {/* Auth Section */}
                {isAuthenticated && user ? (
                    <HStack gap={4} suppressHydrationWarning>
                        <Text fontWeight="bold" suppressHydrationWarning>{user.firstName}</Text>
                        <Button
                            size="sm"
                            colorScheme="red"
                            variant="outline"
                            onClick={logout}
                            suppressHydrationWarning
                        >
                            Logout
                        </Button>
                    </HStack>
                ) : (
                    <NavLink href="/Login">Login</NavLink>
                )}
            </Flex>
        </Box>
    );
}

/* -------- Reusable NavLink -------- */

function NavLink({ href, children }: NavLinkProps) {
    return (
        <Link
            as={NextLink}
            href={href}
            px={6}
            py={6}
            fontWeight="bold"
            color="gray.700"
            _hover={{
                bg: "blue.100",
                color: "blue.600",
                textDecoration: "none",
            }}
            transition="0.2s ease"
            suppressHydrationWarning
        >
            {children}
        </Link>
    );
}