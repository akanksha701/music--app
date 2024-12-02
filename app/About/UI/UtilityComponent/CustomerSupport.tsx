import React from "react";
import { ICustomerSupportProps } from "../../types/types";

const CustomerSupport = (props: ICustomerSupportProps) => {
  const { CustomerServiceAndSupport, serviceTitle } = props;
  return (
    <div className="bg-neutral-300 my-6 rounded-md p-10  flex flex-col">
      <p className="text-3xl text-blue-500 hover:text-blue-400">
        {serviceTitle}
      </p>
      <div className=" mt-3">
        <ol className="list-decimal">
          {CustomerServiceAndSupport.map((service, index) => (
            <>
              <li className="p-2 flex">
                <span className="underline underline-offset-4 text-green-600 cursor-pointer">
                  {service.title}
                </span>
                <span className="ml-3">{service.description}</span>
              </li>
            </>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default CustomerSupport;
