export const ROLES = {
	Admin: 1,
	Staff: 3,
	QA_Manager: 4,
	QA_Coordinator: 5,
};

export const redirectByRole = (role) => {
	switch (role) {
		case ROLES.Admin:
			return "/admin/ideas";
		case ROLES.Staff:
			return "/";
		case ROLES.QA_Manager:
			return "/admin/dashboard";
		case ROLES.QA_Coordinator:
			return "/admin/dashboard";
		default:
			return "/";
	}
};
