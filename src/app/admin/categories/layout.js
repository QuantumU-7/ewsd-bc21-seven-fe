import {CategoryProvider} from "@/providers/CategoryContext";

export default function CategoryLayout({children}) {
	return (
		<CategoryProvider>
			<div className="p-6">{children}</div>
		</CategoryProvider>
	);
}
