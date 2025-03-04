"use client";

import { usePathname } from "next/navigation";
import NavigationBar from "@/components/shared/navigation/NavigationBar";
import Footer from "@/components/shared/footer/Footer";
import { FORGOT_PASSWORD, LOGIN, REGISTER } from "@/constants/routes";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Define authentication routes
  const authRoutes = [LOGIN, REGISTER, FORGOT_PASSWORD];
  const shouldHideNavAndFooter = authRoutes.includes(pathname);

  return (
    <>
      {!shouldHideNavAndFooter && <NavigationBar />}
      {children}
      {!shouldHideNavAndFooter && <Footer />}
    </>
  );
}
