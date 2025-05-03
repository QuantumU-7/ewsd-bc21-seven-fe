import LayoutWrapper from "@/components/shared/layout-wrapper";
import {IdeasProvider} from "@/providers/IdeasContext";

export default function StaffLayout({children}) {
	return (
		<IdeasProvider>
			<LayoutWrapper>
				<GoogleTagManager gtmId="GTM-W7GW6CWK" />
				{children}
			</LayoutWrapper>
		</IdeasProvider>
	);
}