"use client";

import { Button } from "@chakra-ui/react";

/* ---------- Props ---------- */

type DownloadBtnProps = {
    btnName: string;
    type?: "button" | "submit" | "reset";
    startDate: string;
    endDate: string;
    store: string;
};

export default function DownloadBtn({
                                        btnName,
                                        type = "button",
                                        startDate,
                                        endDate,
                                        store,
                                    }: DownloadBtnProps) {
    const handleDownload = async () => {
        if (!startDate || !endDate) {
            alert("Start date and end date are required");
            return;
        }

        try {
            const response = await fetch(
                `http://10.26.0.99/download?sDate=${startDate}&eDate=${endDate}&dpc=${store}`
            );

            if (!response.ok) {
                throw new Error("Failed to download file");
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `report_${startDate}_${endDate}.xlsx`;

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "Download failed"
            );
        }
    };

    return (
        <Button
            type={type}
            onClick={handleDownload}
            bg="blue.600"
            color="white"
            px={4}
            py={2}
            borderRadius="md"
            boxShadow="md"
            _hover={{ bg: "blue.700" }}
        >
            {btnName}
        </Button>
    );
}
