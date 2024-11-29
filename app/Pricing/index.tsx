import React from 'react'
import Plans from './UI/UtilityComponent/Plans'
import { fetchApi } from '@/utils/helpers';

const Index = async () => {
  const data = await fetchApi("/api/marketing", "GET");
  return (
    <>
    <Plans data={data?.pricingPlans}/>
    </>
  )
}

export default Index