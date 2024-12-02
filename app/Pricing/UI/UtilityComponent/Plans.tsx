import React, { useMemo } from "react";
import { IPlans, IPricingPlan } from "../../../Home/types/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Plans = (props: IPlans) => {
  const { data } = props;

  const memoizedPlans = useMemo(() => {
    return (
      <section className="py-20 bg-gray-50" id="pricing-section">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-purple-600 mb-12">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {data?.map((plan: IPricingPlan, index: number) => (
              <Card
                key={index}
                className="transition-transform transform hover:scale-105 hover:shadow-lg hover:translate-y-4"
              >
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-semibold text-purple-600 mb-4">
                    {plan.title}
                  </h3>
                  <p className="text-gray-700 mb-6">{plan.description}</p>
                  <p className="text-5xl font-bold mb-6 text-purple-600">
                    {plan.price}
                  </p>
                  <ul className="space-y-3 mb-6 text-left">
                    {plan.features.map((feature: any, featureIndex: number) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-600 text-lg"
                      >
                        <svg
                          className="w-5 h-5 text-purple-600 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-4">
                  <Button className="w-full bg-purple-600 text-white py-3 rounded-lg shadow-md hover:bg-purple-700 transition-all duration-300 ease-in-out">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }, [data]);

  return memoizedPlans;
};

export default Plans;
