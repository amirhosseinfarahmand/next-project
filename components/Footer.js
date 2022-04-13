import { MenuIcon, HomeIcon } from "@heroicons/react/outline";
import { useState } from "react";
import useScrollPosition from "@react-hook/window-scroll";
import { useRouter } from "next/dist/client/router";

const Footer = ({ setShowMenu, showMenu, setInProp, inProp }) => {
  const [test, setTest] = useState(false);
  const y = useScrollPosition(60);
  const router = useRouter();

  return (
    <div className="w-full lg:opacity-0 justify-end lg:pointer-events-none flex mt-auto bg-orange-500 h-10">
      <div className=" mr-2">
        {y >= 100 ? (
          <HomeIcon width={40} height={40} onClick={() => router.push("/")} />
        ) : (
          ""
        )}
      </div>
      <div className=" mr-2">
        <MenuIcon width={40} height={40} onClick={() => setInProp(!inProp)} />
      </div>
    </div>
  );
};

export default Footer;
