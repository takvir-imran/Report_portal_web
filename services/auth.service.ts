import axios from "axios";

export type LoginRequest = {
    email: string;
    password: string;
};

export async function login(
    data: LoginRequest
) {
    const res = await axios.post("/api/auth/login", data, {withCredentials: true,}
    );

    return res.data;
}
