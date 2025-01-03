'use client';
import React from 'react';
import { useGetLanguageQuery } from '@/services/languages'; 
import TopCharts from './UI/UtilityComponents/TopCharts';

const Index = () => {
  
  return (
    <div className="p-10">
      <div className="relative mx-10">
        <TopCharts />
      </div>
    </div>
  );
};

export default Index;
