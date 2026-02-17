"use client";

import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { Permission } from "../../config/permissions";

/* -------- Types -------- */

type User = {
    email: string;
    firstName?: string;
    role: string;
    permission: Permission;
};

type AuthState = {
    user: User | null;
    token: string | null;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
};

/* -------- Reducer -------- */

type AuthAction =
    | { type: "LOGIN"; payload: { user: User; token: string } }
    | { type: "LOGOUT" };

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload.user,
                token: action.payload.token,
            };
        case "LOGOUT":
            return {
                user: null,
                token: null,
            };
        default:
            return state;
    }
}

/* -------- Context -------- */

const AuthContext = createContext<AuthContextType | null>(null);

/* -------- Helpers -------- */

const getCookie = (name: string): string | null => {
    const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
};

const deriveFirstName = (email: string | null): string | undefined => {
    if (!email) return undefined;
    const local = email.split("@")[0];
    const part = local.split(/[._\-]/)[0] || local;
    return part.charAt(0).toUpperCase() + part.slice(1);
};

/* -------- Provider -------- */

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        token: null,
    });

    const login = (user: User, token: string) => {
        dispatch({
            type: "LOGIN",
            payload: { user, token },
        });
    };

    const logout = () => {
        // Clear cookies
        document.cookie = "token=; Max-Age=0; path=/";
        document.cookie = "email=; Max-Age=0; path=/";

        dispatch({ type: "LOGOUT" });
        router.replace("/Login");
    };

    // Initialize auth from cookies (runs once)
    useEffect(() => {
        const token = getCookie("token");
        if (!token) return;

        const email = getCookie("email");

        dispatch({
            type: "LOGIN",
            payload: {
                token,
                user: {
                    email: email || "",
                    firstName: deriveFirstName(email),
                    role: "",
                    permission: "Limited Access",
                },
            },
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isAuthenticated: !!state.token,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

/* -------- Hook -------- */

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}
