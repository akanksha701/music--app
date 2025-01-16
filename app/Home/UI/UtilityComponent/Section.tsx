import React, { useMemo } from 'react';
import Image from 'next/image';
interface IFeature {
  title: string;
  description: string;
  image: string;
}
interface ISectionProps {
  data: IFeature[];
}
const Section = (props: ISectionProps) => {
  const { data } = props;

  const memoizedSection = useMemo(() => {
    return (
      <div>
        <section>
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
  }, [data]); 

  return memoizedSection;
};

export default Section;
