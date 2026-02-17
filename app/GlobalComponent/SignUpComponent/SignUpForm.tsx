"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
    Button,
    Input,
    Stack,
    Field,
    NativeSelect,
} from "@chakra-ui/react";
import { toaster } from "./toaster";

/* ---------------- Dynamic Import ---------------- */

const Toaster = dynamic(
    () => import("./toaster").then((mod) => mod.Toaster),
    { ssr: false }
);

/* ---------------- Constants ---------------- */

const roleOptions = [
    { label: "Head Office", value: "3" },
    { label: "Store", value: "4" },
];

/* ---------------- Types ---------------- */

type SignUpFormType = {
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    ConfirmPassword: string;
    Role_ID: string;
};

type Errors = Partial<Record<keyof SignUpFormType, string>>;

type ApiResponse = {
    success?: boolean;
    message?: string;
};

/* ================= COMPONENT ================= */

export default function SignUpForm() {
    const router = useRouter();

    const [form, setForm] = useState<SignUpFormType>({
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Role_ID: "",
    });

    const [errors, setErrors] = useState<Errors>({});
    const [loading, setLoading] = useState(false);

    /* ---------------- Handlers ---------------- */

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });

        if (errors[e.target.name as keyof Errors]) {
            setErrors({ ...errors, [e.target.name]: undefined });
        }
    };

    const validate = () => {
        const err: Errors = {};

        if (!form.FirstName) err.FirstName = "Required";
        if (!form.LastName) err.LastName = "Required";

        if (!form.Email) err.Email = "Required";
        else if (!form.Email.endsWith("@jublfood.com"))
            err.Email = "Invalid email";

        if (form.Password.length < 8)
            err.Password = "Minimum 8 characters";

        if (form.Password !== form.ConfirmPassword)
            err.ConfirmPassword = "Password mismatch";

        if (!form.Role_ID) err.Role_ID = "Required";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    /* ---------------- SUBMIT SIGNUP ---------------- */

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const rawText = await res.text();

            let data: ApiResponse;
            try {
                data = rawText ? JSON.parse(rawText) : {};
            } catch {
                data = { message: rawText };
            }

            // ✅ DO NOT CHECK res.ok
            if (data.success) {
                toaster.create({
                    title: "Success!",
                    description: data.message || "Account created successfully.",
                    type: "success",
                    duration: 4000,
                });

                router.push("/Login");
            } else {
                toaster.create({
                    title: "Signup Failed",
                    description: data.message || "Unable to create account",
                    type: "error",
                    duration: 4000,
                });
            }
        } catch (error) {
            console.error("Signup error:", error);

            toaster.create({
                title: "Network Error",
                description: "Unable to signup. Please try again.",
                type: "error",
                duration: 4000,
            });
        } finally {
            setLoading(false);
        }
    };

    /* ================= JSX ================= */

    return (
        <form onSubmit={handleSubmit}>
            <Toaster />

            <Stack gap={4}>
                <Field.Root invalid={!!errors.FirstName}>
                    <Field.Label>First Name</Field.Label>
                    <Input
                        name="FirstName"
                        value={form.FirstName}
                        onChange={handleChange}
                    />
                    <Field.ErrorText>{errors.FirstName}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.LastName}>
                    <Field.Label>Last Name</Field.Label>
                    <Input
                        name="LastName"
                        value={form.LastName}
                        onChange={handleChange}
                    />
                    <Field.ErrorText>{errors.LastName}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.Email}>
                    <Field.Label>Email</Field.Label>
                    <Input
                        name="Email"
                        value={form.Email}
                        onChange={handleChange}
                    />
                    <Field.ErrorText>{errors.Email}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.Role_ID}>
                    <Field.Label>Job Location</Field.Label>
                    <NativeSelect.Root>
                        <NativeSelect.Field
                            name="Role_ID"
                            value={form.Role_ID}
                            onChange={handleChange}
                        >
                            <option value="">Select location</option>
                            {roleOptions.map((r) => (
                                <option key={r.value} value={r.value}>
                                    {r.label}
                                </option>
                            ))}
                        </NativeSelect.Field>
                    </NativeSelect.Root>
                    <Field.ErrorText>{errors.Role_ID}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.Password}>
                    <Field.Label>Password</Field.Label>
                    <Input
                        type="password"
                        name="Password"
                        value={form.Password}
                        onChange={handleChange}
                    />
                    <Field.ErrorText>{errors.Password}</Field.ErrorText>
                </Field.Root>

                <Field.Root invalid={!!errors.ConfirmPassword}>
                    <Field.Label>Confirm Password</Field.Label>
                    <Input
                        type="password"
                        name="ConfirmPassword"
                        value={form.ConfirmPassword}
                        onChange={handleChange}
                    />
                    <Field.ErrorText>{errors.ConfirmPassword}</Field.ErrorText>
                </Field.Root>

                <Button
                    type="submit"
                    bg="blue.600"
                    color="white"
                    loading={loading}
                >
                    Sign Up
                </Button>
            </Stack>
        </form>
    );
}
