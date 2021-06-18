import { useEffect, useState } from 'react';

import PieChart from './PieChart';
import { get } from '../../Api';

const Analytics = ({ link_id }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchLinkHits();
  }, [link_id]);
  const fetchLinkHits = async () => {
    setLoading(true);
    const response = await get(`links/${link_id}/analytics`);
    const parsedResponse = await response.json();
    setLoading(false);
    setData(parsedResponse);
  };
  if (loading) {
    return (
      <div className='text-blue-600 text-xl font-semibold animate-pulse'>
        Loading...
      </div>
    );
  }

  if (data === null) {
    return (
      <section className='flex w-full'>Analytics data not avaiable.</section>
    );
  }

  return (
    <section className='flex w-full'>
      <section className='w-1/2 px-4 flex flex-col border-r border-indigo-200'>
        <header className='font-semibold text-lg'>Hits/Referrer</header>
        <PieChart data={data.referrer} />
      </section>
      <section className='w-1/2 px-4 flex flex-col'>
        <header className='font-semibold text-lg'>Hits/Location</header>
        <PieChart data={data.location} />
      </section>
    </section>
  );
};

export default Analytics;
