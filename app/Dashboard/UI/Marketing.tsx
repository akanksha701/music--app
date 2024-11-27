import { PricingPlan } from '../types/types';
import Section from './UtilityComponent/Section';


const MusicPage = async() => {
  const res = await fetch('http://localhost:3000/api/marketing');
  const data = await res.json();
  return (
    <div className='min-h-screen'>
      <section
        className='text-black py-20'
        style={{
          backgroundImage: 'url(\'/images/MarketingBG.jpg\')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='container mx-auto px-6 text-center'>
          <h1 className='text-5xl font-bold m-4'>
            Amplify your music authenticity, visit
            <a
              href='http://localhost:3000'
              target='_blank'
              className='bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-bottom bg-no-repeat bg-[length:100%_6px] hover:bg-[length:100%_100%] transition-[background-size]'
            >
              Spotify
            </a>
          </h1>
          <p className='text-xl mb-8'>
            Stream millions of songs and podcasts, anytime, anywhere.
          </p>
          <button className='bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100'>
            Start Listening Free
          </button>
        </div>
      </section>

      <Section data={data.feature}/>

      <section className='bg-gray-100 py-20'>
        <div className='container mx-auto px-6'>
          <h2 className='text-3xl font-bold text-center mb-12'>
            Choose Your Plan
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {data?.pricingPlans.map((plan:PricingPlan, index:number) => (
              <div className='bg-white rounded-lg shadow-lg p-8' key={index}>
                <h3 className='text-2xl font-bold mb-4'>{plan.title}</h3>
                <p className='text-gray-600 mb-6'>{plan.description}</p>
                <p className='text-4xl font-bold mb-6'>{plan.price}</p>
                <ul className='mb-6 space-y-2'>
                  {plan.features.map((feature:any, featureIndex:number) => (
                    <li key={featureIndex}>✓ {feature}</li>
                  ))}
                </ul>
                <button className='w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700'>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-20'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-3xl font-bold mb-4'>
            Ready to Start Your Musical Journey?
          </h2>
          <p className='text-gray-600 mb-8'>
            Join millions of happy listeners today.
          </p>
          <button className='bg-purple-600 text-white px-8 py-3 rounded-full font-bold hover:bg-purple-700'>
            Download Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default MusicPage;
