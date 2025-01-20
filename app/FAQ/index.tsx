import React from 'react';
import Questions from './UI/Questions';
import { fetchApi } from '@/utils/helpers';
import { Method } from '../About/types/types';
import { getMarketingDetails } from '@/utils/apiRoutes';

const Index = async () => {
  const data = await fetchApi(getMarketingDetails, Method.GET);
  console.log('data',data);
  return (
    <>
      <Questions data={data?.questions} faqDescription={data?.faqDescription} />
    </>
  );
};

export default Index;
