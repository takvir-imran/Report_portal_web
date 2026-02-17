import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import {AuthProvider} from "./lib/AuthProvider";


export const metadata: Metadata = {
  title: "Dominos Report Portal",
  description: "Dominos Report Portal",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <Providers>
            <AuthProvider>
                {children}
            </AuthProvider>
        </Providers>
        </body>
        </html>
    );
}
