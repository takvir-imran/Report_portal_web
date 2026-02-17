export async function getStores(): Promise<string[]> {
    const res = await fetch("/api/stores");

    if (!res.ok) {
        throw new Error("Failed to fetch stores");
    }

    return res.json();
}
