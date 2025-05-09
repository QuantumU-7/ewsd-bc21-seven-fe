"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

/* images */
import logo from "@/public/icons/Logo.svg";
import profile from "@/public/icons/Profile.svg";

/* routes */
import {
  HOME,
  LEADERBOARDS,
  MY_IDEAS,
  UPLOAD_IDEA,
} from "@/constants/routes";

/* components */
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { handleLogout, getUser } from "@/utils/authentication";
import { getClosureDateService } from "@/services/getClosureDates";
import { getAllRestrictionService } from "@/services/getAllRestrictionService";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const user = getUser();
  const username = user?.firstname + " " + user?.lastname;
  const [submissionDate, setSubmissionDate] = useState(null);
  const [finalClosureDate, setFinalClosureDate] = useState(null);
  const [disabledButtonDisabled, setDisabledButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllRestrictionService();
        if (response && response?.length > 0) {
          await fetchClosureDates();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (submissionDate && finalClosureDate) {
      checkDates();
    }
  }, [submissionDate, finalClosureDate]);

  const fetchClosureDates = async () => {
    try {
      const response = await getClosureDateService();
      if (response) {
        setSubmissionDate(new Date(response.submission_date));
        setFinalClosureDate(new Date(response.final_closure_date));
      }
    } catch (error) {
      console.error("Error fetching closure dates:", error);
    }
  };

  const checkDates = () => {
    const currentDate = new Date();
    const normalizedCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const normalizedSubmissionDate = submissionDate
      ? new Date(submissionDate.getFullYear(), submissionDate.getMonth(), submissionDate.getDate())
      : null;

    // First check if we're past the final closure date
    if (normalizedSubmissionDate && normalizedCurrentDate >= normalizedSubmissionDate) {
      setDisabledButton(true);
    }
    // If not past the final closure date
    else {
      setDisabledButton(false);
    }
  };



  const navItems = [
    { href: HOME, label: "Latest" },
    { href: LEADERBOARDS, label: "Leaderboards" },
    { href: MY_IDEAS, label: "My Ideas" },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto py-5 px-4 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-4">

            <Image
              src={logo}
              width={73}
              height={41}
              alt="Quantum University Logo"
            />


          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4 ml-10">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-2 hover:text-gray-700 ${pathname === href ? "underline text-primary font-semibold" : ""
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6">
          <Link href={disabledButtonDisabled ? "#" : UPLOAD_IDEA}>
            <Button disabled={disabledButtonDisabled}>Upload Idea</Button>
          </Link>

          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer">
                <Image src={profile} width={28} height={28} alt="user profile" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] rounded-xl p-0 flex flex-col text-center" align="end" sideOffset={20}>
              <p className="text-sm px-2 py-3 cursor-pointer hover:bg-gray-100">Welcome, {username || "User"}</p>
              <div className="border-t"></div>
              <p className="text-sm px-2 py-3 cursor-pointer hover:bg-gray-100">Last Login: {new Date(user?.lastlogin).toLocaleString() || "N/A"}</p>
              <div className="border-t"></div>
              <p onClick={handleLogout} className="text-sm px-2 py-3 cursor-pointer hover:bg-gray-100">Logout</p>
              <div className="border-t"></div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-white p-6 z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
      >
        <button className="absolute top-5 right-5" onClick={() => setIsOpen(false)}>
          <X size={28} />
        </button>

        <div className="flex flex-col items-center gap-6 mt-16">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`${pathname === href ? "text-primary underline font-semibold" : ""}`}
            >
              {label}
            </Link>
          ))}
          <Link href={disabledButtonDisabled ? "#" : UPLOAD_IDEA} onClick={() => setIsOpen(false)}>
            <Button disabled={disabledButtonDisabled}>Upload Idea</Button>
          </Link>

          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer">
                <Image src={profile} width={28} height={28} alt="user profile" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[110px] rounded-xl p-0 flex flex-col text-center">
              <p className="text-sm px-2 py-3 cursor-pointer hover:bg-gray-100">Welcome, {username || "User"}</p>
              <div className="border-t"></div>
              <p className="text-sm px-2 py-3 cursor-pointer hover:bg-gray-100">Last Login: {new Date(user?.lastlogin).toLocaleString() || "N/A"}</p>
              <div className="border-t"></div>
              <p onClick={handleLogout} className="text-sm px-2 py-3 cursor-pointer hover:bg-gray-100">Logout</p>
              <div className="border-t"></div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
