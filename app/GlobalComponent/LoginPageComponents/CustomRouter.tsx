"use client";

import { useRouter } from "next/navigation";

export function useCustomRouter(href: string) {
    const router = useRouter();

    const navigate = (href: string) => {
        router.push(href);
    };

    return { navigate };
}
