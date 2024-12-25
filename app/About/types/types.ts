export enum Method {
 GET='GET',
 POST='POST', 
 PUT='PUT'
}

export interface ICustomerSupportProps {
  aboutTitle?: string;
  aboutDescription?: string;
  serviceTitle?:string;
  CustomerServiceAndSupport: Array<{ title: string; description: string }>;
  aboutImage?:string
}
