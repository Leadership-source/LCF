import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const siteUrl = (import.meta.env.VITE_SITE_URL || "https://leadershipconferenceforum.org").replace(/\/$/, "");

const pageMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Leadership Conference Forum | Developing Future Leaders",
    description: "Leadership Conference Forum inspires, develops, and connects current and future leaders through mentorship, events, professional development, and community engagement.",
  },
  "/about": {
    title: "About Us | Leadership Conference Forum",
    description: "Learn how Leadership Conference Forum develops leadership capacity, creates meaningful connections, and strengthens communities across the UK.",
  },
  "/events": {
    title: "Leadership Events and Programmes | LCF",
    description: "Explore upcoming Leadership Conference Forum events, programmes, workshops, and opportunities for learning, networking, and community impact.",
  },
  "/teams": {
    title: "Our People and External Roles | Leadership Conference Forum",
    description: "Meet the leaders, advisors, patrons, ambassadors, supporters, and mentees contributing to the Leadership Conference Forum community.",
  },
  "/get-involved": {
    title: "Volunteer and Get Involved | Leadership Conference Forum",
    description: "Volunteer with Leadership Conference Forum through mentoring, events, community outreach, communications, fundraising, or administrative support.",
  },
  "/news": {
    title: "News and Insights | Leadership Conference Forum",
    description: "Read the latest Leadership Conference Forum news, leadership insights, programme updates, and community stories.",
  },
  "/contact": {
    title: "Contact Leadership Conference Forum",
    description: "Contact Leadership Conference Forum for enquiries, partnerships, volunteering, events, and further information.",
  },
  "/legal-notice": {
    title: "Legal Notice | Leadership Conference Forum",
    description: "Read the Leadership Conference Forum legal notice and important information about using this website.",
  },
};

function setMeta(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export default function Seo() {
  const { pathname } = useLocation();
  const metadata = pageMetadata[pathname] || {
    title: "Leadership Conference Forum",
    description: "Leadership Conference Forum develops leaders, strengthens communities, and creates opportunities for positive social impact.",
  };
  const canonicalUrl = `${siteUrl}${pathname === "/" ? "" : pathname}`;

  useEffect(() => {
    document.title = metadata.title;
    setMeta("description", metadata.description);
    setMeta("robots", "index, follow");
    setProperty("og:title", metadata.title);
    setProperty("og:description", metadata.description);
    setProperty("og:type", "website");
    setProperty("og:url", canonicalUrl);
    setProperty("og:image", `${siteUrl}/lfc-logo.png`);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", metadata.title);
    setMeta("twitter:description", metadata.description);
    setMeta("twitter:image", `${siteUrl}/lfc-logo.png`);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let structuredData = document.querySelector<HTMLScriptElement>("#site-structured-data");
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "site-structured-data";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Leadership Conference Forum",
      alternateName: "LCF",
      url: siteUrl,
      logo: `${siteUrl}/lfc-logo.png`,
      description: metadata.description,
      email: "info@leadershipconferenceforum.org",
      address: { "@type": "PostalAddress", addressCountry: "GB" },
    });
  }, [canonicalUrl, metadata.description, metadata.title]);

  return null;
}