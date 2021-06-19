import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { get, getAuthToken, getUserID } from '../Api';
import TopNav from './TopNav';
import LeftNav from '../components/LeftNav';
import MainContent from './Dashboard/MainContent';
import NewLink from './Dashboard/NewLink';
import Modal from '../components/Modal';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [activeLinkID, setActiveLinkID] = useState();
  const [activeLink, setActiveLink] = useState();
  const [links, setLinks] = useState([]);
  const [newForm, setNewForm] = useState(false);

  const token = getAuthToken() || '';

  useEffect(() => {
    if (token.length === 0) {
      return <Redirect to='/signin' />;
    }
    if (links.length === 0) {
      fetchLinks();
    } else {
      setActiveLink(links.filter((link) => link.id === activeLinkID)[0]);
    }
  }, [activeLinkID]);

  const fetchLinks = async () => {
    setLoading(true);
    const response = await get(
      `users/${getUserID()}/links?token=${getAuthToken()}`
    );
    const parsedResponse = await response.json();
    setLoading(false);
    setLinks(parsedResponse);
    parsedResponse.length > 0 && setActiveLinkID(parsedResponse[0].id);
    setActiveLink(parsedResponse[0]);
  };

  if (newForm) {
    return (
      <Modal
        isOpen={newForm}
        onClose={() => setNewForm(false)}
        className='w-2/3 flex flex-col justify-center'
      >
        <NewLink
          refetch={fetchLinks}
          handleModalClose={() => setNewForm(false)}
        />
      </Modal>
    );
  }

  return (
    <main className='h-full'>
      <TopNav refetch={fetchLinks} />
      <section className='flex w-full'>
        <LeftNav
          links={links}
          loading={loading}
          activeLinkID={activeLinkID}
          setActiveLinkID={(link) => setActiveLinkID(link)}
          openCreateForm={() => setNewForm(true)}
        />
        <div className='w-9/12'>
          <MainContent
            link={activeLink}
            loading={loading}
            refetch={fetchLinks}
          />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
