import {
  CalendarDays,
  Globe,
  HeartHandshake,
  Users,
  Star,
  LayoutGrid,
  User,
  Target,
  Eye,
  Heart,
  Megaphone,
  PenLine,
  Settings,
  UsersRound,
  Handshake,
  TrendingUp,
  GraduationCap,
  UserRoundPlus,
} from "lucide-react";

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
    link: "/events",
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
      "Our mission is to inspire, develop, and connect leaders of today and tomorrow, equipping them with the tools, networks, and opportunities needed to make impactful contributions to their communities and beyond.",
  },
  {
    id: 2,
    icon: Eye,
    title: "Our Vision",
    description:
      "To become a leading platform for leadership development and civic engagement across the United Kingdom, recognised for its inclusive approach to mentorship, thought leadership, and charitable influence",
  },
  {
    id: 3,
    icon: LayoutGrid,
    title: "Key Programmes and Activities",
    programs: [
      "Annual Leadership Conference",
      "Monthly Leadership Talk Series",
      "Structured Mentoring Programme",
      "Leadership Roundtable Forums",
      "Recognition Awards for outstanding leadership",
      "Community Outreach and Youth Empowerment Project",
    ],
  },
  {
    id: 4,
    icon: User,
    title: "Target Audience",
    programs: [
      " Student Leaders",
      "Young Professionals",
      " Community Leaders",
      "Civic and Political Aspirants",
      "Entrepreneurs and Innovators",
      "Individuals committed to self-development and leadership impact",
    ],
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

export const externalRoles = [
  {
    title: "Advisors",
    description:
      "Our Advisors work behind the scenes to provide the trustees and board members with expert advice, insights, and strategic guidance as required.",
  },
  {
    title: "Patrons",
    description:
      "Patrons support the charity by providing leadership quotes for use across our social media platforms, website, newsletters, and other promotional materials.",
  },
  {
    title: "Brand Ambassadors",
    description:
      "Our Brand Ambassadors lend their image and visibility to the charity by allowing us to feature their photos on social media and promotional materials. They may also help to promote the charity online, although this is not a formal requirement.",
  },
  {
    title: "Honorary Supporters",
    description:
      "Honorary Supporters assist by connecting LCF with their networks through referrals and recommendations, helping to strengthen our community outreach.",
  },
];

export const involvementOptions = [
  {
    icon: UserRoundPlus,
    title: "Become a Member",
    description:
      "Join the LCF community and connect with people who share a commitment to leadership development and positive community impact.",
    href: "mailto:info@leadershipconferenceforum.org?subject=Membership%20Enquiry",
    actionLabel: "Become a Member",
  },

  {
    icon: HeartHandshake,
    title: "Volunteer With LCF",
    description:
      "Support our activities through volunteering in event planning, community engagement, outreach, and programme coordination.",
    href: "#volunteer",
  },

  {
    icon: GraduationCap,
    title: "Become a Mentor",
    description:
      "Share your knowledge and experience by supporting others through mentorship.",
    href: "mailto:info@leadershipconferenceforum.org?subject=Mentor%20Application",
    actionLabel: "Become a Mentor",
  },

  {
    icon: Users,
    title: "Apply for Mentoring",
    description:
      "Explore opportunities to receive guidance, support, and development through mentorship.",
    href: "mailto:info@leadershipconferenceforum.org?subject=Mentoring%20Application",
    actionLabel: "Apply for Mentoring",
  },

  {
    icon: Handshake,
    title: "Partner With Us",
    description:
      "Universities, charities, businesses, professional bodies, and community organisations can collaborate with LCF.",
    href: "mailto:info@leadershipconferenceforum.org?subject=Partnership%20Enquiry",
    actionLabel: "Partner With Us",
  },

  {
    icon: Building2,
    title: "Sponsor / Support an Event",
    description:
      "Organisations interested in supporting an LCF event or programme can get in touch to discuss opportunities.",
    href: "mailto:info@leadershipconferenceforum.org?subject=Event%20Sponsorship%20Enquiry",
    actionLabel: "Support an Event",
  },

  {
    icon: CalendarDays,
    title: "Attend an Event",
    description:
      "Discover current Leadership Conference Forum events and register to attend.",
    href: "#/events",
    actionLabel: "View Events",
  },

  {
    icon: Heart,
    title: "Donate / Support LCF",
    description:
      "Support the work of LCF. Donation functionality and approved wording will be added when ready.",
    href: "mailto:info@leadershipconferenceforum.org?subject=Support%20LCF%20Enquiry",
    actionLabel: "Support LCF",
  },
];

export const newsArticles = [
  {
    id: 2,
    title: "Building Stronger Communities Through Leadership",
    category: "Leadership",
    date: "August 15, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Strong communities are built when individuals are encouraged to lead with integrity, collaborate with others and contribute positively to the people around them.",
    content: `
Strong communities are built when individuals are encouraged to take responsibility, support one another and contribute positively to the people around them.

Leadership goes beyond holding a position or having a title. It involves integrity, responsibility, empathy and the willingness to make a meaningful difference in the lives of others.

At Leadership Conference Forum, we believe that leadership development plays an important role in building stronger communities. When individuals are equipped with the right knowledge, confidence and support, they are better prepared to contribute positively within their communities and professions.

Through leadership conversations, mentorship, networking opportunities and community engagement, we create opportunities for people to learn from one another and develop practical leadership skills.

Strong communities are not created by one person. They are built through collaboration between individuals who are willing to share ideas, support others and work towards a common purpose.

As we continue our work, we remain committed to encouraging responsible leadership, creating meaningful connections and supporting individuals who want to make a positive impact.
    `,
  },

  {
    id: 3,
    title: "The Importance of Diversity in Leadership",
    category: "Leadership",
    date: "August 10, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Diverse perspectives can create stronger teams, better conversations and more inclusive approaches to leadership across different professions and communities.",
    content: `
Leadership is strengthened when people from different backgrounds, experiences and professions have the opportunity to contribute their perspectives.

Diversity in leadership allows organisations and communities to approach challenges from different viewpoints. It can encourage better conversations, greater understanding and more inclusive decision-making.

At Leadership Conference Forum, diversity is an important part of our approach to leadership development. We believe that leadership exists across different professions, communities and areas of expertise.

Bringing people together creates an environment where individuals can share their experiences, learn from one another and discover different ways of approaching leadership.

Diversity also creates opportunities for younger and aspiring leaders to learn directly from people who have experience in their chosen fields.

By encouraging open conversations, mentorship and collaboration, we aim to create a community where different voices are valued and individuals are encouraged to lead with confidence and integrity.

The future of leadership requires people who are willing to listen, learn and work with others. Embracing diverse perspectives is an important part of that journey.
    `,
  },

  {
    id: 4,
    title: "Young Professionals and the Future of Leadership",
    category: "Young Leaders",
    date: "August 5, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Young professionals have an important role to play in shaping the future. Leadership development can help them prepare to make meaningful contributions.",
    content: `
Young professionals are an important part of the future of leadership. Their ideas, skills and experiences will influence the organisations and communities they become part of.

Developing leadership skills early can help young professionals build confidence, communicate effectively and make informed decisions.

Leadership is not something that only begins when someone becomes a manager or holds a senior position. It can be developed through everyday actions, relationships and responsibilities.

At Leadership Conference Forum, we encourage young professionals and aspiring leaders to learn continuously, connect with experienced professionals and take opportunities to grow.

Mentorship can play an important role in this process. Learning directly from people who have experience in different professions can provide valuable insight and help younger leaders better understand the opportunities and challenges within their fields.

We believe that investing in young professionals is an investment in stronger communities and a more responsible future.

Through mentorship, networking and leadership development, young people can be better prepared to make meaningful contributions wherever their careers take them.
    `,
  },

  {
    id: 5,
    title: "Creating Meaningful Connections Through Networking",
    category: "Community",
    date: "July 29, 2026",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Networking is more than exchanging contact details. It creates opportunities for people to share knowledge, collaborate and build relationships that can last.",
    content: `
Networking is often described as the process of meeting new people and building professional relationships. However, meaningful networking goes beyond exchanging contact details.

Good relationships are built through genuine conversations, shared experiences and a willingness to support one another.

At Leadership Conference Forum, we create opportunities for people from different backgrounds and professions to connect, exchange ideas and build relationships.

Networking can introduce individuals to new perspectives, opportunities and experiences. It can also create collaborations between people who may otherwise never have had the opportunity to meet.

For young professionals and aspiring leaders, networking can provide access to experienced individuals who can offer advice, encouragement and useful insights.

Meaningful connections also strengthen communities. When people share knowledge, support one another and collaborate, they create opportunities for collective growth.

We believe that every conversation has the potential to create a connection that can lead to learning, collaboration and positive impact.
    `,
  },

  {
    id: 6,
    title: "Leadership Lessons From Different Professions",
    category: "Insights",
    date: "July 22, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Leadership can be found across every profession. Exploring different experiences helps us understand the many ways people lead and influence positive change.",
    content: `
Leadership is not limited to one profession or career path. People demonstrate leadership in business, healthcare, education, technology, politics, finance, law, journalism and many other fields.

Each profession provides different experiences and challenges, which can teach valuable lessons about leadership.

A business leader may learn the importance of decision-making and strategy, while a healthcare professional may demonstrate empathy, responsibility and teamwork. A journalist may highlight the importance of communication and integrity, while a technology professional may demonstrate innovation and problem-solving.

Learning from different professions allows us to develop a broader understanding of what leadership means.

At Leadership Conference Forum, we believe that bringing people from different professional backgrounds together creates opportunities for knowledge sharing and mentorship.

Our mentorship approach encourages individuals to learn from experienced people within their chosen disciplines while also exposing them to ideas from other fields.

Leadership can take many forms, but the common foundation remains the same: integrity, responsibility, continuous learning and a willingness to positively influence others.
    `,
  },

  {
    id: 7,
    title: "Preparing for the Future Leaders Conference 2026",
    category: "Events",
    date: "July 15, 2026",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "The Leadership Conference Forum is preparing for another opportunity to bring leaders, professionals and aspiring leaders together for learning and connection.",
    content: `
The Leadership Conference Forum is preparing for the Future Leaders Conference 2026, bringing together leaders, professionals, young professionals and aspiring leaders for an opportunity to learn, connect and share experiences.

The conference is designed to create meaningful conversations around leadership development and the role individuals can play in creating positive change within their communities and professions.

Participants will have the opportunity to learn from experienced speakers, engage in leadership discussions and connect with other individuals who share an interest in leadership and personal development.

The event will also provide opportunities for networking and meaningful conversations between participants from different professional backgrounds.

We believe that conferences such as this create an important space for people to exchange ideas, develop new perspectives and build relationships that can continue beyond the event itself.

As preparations continue, we look forward to welcoming participants and creating an experience focused on learning, leadership and meaningful connection.
    `,
  },
];

export const featuredArticle = newsArticles[0];
