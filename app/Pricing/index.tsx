import React from 'react'
import Plans from './UI/UtilityComponent/Plans'
import { fetchApi } from '@/utils/helpers';
import { getMarketingDetails } from '@/utils/apiRoutes';
import { Method } from '../About/types/types';

const Index = async () => {
  const data = await fetchApi(getMarketingDetails,Method.GET);
  return (
    <>
    <Plans data={data?.pricingPlans}/>
    </>
  )
}

export default Index