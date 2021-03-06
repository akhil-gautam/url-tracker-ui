import { useState } from 'react';
import { toast } from 'react-toastify';

import Modal from '../../components/Modal';
import Analytics from './Analytics';
import EditLink from './EditLink';
import HitsList from './HitsList';
import { CopyIcon, EditIcon } from '../../icons';

const MainContent = ({ loading, link, refetch }) => {
  const [modalOpen, setModal] = useState(false);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!link) {
    return (
      <div className='flex justify-center items-center h-full text-red-400 text-lg font-semibold'>
        No links avaiable to show. Please select one from left.
      </div>
    );
  }

  const copyJobToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = 'https://pynk.in/' + link.short_link;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    toast('Copied to clipboard!', { position: 'top-center' });
  };

  if (modalOpen) {
    return (
      <Modal
        isOpen={modalOpen}
        onClose={() => setModal(false)}
        className='w-2/3 flex flex-col justify-center'
      >
        <EditLink
          link={link}
          handleModalClose={() => setModal(false)}
          refetch={refetch}
        />
      </Modal>
    );
  }

  const editLink = () => {
    setModal(true);
  };

  return (
    <section className='flex flex-col py-8 px-10'>
      <header className='mb-2 text-sm text-gray-400'>
        CREATED {new Date(link.__createdtime__).toDateString()}
      </header>
      <section className='text-xl font-light'>
        {link.title || link.original_link}
      </section>
      <section className='mb-8 text-gray-400 font-thin'>
        {link.original_link}
      </section>
      <section className='flex items-center space-x-3'>
        <a
          href={'https://pynk.in/' + link.short_link}
          target='_blank'
          rel='noreferrer'
          className='text-blue-700 w-min px-3 py-1'
        >
          {'https://pynk.in/' + link.short_link}
        </a>
        <section className='flex space-x-4 text-sm'>
          <button
            onClick={copyJobToClipboard}
            className='flex space-x-2 items-center bg-indigo-100 text-indigo-500 px-4 py-1 focus:outline-none rounded-lg transition cursor-pointer hover:bg-indigo-200'
          >
            <span>Copy</span>
            <span>
              <CopyIcon />
            </span>
          </button>
          <button
            onClick={editLink}
            className='flex space-x-2 items-center bg-indigo-100 text-indigo-500 px-4 py-1 focus:outline-none rounded-lg transition cursor-pointer hover:bg-indigo-200'
          >
            <span>Edit</span>
            <span>
              <EditIcon />
            </span>
          </button>
          {/* <button>QR CODE</button> */}
        </section>
      </section>

      <hr className='my-12' />
      <Analytics link_id={link.id} />
      <hr className='my-6' />
      <HitsList link_id={link.id} short_url={link.short_link} />
    </section>
  );
};

export default MainContent;
