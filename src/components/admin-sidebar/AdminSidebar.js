"use client";

import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/icons/Logo.svg";
import { getSidebarMenuList } from "@/utils/sidebar";
import { Button } from "@/components/ui/button";
import { getUser, handleLogout } from "@/utils/authentication";
import { HOME } from "@/constants/routes";
import { useRouter } from "next/navigation";

export const AdminSidebar = () => {
  const [menuList, setMenuList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const list = getSidebarMenuList();
    setMenuList(list);
    const user = getUser();
    const role = user?.role?.name;

    if (role === "STAFF") router.push(HOME);
  }, []);
  return (
    <div className=" bg-gray-200 min-h-screen">
      <Sidebar>
        <SidebarContent>
          <SidebarMenu className="d-flex flex-col justify-between h-full">
            <div>
              <div className="w-full flex justify-center py-4 mb-4">
                <Link href={"/"}>
                  <Image
                    src={logo}
                    width={73}
                    height={41}
                    alt="Quantum University Logo"
                  />
                </Link>
              </div>
              {menuList.map((item) => (
                <SidebarMenuItem key={item.title} className="py-1 px-4">
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </div>
            <Button className="mx-4 mb-4" onClick={handleLogout}>
              Logout
            </Button>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};
