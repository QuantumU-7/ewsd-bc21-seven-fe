"use client";

import { useState } from "react";
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
  USER_PROFILE,
} from "@/constants/routes";

/* components */
import { Button } from "@/components/ui/button";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto py-5 px-4 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Link href={HOME}>
            <Image
              src={logo}
              width={73}
              height={41}
              alt="Quantum University Logo"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            <Link href={HOME} className="hover:text-gray-700">
              Latest
            </Link>
            <Link href={LEADERBOARDS} className="hover:text-gray-700">
              Leaderboards
            </Link>
            <Link href={MY_IDEAS} className="hover:text-gray-700">
              My Ideas
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6">
          <Link href={UPLOAD_IDEA}>
            <Button>Upload Idea</Button>
          </Link>

          <Link href={USER_PROFILE}>
            <Image src={profile} width={28} height={28} alt="user profile" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-white p-6 z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <button
          className="absolute top-5 right-5"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>

        <div className="flex flex-col items-center gap-6 mt-16">
          <Link href={HOME} onClick={() => setIsOpen(false)}>
            Latest
          </Link>
          <Link href={LEADERBOARDS} onClick={() => setIsOpen(false)}>
            Leaderboards
          </Link>
          <Link href={MY_IDEAS} onClick={() => setIsOpen(false)}>
            My Ideas
          </Link>
          <Link href={UPLOAD_IDEA} onClick={() => setIsOpen(false)}>
            <Button>Upload Idea</Button>
          </Link>
          <Link href={USER_PROFILE} onClick={() => setIsOpen(false)}>
            <Image src={profile} width={28} height={28} alt="user profile" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
