import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ROUTES } from "../constants/routes";
import { Logo } from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-md lg:rounded-none rounded-lg rounded-t-none  ">
      <div className="px-6 py-3  lg:rounded-none lg:px-10 lg:py-3 flex justify-between items-center  border-b lg:border-b-0 border-orange-900/80">
        <Logo />

        {/* Desktop Menu */}
        <ul className="hidden lg:flex text-orange-500 font-semibold text-xl  items-center gap-10">
          <li>
            <NavLink
              to={ROUTES.HOME}
              className={({ isActive }) =>
                `  transition ${
                  isActive
                    ? "border-b-2 border-orange-500"
                    : "border-b-2 border-transparent"
                }`
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to={ROUTES.ABOUT}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-orange-500 pb-1"
                  : "border-b-2 border-transparent pb-1"
              }
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to={ROUTES.EVENTS}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-orange-500 pb-1"
                  : "border-b-2 border-transparent pb-1"
              }
            >
              Events
            </NavLink>
          </li>

          <li>
            <NavLink
              to={ROUTES.GETINVOLVE}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-orange-500 pb-1"
                  : "border-b-2 border-transparent pb-1"
              }
            >
              Get Involved
            </NavLink>
          </li>
          <li>
            <NavLink
              to={ROUTES.NEWS}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-orange-500 pb-1"
                  : "border-b-2 border-transparent pb-1"
              }
            >
              News
            </NavLink>
          </li>

          <li>
            <NavLink
              to={ROUTES.LEGAL_NOTICE}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-orange-500 pb-1"
                  : "border-b-2 border-transparent pb-1"
              }
            >
              Legal Notice
            </NavLink>
          </li>
        </ul>

        <button className="hidden lg:block rounded-md bg-orange-500 px-6 py-3 text-xl font-semibold text-white ">
          <NavLink
            to={ROUTES.CONTACT}
            className={({ isActive }) =>
              isActive ? " " : "border-b-2 border-transparent pb-1"
            }
          >
            Contact
          </NavLink>
        </button>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
          {isOpen ? (
            <X size={28} className="text-orange-500" />
          ) : (
            <Menu size={28} className="text-orange-500" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all  rounded-b-4xl rounded-t-none rounded-l-none rounded-r-none bg-white duration-300 ease-in-out lg:hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="py-10 px-6  flex flex-col gap-4">
          <ul className="flex text-orange-500 text-xl flex-col gap-4 ">
            <li>
              <NavLink
                to={ROUTES.HOME}
                className=""
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to={ROUTES.ABOUT} onClick={() => setIsOpen(false)}>
                About
              </NavLink>
            </li>

            <li>
              <NavLink to={ROUTES.EVENTS} onClick={() => setIsOpen(false)}>
                Events
              </NavLink>
            </li>

            <li>
              <NavLink to={ROUTES.GETINVOLVE} onClick={() => setIsOpen(false)}>
                Get Involved
              </NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.NEWS} onClick={() => setIsOpen(false)}>
                News
              </NavLink>
            </li>

            <li>
              <NavLink
                to={ROUTES.LEGAL_NOTICE}
                onClick={() => setIsOpen(false)}
              >
                Legal Notice
              </NavLink>
            </li>
          </ul>
          <button className="block lg:hidden rounded-md bg-orange-500 px-6 py-3 text-xl font-semibold text-white ">
            <NavLink
              to={ROUTES.CONTACT}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-white pb-1"
                  : "border-b-2 border-transparent pb-1"
              }
            >
              Contact
            </NavLink>
          </button>
        </div>
      </div>
    </nav>
  );
}
