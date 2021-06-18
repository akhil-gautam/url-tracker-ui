import { useEffect } from 'react';

import { get } from '../Api';

const Redirector = () => {
  useEffect(() => {
    fetchRedirectLink();
  }, []);
  const fetchRedirectLink = async () => {
    const resp = await get(`links/${window.location.pathname.slice(1)}`);
    const parsedResponse = await resp.json();
    window.location = parsedResponse.original_link;
  };
  return <div>Redirecting...</div>;
};

export default Redirector;
