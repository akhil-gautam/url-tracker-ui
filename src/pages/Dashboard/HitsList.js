import { useEffect, useState } from 'react';
import CsvDownload from 'react-json-to-csv';

import { get } from '../../Api';

const HitsList = ({ short_url, link_id }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchLinkHits();
  }, [link_id]);
  const fetchLinkHits = async () => {
    setLoading(true);
    const response = await get(`links/${link_id}/hits`);
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

  return (
    <section>
      <header className='flex items-center justify-between mb-10'>
        <span className='font-semibold text-lg text-gray-800'>Access Data</span>
        <span>
          <CsvDownload
            data={data}
            filename={`${short_url}_access_data.csv`}
            style={{
              boxShadow: 'inset 0px 1px 0px 0px #e184f3',
              background:
                'linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)',
              backgroundColor: '#c123de',
              borderRadius: '6px',
              border: '1px solid #a511c0',
              display: 'inline-block',
              cursor: 'pointer',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: 'bold',
              padding: '6px 24px',
              textDecoration: 'none',
              textShadow: '0px 2px 0px #9b14b3',
            }}
          >
            Export CSV
          </CsvDownload>
        </span>
      </header>
      {data.length === 0 ? (
        <section>
          Link has not been accessed yet. Please check back later.
        </section>
      ) : (
        <ul>
          <li className='bg-gray-50 text-gray-800 font-semibold text-sm flex justify-between py-3 px-2 border border-dashed mb-3'>
            <span>Location</span>
            <span>Referrer</span>
            <span>Visited At</span>
          </li>
          {data.map((access) => (
            <li
              key={access.id}
              className='text-black text-sm font-medium flex justify-between px-2 py-3 border border-gray-200 rounded-md mb-3'
            >
              <span>{access.location || 'N/A'}</span>
              <span>{access.referrer}</span>
              <span>{new Date(1623954033385).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default HitsList;
