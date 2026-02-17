export async function getIP(storeCode: string): Promise<string | null> {
    if (!storeCode) return null;

    try {
        // Added the full path to ensure it hits the dynamic route correctly
        const res = await fetch(`/api/stores/IP/${storeCode}`, {
            cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("❌ Store API Error:", data.message);
            return null;
        }

        console.log("✅ API Result:", data);
        return data.ip; // We normalized this to lowercase 'ip' in the API route
    } catch (error) {
        console.error("❌ Network Error:", error);
        return null;
    }
}