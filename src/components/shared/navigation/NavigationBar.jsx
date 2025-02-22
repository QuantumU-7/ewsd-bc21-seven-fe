import Image from "next/image";
import Link from "next/link";

/* images */
import logo from "@/public/icons/Logo.svg";
import profile from "@/public/icons/Profile.svg";

/* routes */
import { HOME, LEADERBOARDS, MY_IDEAS, UPLOAD_IDEA, USER_PROFILE } from "@/constants/routes";

/* components */
import { Button } from "@/components/ui/button";

const NavigationBar = () => {
  return (
    <nav>
      <div className="max-w-7xl mx-auto py-7 flex justify-between items-center">
        <div className="flex gap-10 items-center">
          <Link href={HOME}>
            <Image
              src={logo}
              width={73}
              height={41}
              alt="Quantum University Logo"
            />
          </Link>
          <Link href={HOME}>Latest</Link>
          <Link href={LEADERBOARDS}>Leaderboards</Link>
          <Link href={MY_IDEAS}>My Ideas</Link>
        </div>
        <div className="flex items-center gap-10">
            <Link href={UPLOAD_IDEA}>
                <Button>Upload Idea</Button>
            </Link>

            <Link href={USER_PROFILE}>
                <Image src={profile} width={28} height={28} alt="user profile"/>
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
