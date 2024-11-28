import React, { useMemo } from "react";
import { IPlans, IPricingPlan } from "../../types/types";

const Plans = (props: IPlans) => {
  const { data } = props;
  const memoizedPlans = useMemo(() => {
    return (
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.map((plan: IPricingPlan, index: number) => (
              <div className="bg-white rounded-lg shadow-lg p-8" key={index}>
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <p className="text-4xl font-bold mb-6">{plan.price}</p>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature: any, featureIndex: number) => (
                    <li key={featureIndex}>✓ {feature}</li>
                  ))}
                </ul>
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }, [data]);

  return memoizedPlans;
};

export default Plans;
