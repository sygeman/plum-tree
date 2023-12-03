import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import logo from "./assets/logo.png";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="absolute w-full inset-0 overflow-hidden">
      <div className="absolute w-full inset-0">
        <header className="bg-[#6F1E51] text-white absolute inset-0 h-12 flex">
          <div className="flex items-center">
            <img className="p-1 h-10 w-10" src={logo} />
            <h1 className="hidden-xs-down">
              <Link to="/"> The Plum Tree </Link>
            </h1>
          </div>
        </header>

        <div className="absolute top-12 left-0 bottom-0 right-0 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
