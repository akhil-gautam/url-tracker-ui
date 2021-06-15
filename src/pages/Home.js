import { Redirect } from 'react-router-dom';

import { getAuthToken } from '../Api';

const Home = () => {
  const token = getAuthToken() || '';

  if (token.length === 0) {
    return <Redirect to='/signin' />;
  }
  return <div>Home</div>;
};

export default Home;
