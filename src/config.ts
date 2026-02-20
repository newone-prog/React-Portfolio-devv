// Site configuration
// Resume Portfolio - Professional resume website

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface HeroConfig {
  brandLeft: string;
  brandRight: string;
  tagline: string;
  since: string;
  email: string;
  scrollText: string;
  copyrightText: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutConfig {
  label: string;
  headline: string;
  description: string;
  bottomText: string;
  galleryImages: GalleryImage[];
  stats: StatItem[];
}

export interface Exhibition {
  id: number;
  title: string;
  image: string;
  date: string;
}

export interface ExhibitionsConfig {
  label: string;
  headline: string;
  ctaText: string;
  exhibitions: Exhibition[];
}

export interface Collection {
  id: number;
  title: string;
  year: string;
  description: string;
  image: string;
}

export interface CollectionsConfig {
  label: string;
  headline: string;
  ctaText: string;
  collections: Collection[];
}

export interface TestimonialsConfig {
  quote: string;
  authorName: string;
  authorTitle: string;
}

export interface InfoCard {
  icon: string;
  title: string;
  content: string;
}

export interface VisitConfig {
  label: string;
  headline: string;
  description: string;
  ctaText: string;
  infoCards: InfoCard[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  marqueeText: string;
  brandName: string;
  brandDescription: string;
  socialLinks: SocialLink[];
  quickLinks: FooterLink[];
  quickLinksTitle: string;
  contactTitle: string;
  contactItems: string[];
  bottomLinks: FooterLink[];
}

export const siteConfig: SiteConfig = {
  language: "en",
  title: "Devansh Mehrotra | Finance Student",
  description: "Passionate about investment banking, and data-driven decision making. Combining quantitative skills with business acumen to solve complex financial challenges.",
};

export const heroConfig: HeroConfig = {
  brandLeft: "Devansh",
  brandRight: "Mehrotra",
  tagline: "Finance Student & Aspiring Investment Banker",
  since: "Since 2024",
  email: "[devanshmehrotra2190@gmail.com]",
  scrollText: "Scroll to explore",
  copyrightText: "© 2024 Devv",
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
  ],
  socialLinks: [
    { label: "LinkedIn", href: "www.linkedin.com/in/devanshmehrotra1508" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Twitter", href: "https://twitter.com" },
  ],
};

export const aboutConfig: AboutConfig = {
  label: "About Me",
  headline: "Finance Student & Aspiring Investment Banker",
  description: "I'm a Finance Student with a strong interest in investment banking and data-driven decision making. I combine quantitative skills with business acumen to solve complex financial challenges. My journey in finance started with a curiosity about how markets work, which evolved into a career dedicated to crafting innovative financial solutions.",
  bottomText: "When I'm not studying, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in continuous learning and staying ahead of the curve in this ever-evolving tech landscape.",
  galleryImages: [
    { src: "/images/gallery-1.jpg", alt: "Coding Session", label: "Development" },
    { src: "/images/gallery-2.jpg", alt: "Team Collaboration", label: "Collaboration" },
    { src: "/images/gallery-3.jpg", alt: "Tech Conference", label: "Learning" },
    { src: "/images/gallery-4.jpg", alt: "UI Design", label: "Design" },
    { src: "/images/gallery-5.jpg", alt: "Code Review", label: "Quality" },
    { src: "/images/gallery-6.jpg", alt: "Project Planning", label: "Strategy" },
  ],
  stats: [
    { value: "1+", label: "Months Experience" },
    { value: "4+", label: "Projects Completed" },
    { value: "6+", label: "Creative Tools" },
    { value: "4+", label: "Hands On Models" },
  ],
};

export const exhibitionsConfig: ExhibitionsConfig = {
  label: "Education",
  headline: "Academic Background",
  ctaText: "View Full Credentials",
  exhibitions: [
    {
      id: 1,
      title: "Higher Senior Secondary (Class XII); Affiliated to CBSE Board",
      image: "/images/tagore-school.png",
      date: "Tagore Public School | 2021 - 2023",
    },
    {
      id: 2,
      title: "Senior Secondary (Class X); Affiliated to; CBSE Board",
      image: "/images/tagore-school-2.png",
      date: "Tagore Public School | 2007-2021",
    },
    {
      id: 3,
      title: "BBA-IBM",
      image: "/images/education-3.jpg",
      date: "United University | 2024 - 2027",
    },
    {
      id: 4,
      title: "MBA",
      image: "/images/mba-education.png",
      date: "Amazon Web Services | 2020",
    },
  ],
};

export const collectionsConfig: CollectionsConfig = {
  label: "Experience",
  headline: "Professional Journey",
  ctaText: "Learn More",
  collections: [
    {
      id: 1,
      title: "Mutual Fund Analyst",
      year: "1 mo | Internship",
      description: "Analyzed market trends and investment opportunities. Conducted financial modeling and valuation. Prepared investment recommendations for portfolio managers.",
      image: "/images/experience-1.jpg",
    },
  ],
};

export const testimonialsConfig: TestimonialsConfig = {
  quote: " Fintech & The Future of Investment Banking | SSRN verified research paper",
  authorName: "Devansh Mehrotra",
  authorTitle: "BBA-IBM | United University",
};

export const visitConfig: VisitConfig = {
  label: "Certifications",
  headline: "Skills & Certifications",
  description: "Continuously expanding my skill set through professional certifications and hands-on experience with cutting-edge technologies.",
  ctaText: "Download CV",
  infoCards: [
    {
      icon: "Award",
      title: "Skills",
      content: "Quantitative Analysis (Finance), Microsoft Word, Microsoft Excel, Microsoft PowerPoint, Microsoft Power BI, IBM SPSS ",
    },
    {
      icon: "Cloud",
      title: "Certifications (SEBI | NISM)",
      content: "National Finance Literacy Quiz 2026 , Investor Certification Examination, National Finance Literacy Quiz 2025",
    },
    {
      icon: "Award",
      title: "Certifications (IBM)",
      content: "Business Intelligence (BI), Data Visualization with Python",
    },
  ],
};

export const footerConfig: FooterConfig = {
  marqueeText: "Let's Work Together • Available for Freelance • Open to Opportunities • ",
  brandName: "Devansh Mehrotra",
  brandDescription: "Finance Student & Aspiring Investment Banker crafting exceptional digital experiences. Let's build something amazing together.",
  socialLinks: [
    { label: "LinkedIn", href: "www.linkedin.com/in/devanshmehrotra1508" },
    { label: "GitHub", href: "https://github.com" },
    { label: "Twitter", href: "https://twitter.com" },
  ],
  quickLinks: [
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
  ],
  quickLinksTitle: "Quick Links",
  contactTitle: "Get in Touch",
  contactItems: [
    "[devanshuubba24@uniteduniversity.edu.in]",
    "+91 8188 924 715",
    "Prayagraj, Uttar Pradesh",
  ],
  bottomLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};
