import localFont from "next/font/local";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";

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
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
