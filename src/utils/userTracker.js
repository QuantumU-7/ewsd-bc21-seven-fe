"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackUserActionsServices } from "@/services/trackUserActionsServices";
import { getUser } from "@/utils/authentication";

const UserTracker = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [prevPath, setPrevPath] = useState("");

    const getShortBrowserName = () => {
        const userAgent = navigator.userAgent;
        
        if (userAgent.includes("Firefox")) return "Firefox";
        if (userAgent.includes("Chrome") && !userAgent.includes("Edg") && !userAgent.includes("OPR")) return "Chrome";
        if (userAgent.includes("Safari") && !userAgent.includes("Chrome") && !userAgent.includes("Edg")) return "Safari";
        if (userAgent.includes("Edg")) return "Edge";
        if (userAgent.includes("OPR") || userAgent.includes("Opera")) return "Opera";
        if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) return "Internet Explorer";
        
        return "Unknown";
    };

    useEffect(() => {
        if (!pathname || pathname?.includes('login')) return;
        
        // Format the pathname by removing the first slash
        const formattedPathname = pathname.startsWith('/') ? pathname.substring(1) : pathname;
        
        // Create the full URL with the formatted pathname
        const url = formattedPathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
        
        // Only track if the path has changed
        if (url !== prevPath) {
            const trackPageView = async () => {
                try {
                    const user = getUser(); // Retrieve the logged-in user
                    const browserName = getShortBrowserName(); // Get short browser name
                    await trackUserActionsServices(url, user?.id, browserName);
                    // console.log(`Tracked page access: ${url}`);
                    setPrevPath(url);
                } catch (error) {
                    console.error("Error tracking page access:", error);
                }
            };
            
            trackPageView();
        }
    }, [pathname, searchParams, prevPath]);

    return null; // This component doesn't render anything
};

export default UserTracker;