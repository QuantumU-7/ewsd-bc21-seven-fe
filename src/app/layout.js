import localFont from "next/font/local";
import {GoogleTagManager} from "@next/third-parties/google";

import "./globals.css";
import {Toaster} from "@/components/ui/sonner";
import {Suspense} from "react";
import UserTracker from "@/utils/userTracker";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata = {
	title: "Quantum University",
	description:
		"Quantum University is a platform for learning and sharing ideas.",
	image: "/images/logo.png",
};

export default function RootLayout({children}) {
	return (
		<html lang="en">
			<GoogleTagManager gtmId="GTM-W7GW6CWK" />
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
			>
				<Suspense fallback={null}>
					<UserTracker />
				</Suspense>
				{children}
				<Toaster position="top-center" richColors duration={2000} />
			</body>
		</html>
	);
}
