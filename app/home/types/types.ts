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
export interface IQuestionData {
  question: string;
  description: string;
}
export interface IfooterLinks
{
  title?:string,
  links?:Array<string>
}
export interface ISectionProps {
  data: IFeature[];
}

export interface IPlans {
  data?: IPricingPlan[];
}

export interface IQuestionProps {
  data?: IQuestionData[];
}
export interface IAccoridionProps {
  data?: IQuestionData[];
}
export interface IFooterProps
{
  data?: IfooterLinks[]
}