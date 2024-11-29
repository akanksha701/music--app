export interface IQuestionData {
  question: string;
  description: string;
}
export interface IQuestionProps {
  data?: IQuestionData[];
  faqDescription: { description: string };
}
export interface IAccoridionProps {
  data?: IQuestionData[];
}
