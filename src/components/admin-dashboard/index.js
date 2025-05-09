'use client';

import { getLocalStorage } from "@/api/config";
import { decodeToken } from "react-jwt";
import QaMangerDashboard from "./qa-manager";
import AdminDashboard from "./admin";

const Dashboard = () => {

    const userData = getLocalStorage();
    const decodeTokendata = decodeToken(userData.access_token);
    return (
        <>
            {
                decodeToken && decodeTokendata?.role === "QACOORDINATOR" ? (
                    <QaMangerDashboard />
                ) : (
                    <AdminDashboard />
                )
            }
        </>
    );
}

export default Dashboard;