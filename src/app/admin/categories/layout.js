import {CategoryProvider} from "@/providers/CategoryContext";

export default function CategoryLayout({children}) {
	return (
		<CategoryProvider>
			<div className="p-4">{children}</div>
		</CategoryProvider>
	);
}
