import { Mail, Phone, MapPin } from "lucide-react";
import { NavLink } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#EA580C] text-white w-full">
      <div className="mx-auto max-w-7xl px-4 lg:px-12 md:px-8 py-10">
        <div className=" flex flex-col gap-10 lg:flex-row justify-between">
          {/* Logo */}
          <div className="w-auto lg:w-[300px] space-y-5">
            <div>
              <img
                src="/footer-logo.png"
                className="w-[170px] h-auto brightness-0 invert"
              />
            </div>

            <p className=" text-sm leading-7 text-white">
              Inspiring, developing and connecting current and future leaders.
            </p>
            <p className=" text-sm leading-7 text-white">
              Leadership Conference Forum – Registered Charity in England and
              Wales, Charity No. 1218419.
            </p>

            <div className=" flex items-center gap-4">
              <a
                href=" https://www.linkedin.com/company/leadership-conference-forum"
                className="transition  cursor-pointer"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className=" font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <NavLink
                  className="text-white transition text-sm "
                  to={ROUTES.HOME}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="text-white transition text-sm "
                  to={ROUTES.ABOUT}
                >
                  About Us
                </NavLink>
              </li>

              <li>
                <NavLink className=" text-sm transition " to={ROUTES.EVENTS}>
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="text-white transition text-sm "
                  to={ROUTES.GETINVOLVE}
                >
                  Get Involved
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="text-white transition text-sm "
                  to={ROUTES.CONTACT}
                >
                  Contact Us
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="text-white transition text-sm"
                  to={ROUTES.LEGAL_NOTICE}
                >
                  Legal Notice
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <a
                  href="mailto:Info@leadershipconferenceforum.org"
                  className="cursor-pointer"
                >
                  <Mail className="mt-1 text-white shrink-0" size={18} />
                </a>

                <span className="text-white text-sm">
                  Info@leadershipconferenceforum.org
                </span>
              </div>

              <div className="flex items-start gap-3">
                <a href="tel:07500429811">
                  <Phone className="mt-1 text-white shrink-0" size={18} />
                </a>

                <span className="text-white text-sm"> 07500429811</span>
              </div>

              <div className="flex items-start gap-3">
                <a href="https://maps.google.com/?q=Durham,United+Kingdom">
                  <MapPin className="mt-1 text-white shrink-0" size={18} />
                </a>

                <span className="text-white text-sm">
                  Durham, United Kingdom.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border mt-10 border-white/10 border-t-0 border-l-0 border-r-0" />

        {/* Bottom */}
        <div className=" text-center text-sm pt-10 text-gray-100 ">
          <p>
            © {new Date().getFullYear()} Leadership Conference Forum. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
