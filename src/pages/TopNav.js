import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { isLoggedIn, clearLocalStorage } from '../Api';
import Modal from '../components/Modal';
import NewLink from './Dashboard/NewLink';

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

const LogoutIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5'
    viewBox='0 0 20 20'
    fill='currentColor'
  >
    <path
      fillRule='evenodd'
      d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
      clipRule='evenodd'
    />
  </svg>
);

export default TopNav;
