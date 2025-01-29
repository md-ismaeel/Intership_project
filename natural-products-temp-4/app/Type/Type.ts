export interface Product {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  quantity: number;
}

export interface HeroProps {
  deviceType: "mobile" | "tablet" | "desktop" | "superLargeDesktop";
}

export enum ContactTimePreference {
  MorningEarly = "Morning (6-9 AM)",
  MorningLate = "Morning (9-11 AM)",
  AfternoonEarly = "Afternoon (1-3 PM)",
  AfternoonLate = "Afternoon (3-5 PM)",
  EveningEarly = "Evening (5-7 PM)",
  EveningLate = "Evening (7-9 PM)",
}

export type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  preferredContactTime: ContactTimePreference | "";
  message: string;
};

export type CompanyStatItem = {
  icon: React.ElementType;
  value: string;
  label: string;
};

export type FormFieldConfig = {
  field: keyof FormData;
  type: "text" | "email" | "tel" | "textarea" | "select";
  label: string;
  options?: string[];
};
