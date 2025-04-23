'use client'
import { HOME } from "@/constants/routes";

import Link from "next/link";

import logo from "@/public/icons/Logo.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto flex-col md:flex-row gap-2 py-5 px-4 flex justify-between items-center">
        <Link href={HOME}>
          <Image
            src={logo}
            width={73}
            height={41}
            alt="Quantum University Logo"
          />
        </Link>

        <p>
          &copy; 2025 Quantum University. All rights reserved.

        </p>
      </div>
    </footer>
  );
};

export default Footer;
