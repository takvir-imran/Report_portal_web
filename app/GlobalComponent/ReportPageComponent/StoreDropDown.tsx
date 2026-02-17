"use client";

import { useEffect, useState } from "react";
import Dropdown_v2 from "./Dropdown_v2";

type Store = {
    code: string;
    status: number;
};

type Props = {
    name: string;
};

export default function StoreDropDown({ name }: Props) {
    const [stores, setStores] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const res = await fetch("/api/stores", {
                    cache: "no-store",
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch stores");
                }

                const data: Store[] = await res.json();
                const storeCodes = data.map(
                    store => store.code
                );

                setStores(storeCodes);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Unknown error"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    if (loading) return <p>Loading stores...</p>;

    if (error)
        return (
            <p style={{ color: "red" }}>
                {error}
            </p>
        );

    return (
        <Dropdown_v2
            name={name}
            options={stores}
            placeholder="Select Store"
        />
    );
}
