import Referrers from './Referrers';

const Analytics = () => {
  return (
    <section className='flex w-full'>
      <section className='w-1/2 px-4 flex flex-col border-r border-indigo-200'>
        <header className='font-semibold text-lg'>
          Hits/Referrer
        </header>
        <Referrers />
      </section>
      <section className='w-1/2 px-4 flex flex-col'>
      <header className='font-semibold text-lg'>
          Hits/Location
        </header>
        <Referrers />
      </section>
    </section>
  );
};

export default Analytics;
