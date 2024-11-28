import React, { useMemo } from "react";
import { IFeature, ISectionProps } from "../../types/types";
import Image from "next/image";

const Section = (props: ISectionProps) => {
  const { data } = props;

  // Memoize the entire rendering of the section based on the `data` prop
  const memoizedSection = useMemo(() => {
    return (
      <div>
        <section className="py-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {data?.map((feature: IFeature, index: number) => (
                <div className="text-center" key={index}>
                  <div className="bg-purple-100 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={60}
                      height={60}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }, [data]); // Only re-render the section if `data` changes

  return memoizedSection;
};

export default Section;
