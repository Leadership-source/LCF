import { CalendarDays, Globe, HeartHandshake, Users, Star } from "lucide-react";
import { Target, Eye, Heart, Flag } from "lucide-react";
import { Megaphone, PenLine, Settings, UsersRound } from "lucide-react";
import { Handshake, TrendingUp } from "lucide-react";

import mentorship from "/highlight/mentorship.jpg";
import leadership from "/highlight/leadership.jpg";
import networking from "/highlight/networking.jpg";
import charitable from "/highlight/charitable.jpg";

import {
  Building2,
  FileText,
  ShieldCheck,
  Copyright,
  Mail,
} from "lucide-react";

export const statsData = [
  {
    icon: <CalendarDays size={15} />,
    value: 150,
    title: "Conference Held",
  },
  {
    icon: <Globe size={15} />,
    value: 12,
    title: "Countries Reached",
  },
  {
    icon: <HeartHandshake size={15} />,
    value: 100,
    title: "Volunteers",
  },
  {
    icon: <Users size={15} />,
    value: 2500,
    title: "Leaders Impact",
  },
];

export const hightlight = [
  {
    title: "Mentorship Opportunities",
    description:
      "Connect with seasoned mentors who provide guidance and support for leadership development.",
    image: mentorship,
    status: "Published",
    displayOrder: 1,
  },
  {
    title: "Leadership Conferences",
    description:
      "Attend our top-tier conferences featuring influential speakers and engaging discussions on leadership.",
    image: leadership,
  },
  {
    title: "Networking Events",
    description:
      "Engage with professionals and build lasting connections to enhance your career.",
    image: networking,
  },
  {
    title: "Charitable Project",
    description:
      "Participate in community-focused initiatives that make a difference in society.",
    image: charitable,
  },
];

export const missionCards = [
  {
    id: 1,
    icon: Target,
    title: "Our Mission",
    description:
      "To raise transformational leaders through learning, connection, and service to humanity.",
  },
  {
    id: 2,
    icon: Eye,
    title: "Our Vision",
    description:
      "A world where leaders are equipped to build inclusive, just, and empowered communities.",
  },
  {
    id: 3,
    icon: Heart,
    title: "Our Values",
    values: [
      "Integrity",
      "Excellence",
      "Service",
      "Inclusivity",
      "Collaboration",
    ],
  },
  {
    id: 4,
    icon: Flag,
    title: "Our Commitment",
    description:
      "We are committed to creating sustainable impact through ethical leadership and community development.",
  },
];

export const whyAttendData = [
  {
    id: 1,
    icon: <Users size={30} />,
    title: "Learn",
    description: "Gain practical knowledge from experienced leaders.",
  },
  {
    id: 2,
    icon: <Handshake size={30} />,
    title: "Connect",
    description: "Build meaningful relationships and expand your network.",
  },
  {
    id: 3,
    icon: <TrendingUp size={30} />,
    title: "Grow",
    description: "Develop your skills and advance your leadership journey.",
  },
  {
    id: 4,
    icon: <Globe size={30} />,
    title: "Impact",
    description: "Be part of a movement creating positive change.",
  },
];

export const organisationInformation = {
  registeredName: "Leadership Conference Forum",
  charityNumber: "1192349",
  address: "Durham, United Kingdom.",
  email: "Info@leadershipconferenceforum.org",
  phone: "07500429811",
};

export const legalNoticeSections = [
  {
    id: 1,
    icon: Building2,
    title: "Organisation Information",
    description:
      "Leadership Conference Forum (LCF) is a registered charitable organisation in the United Kingdom.",
  },

  {
    id: 2,
    icon: FileText,
    title: "About This Website",
    description:
      "This website is operated by Leadership Conference Forum. The information provided on this website is for general information purposes only. While we strive to keep the information accurate and up to date, we make no warranties or representations regarding its completeness, reliability, or suitability.",
  },

  {
    id: 3,
    icon: ShieldCheck,
    title: "Use of This Website",
    description:
      "By using this website, you agree to use its content only for lawful purposes. You must not use this website in any way that could damage, disable, overburden, or interfere with another person's use of the website.",
  },

  {
    id: 5,
    icon: Copyright,
    title: "Copyright",
    description:
      "All content on this website, including text, graphics, logos, images, and documents, is the property of Leadership Conference Forum unless otherwise stated. You may not reproduce, distribute, or use any content without prior written permission.",
  },

  {
    id: 6,
    icon: Mail,
    title: "Contact",
    description:
      "If you have any questions regarding this legal notice, please contact us using the details below.",
  },
];

export const volunteerBenefits = [
  {
    id: 1,
    title: "Make A Difference",
    description:
      "Contribute your time and skills to initiatives that empower individuals and communities.",
    icon: Users,
  },
  {
    id: 2,
    title: "Grow Your Skills",
    description:
      "Gain valuable experience, develop new skills, and expand your network.",
    icon: Star,
  },
  {
    id: 3,
    title: "Build Connections",
    description:
      "Work with like-minded people who are passionate about leadership and impact.",
    icon: Heart,
  },
  {
    id: 4,
    title: "Global Impact",
    description:
      "Be part of a UK-based organisation making a difference across the UK and beyond.",
    icon: Globe,
  },
];

export const volunteerOpportunities = [
  {
    id: 1,
    title: "Event Support",
    description:
      "Help plan and manage conferences, workshops, and networking events.",
    icon: UsersRound,
  },
  {
    id: 2,
    title: "Community Outreach",
    description:
      "Support community projects and help us reach and empower more people.",
    icon: Megaphone,
  },
  {
    id: 3,
    title: "Content & Media",
    description:
      "Use your creative skills in design, writing, photography, or social media.",
    icon: PenLine,
  },
  {
    id: 4,
    title: "Administration",
    description:
      "Assist with administration, research, and day-to-day operations.",
    icon: Settings,
  },
];
