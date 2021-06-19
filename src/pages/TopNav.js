import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { isLoggedIn, clearLocalStorage } from '../Api';
import Modal from '../components/Modal';
import NewLink from './Dashboard/NewLink';
import { LogoutIcon } from '../icons';

const TopNav = ({ refetch }) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [modalOpen, setModal] = useState(false);

  const logout = () => {
    clearLocalStorage();
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <Redirect to='/signin' />;
  }

  if (modalOpen) {
    return (
      <Modal
        isOpen={modalOpen}
        onClose={() => setModal(false)}
        className='w-2/3 flex flex-col justify-center'
      >
        <NewLink refetch={refetch} handleModalClose={() => setModal(false)} />
      </Modal>
    );
  }

  return (
    <nav className='flex items-center justify-between px-3 py-4 border-b border-gray-200'>
      <div className='font-extrabold text-4xl text-pink-900'>Pynk</div>
      <div className='flex justify-around items-center space-x-5'>
        {loggedIn && (
          <div className='flex space-x-6'>
            <button
              className='flex items-center border border-blue-700 text-blue-700 px-3 py-1 rounded-lg'
              onClick={() => setModal(true)}
            >
              <span>CREATE</span>
              <span>+</span>
            </button>
            <p
              className='flex items-center font-semibold transition hover:bg-gray-600 hover:text-white hover:border-transparent cursor-pointer px-3 py-2 rounded-lg space-x-1 border border-gray-400'
              onClick={logout}
            >
              <span className='text-sm'>Logout</span>
              <span>
                <LogoutIcon />
              </span>
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNav;
