import LayoutWrapper from "@/components/shared/layout-wrapper";
import {IdeasProvider} from "@/providers/IdeasContext";

export default function StaffLayout({children}) {
	return (
		<IdeasProvider>
			<LayoutWrapper>{children}</LayoutWrapper>
		</IdeasProvider>
	);
}
