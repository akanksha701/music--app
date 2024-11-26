export interface Feature {
    title: string;
    description: string;
    image: string;
  }
  
export interface PricingPlan {
    title: string;
    description: string;
    price: string;
    features: string[];
  }
  
  export interface SectionProps
  {
     data: Feature[]
  }