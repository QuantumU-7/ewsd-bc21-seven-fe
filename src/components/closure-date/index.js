"use client";

import { useState } from "react";
import NotificationAlert from "@/components/shared/common/Alert/NotificationAlert";
export default function ClosureDate() {
    const [showAlert, setShowAlert] = useState(true);

    return (
        <div className="w-full flex justify-center">
            <div className="fixed z-50 max-w-7xl mx-auto space-y-8 px-4">
            <NotificationAlert
                show={showAlert}
                onClose={() => setShowAlert(false)}
                title="Idea submission closed!"
                message="New idea creation is closed. You can still comment and vote your favourite idea until 1st March 2025."
                variant="warning"
            />
        </div>
        </div>
    )
}