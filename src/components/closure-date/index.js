"use client";

import { useEffect, useState } from "react";
import NotificationAlert from "@/components/shared/common/Alert/NotificationAlert";
import { getClosureDateService } from "@/services/getClosureDates";
import { getAllRestrictionService } from "@/services/getAllRestrictionService";

export default function ClosureDate() {
    const [showAlert, setShowAlert] = useState(false);
    const [currentAlert, setCurrentAlert] = useState(null);
    const [submissionDate, setSubmissionDate] = useState(null);
    const [finalClosureDate, setFinalClosureDate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllRestrictionService();
                if (response && response?.length > 0) {
                    await fetchClosureDates();
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        if (submissionDate && finalClosureDate) {
            checkDates();
        }
    }, [submissionDate, finalClosureDate]);

    const fetchClosureDates = async () => {
        try {
            const response = await getClosureDateService();
            if (response) {
                setSubmissionDate(new Date(response.submission_date));
                setFinalClosureDate(new Date(response.final_closure_date));
            }
        } catch (error) {
            console.error("Error fetching closure dates:", error);
        }
    };

    const checkDates = () => {
        const currentDate = new Date();
        const normalizedCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const normalizedSubmissionDate = submissionDate
            ? new Date(submissionDate.getFullYear(), submissionDate.getMonth(), submissionDate.getDate())
            : null;
        const normalizedFinalClosureDate = finalClosureDate
            ? new Date(finalClosureDate.getFullYear(), finalClosureDate.getMonth(), finalClosureDate.getDate())
            : null;

        // First check if we're past the final closure date
        if (normalizedFinalClosureDate && normalizedCurrentDate >= normalizedFinalClosureDate) {
            setShowAlert(true);
            setCurrentAlert({
                title: "Voting closed!",
                message: "New idea submission and voting closed for this academic year. You can still view the ideas.",
                variant: "warning",
            });
        }
        // If not past final closure but past submission date
        else if (normalizedSubmissionDate && normalizedCurrentDate >= normalizedSubmissionDate) {
            setShowAlert(true);
            setCurrentAlert({
                title: "Idea submission closed!",
                message: `New idea creation is closed. You can still comment and vote your favourite idea until ${finalClosureDate.toLocaleDateString()}.`,
                variant: "warning",
            });
        }
        // If not past either date
        else {
            setShowAlert(false);
        }
    };

    return (
        <div className="w-full flex justify-center">
            {showAlert && currentAlert && (
                <div className="fixed z-50 max-w-7xl mx-auto space-y-8 px-4">
                    <NotificationAlert
                        show={showAlert}
                        onClose={() => setShowAlert(false)}
                        title={currentAlert.title}
                        message={currentAlert.message}
                        variant={currentAlert.variant}
                    />
                </div>
            )}
        </div>
    );
}