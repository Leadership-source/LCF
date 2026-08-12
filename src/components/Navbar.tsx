import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ROUTES } from "../constants/routes";
import { Logo } from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-orange-500 shadow-md lg:rounded-none rounded-lg rounded-t-none  ">
      <div className="px-2 py-0 pr-6  lg:rounded-none lg:px-10 lg:py-0 flex justify-between items-center  border-b lg:border-b-0 border-orange-900/80">
        <Logo />

        {/* Desktop Menu */}
        <ul className="hidden lg:flex text-white font-semibold   items-center gap-10">
          <li>
            <NavLink
              to={ROUTES.HOME}
              className={({ isActive }) =>
                `text-md pb-1 transition ${
                  isActive
                    ? "border-b-2 border-white"
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
                  ? "border-b-2 border-white pb-1"
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
                  ? "border-b-2 border-white pb-1"
                  : "border-b-2 border-transparent pb-1"
              }
            >
              Events
            </NavLink>
          </li>

          <li>
            <NavLink
              to={ROUTES.VOLUNTEER}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-white pb-1"
                  : "border-b-2 border-transparent pb-1"
              }
            >
              Volunteer
            </NavLink>
          </li>

          <li>
            <NavLink
              to={ROUTES.LEGAL_NOTICE}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-white pb-1"
                  : "border-b-2 border-transparent pb-1"
              }
            >
              Legal Notice
            </NavLink>
          </li>

          <li>
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
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
          {isOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <Menu size={28} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex text-white flex-col gap-5 px-4 py-5">
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
            <NavLink to={ROUTES.VOLUNTEER} onClick={() => setIsOpen(false)}>
              Volunteer
            </NavLink>
          </li>

          <li>
            <NavLink to={ROUTES.LEGAL_NOTICE} onClick={() => setIsOpen(false)}>
              Legal Notice
            </NavLink>
          </li>

          <li>
            <NavLink to={ROUTES.CONTACT} onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
