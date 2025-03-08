import { LayoutDashboard, FolderKanban, Calendar, Lightbulb, Users } from "lucide-react";
import {
	ADMIN
} from "@/constants/routes"
import { getUser } from "./authentication";

const QAMANAGER_MENU = [
	{
		title: "Dashboard",
		url: ADMIN.DASHBOARD,
		icon: LayoutDashboard,
	},
	{
		title: "Categories",
		url: ADMIN.CATEGORIES,
		icon: FolderKanban,
	},
	{
		title: "Users",
		url: ADMIN.USERS,
		icon: Users,
	},
	{
		title: "Ideas",
		url: ADMIN.IDEAS,
		icon: Lightbulb,
	},
]

const QACOORDINATOR_MENU = [
	{
		title: "Dashboard",
		url: ADMIN.DASHBOARD,
		icon: LayoutDashboard,
	},
]

const ADMINISTRATOR_MENU = [
	{
		title: "Ideas",
		url: ADMIN.IDEAS,
		icon: Lightbulb,
	},
	{
		title: "Users",
		url: ADMIN.USERS,
		icon: Users,
	},
	{
		title: "Setting",
		url: ADMIN.SETTING,
		icon: LayoutDashboard,
	},
]

export const getSidebarMenuList = () => {
	const user = getUser();
	const role = user?.role?.name;
	if (!role) return []
	if (role === "QAMANAGER") return QAMANAGER_MENU
	if (role === "QACOORDINATOR") return QACOORDINATOR_MENU
	if (role === "ADMIN") return ADMINISTRATOR_MENU
	return []
}