'use client'
import { getUser } from "@/utils/authentication";
import UsersManagementTableAdmin from "./administrator/UsersManagementTableAdmin";
import UsersManagementTableQA from "./qa-manager/UsersManagementTableQA";

const AdminUsersManagementTableSection = () => {
    const user = getUser();
	const role = user?.role?.name;
    if (role === "QAMANAGER") return <UsersManagementTableQA />;
	if (role === "ADMIN") return <UsersManagementTableAdmin />;
};

export default AdminUsersManagementTableSection;
