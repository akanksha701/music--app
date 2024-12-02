import exp from "constants";
import { title } from "process";
import { string } from "zod";

export interface IFeature {
  title: string;
  description: string;
  image: string;
}

export interface IPricingPlan {
  title: string;
  description: string;
  price: string;
  features: string[];
}

export interface IfooterLinks {
  title?: string;
  links?: Array<string>;
}
export interface ISectionProps {
  data: IFeature[];
}

export interface ICategoryProps
{
  moodList:Array<{
    id:string,
    mood:string,
    imageUrl:string
  }>
}
export interface IArtistProps
{
  artistsData:Array<{
    id:string,
    mood:string,
    imageUrl:string
  }>
}

export interface IPlans {
  data?: IPricingPlan[];
}

export interface IPopularTracksTypes {
  data: Array<string>;
  users: Array<string>;
}

export interface IFooterProps {
  data?: IfooterLinks[];
}

export interface ICarousalProps {
  data: Array<string>;
}
export interface ICoverProps {
  data: { title?: string; description?: string };
}

export interface IViewProps {
  title?: string;
  viewImg: string;
  points: Array<string>;
  views: Array<{ title?: string; views?: string; color?: string }>;
}
