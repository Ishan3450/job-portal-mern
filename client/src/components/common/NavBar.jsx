import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="flex justify-between pt-3 items-center">
      <Link className="text-2xl tracking-wide" to={"/"}>
        Job
        <span className=" font-bold text-red-700">Hunt</span>
      </Link>

      <div className="flex gap-12 items-center">
        <ul className="flex gap-5">
          <li className="cursor-pointer hover:underline">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="cursor-pointer hover:underline">
            <Link to={"/jobs"}>Jobs</Link>
          </li>{" "}
        </ul>

        {user ? (
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="mr-2">
              <div>
                <div className="font-semibold text-xl">{user.fullname}</div>
                <div className="text italic mt-1">
                {user.profile.bio}
                </div>
                <div className="mt-3 font-medium cursor-pointer flex items-center gap-3">
                  <User2 />
                  <Link to={"/profile"}>
                    <Button variant="link">Profile</Button>
                  </Link>
                </div>
                <div className="  font-medium cursor-pointer flex items-center gap-3">
                  <LogOut />
                  <Link to={"/"}>
                    <Button variant="link">Logout</Button>
                  </Link>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex gap-2">
            <Link to={"/login"}>
              <Button variant="outline">Login</Button>
            </Link>
            <Link to={"/signup"}>
              <Button>Signup</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
