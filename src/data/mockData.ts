export interface HeroSlide {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any; // Can be string or Sanity image asset object
  title: string;
  subtitle: string;
  description: string;
  btnText1?: string;
  btnLink1?: string;
  btnText2?: string;
  btnLink2?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface ProductSubcategory {
  id: string;
  title: string;
  category: string;
  image: string;
  range: string;
  modelCount: number;
}

export interface ProductModel {
  slug: string;
  name: string;
  subcategory: string;
  brand: string;
  rating: number;
  projectsCount: number;
  image: string;
  description: string;
  overview: string;
  capacity: string;
  year: string;
  power: string;
  grade: string;
  brochureUrl?: string;
  images?: string[];
}

export interface CoreValue {
  title: string;
  description: string;
}

export interface Director {
  name: string;
  role: string;
  image: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
}

export interface Office {
  name: string;
  address: string;
  phone: string;
  mapLink?: string;
}

export interface MockData {
  companyName: string;
  slogan: string;
  experienceYears: number;
  completedProjectsCount: number;
  hero: {
    title: string;
    subtitle: string;
    description: string;
    slides: HeroSlide[];
  };
  products: Product[];
  productSubcategories: ProductSubcategory[];
  productModels: ProductModel[];
  mission: string;
  vision: string;
  coreValues: CoreValue[];
  about: {
    history: string;
    directors: Director[];
    awards: string[];
  };
  projects: ProjectItem[];
  csr: {
    title: string;
    description: string;
    initiatives: { title: string; description: string }[];
  };
  contact: {
    offices: Office[];
    email: string;
    phonePudukkottai: string;
    phoneKaraikudi: string;
    officeHours: {
      weekdays: string;
      sunday: string;
    };
  };
}

export const mockData: MockData = {
  companyName: "M. Karuppiah Group",
  slogan: "Building Dreams, Delivering Reliability",
  experienceYears: 60,
  completedProjectsCount: 100,
  hero: {
    title: "Building Dreams,",
    subtitle: "Delivering Reliability,",
    description: "Your trusted partner for quality building materials, strong relationships, and complete construction solutions.",
    slides: [
      {
        image: "/images/hero_1.png",
        title: "Building Dreams,",
        subtitle: "Delivering Reliability",
        description: "60+ years of trusted excellence in supplying construction materials and infrastructure solutions.",
        btnText1: "Inquire Now",
        btnLink1: "/contacts",
        btnText2: "Our Legacy",
        btnLink2: "/about"
      },
      {
        image: "/images/hero_2.png",
        title: "Quality Materials,",
        subtitle: "Stronger Structures",
        description: "Your one-stop destination for cement, steel, tiles, granites, sanitaryware, and custom fencing.",
        btnText1: "Inquire Now",
        btnLink1: "/contacts",
        btnText2: "Our Legacy",
        btnLink2: "/about"
      },
      {
        image: "/images/hero_3.png",
        title: "Complete Solutions,",
        subtitle: "End-to-End Execution",
        description: "Serving construction, infrastructure, agriculture, and energy sectors across Pudukkottai & Karaikkudi.",
        btnText1: "Inquire Now",
        btnLink1: "/contacts",
        btnText2: "Our Legacy",
        btnLink2: "/about"
      }
    ]
  },
  products: [],
  productSubcategories: [],
  productModels: [],
  mission: "To get success in what we do.",
  vision: "To become the only retail mart that serves entire building stuff from the scratch and wanted to be monopoly on it.",
  coreValues: [
    {
      title: "Trust",
      description: "Built over six decades of honest dealings and transparent business practices."
    },
    {
      title: "Quality",
      description: "Supplying only certified and premium products you can rely on for generations."
    },
    {
      title: "Commitment",
      description: "Dedicated to every customer's project, ensuring timely material supplies and services."
    },
    {
      title: "One-Stop Solutions",
      description: "Providing everything needed for building from foundation to finish under one roof."
    }
  ],
  about: {
    history: "Established in 1964, M. Karuppiah has grown from a modest beginning into a distinguished name built on trust, quality, and legacy. Over the decades, we have consistently evolved – expanding our presence, modernizing our spaces, and elevating customer experience at every stage. Driven by strong values and forward-thinking leadership, our journey reflects a seamless blend of tradition and innovation. Today, M. Karuppiah stands as a symbol of excellence, committed to delivering superior quality and enduring relationships.",
    directors: [
      {
        name: "Mr. Ravendharan Karuppiah",
        role: "Chief Executive Director",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Mr. Kumaresan Karuppiah",
        role: "Chief Executive Director",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Mr. Chellappan Karuppiah",
        role: "Chief Executive Director",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Mr. Ashwin Karuppiah",
        role: "Managing Director",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Mr. Aravind Karuppiah",
        role: "Managing Director",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop"
      },
      {
        name: "Ms. Supriya Gandhi Chellappan",
        role: "Managing Director",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
      }
    ],
    awards: [
      "PROP.TIMES PRIME PARTNER - SAPPHIRE IYER (Excellence in Real Estate & Supplies)",
      "Best Building Materials Distributor Award - Regional Conclave",
      "Bharat Petroleum Gold Outperformers Club Trophy"
    ]
  },
  projects: [
    {
      id: "proj-pwd-quarters",
      title: "PWD Officer's Quarters",
      category: "Government Buildings",
      location: "Karaikkudi, TN",
      year: "2024",
      image: "https://images.unsplash.com/photo-1541829011-831c3a743345?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "proj-regional-hospital",
      title: "General District Hospital",
      category: "Hospitals",
      location: "Karaikkudi, TN",
      year: "2023",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce2?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "proj-heritage-resort",
      title: "Chettinad Heritage Resort",
      category: "Hotels & Resorts",
      location: "Karaikkudi, TN",
      year: "2024",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "proj-tech-campus",
      title: "Regional Government Engineering Block",
      category: "Educational Institutions",
      location: "Pudukkottai, TN",
      year: "2023",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "proj-executive-villa",
      title: "Individual Luxury Villa",
      category: "Individual Houses",
      location: "Pudukkottai, TN",
      year: "2024",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "proj-corporate-plaza",
      title: "Commercial Retail Center",
      category: "Commercial Spaces",
      location: "Pudukkottai, TN",
      year: "2023",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
    }
  ],
  csr: {
    title: "Empowering Pudukkottai & Karaikkudi",
    description: "At M. Karuppiah Group, social responsibility is woven into our heritage. For over 60 years, we have actively supported community development, local agriculture, green energy, and health programs.",
    initiatives: [
      {
        title: "Rural Educational Support",
        description: "Sponsoring school fees, textbooks, and infrastructure upgrades for government schools across the district, ensuring every child has access to quality education."
      },
      {
        title: "Free Healthcare & Eye Camps",
        description: "Partnering with regional medical experts to conduct regular, free medical checkups, cardiac screenings, and eye surgery camps for village families."
      },
      {
        title: "Agricultural Assistance & Training",
        description: "Promoting organic fertilizers, rainwater harvesting, and modern farming methods to empower small-scale farmers in Tamil Nadu."
      },
      {
        title: "Green Energy & afforestation",
        description: "Deploying solar installations in public buildings and sponsoring tree plantation drives to preserve the local environment and Chettinad biome."
      }
    ]
  },
  contact: {
    offices: [
      {
        name: "Pudukkottai Main Office & Yard",
        address: "M. Karuppiah Group, East Main Street, Pudukkottai, Tamil Nadu - 622001",
        phone: "+91 94433 12345"
      },
      {
        name: "Karaikkudi Branch & Outlet",
        address: "M. Karuppiah Group, Sekkalai Road, Karaikkudi, Tamil Nadu - 630001",
        phone: "+91 98424 22046"
      }
    ],
    email: "info@mkaruppiah.com",
    phonePudukkottai: "+91 94433 12345",
    phoneKaraikudi: "+91 98424 22046",
    officeHours: {
      weekdays: "Mon - Sat: 6:00 AM - 8:00 PM",
      sunday: "Sun: 6:00 AM - 12:00 PM"
    }
  }
};
