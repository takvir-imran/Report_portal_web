// Permission types based on DB
export type Permission = "Full Access" | "Limited Access" | "Read Only";

// Navigation permission map
export const NAV_PERMISSIONS = {
    HOME: ["Full Access", "Limited Access", "Read Only"] as Permission[],
    REPORT: ["Full Access", "Limited Access"] as Permission[],
    ABOUT: ["Full Access", "Limited Access", "Read Only"] as Permission[],
    ADMIN: ["Full Access"] as Permission[],
};
