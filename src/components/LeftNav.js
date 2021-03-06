import { Loader } from '../icons';
import Button from './Button';

const LeftNav = ({
  links,
  loading = false,
  activeLinkID,
  openCreateForm,
  setActiveLinkID,
}) => {
  if (loading) {
    return (
      <div className='w-3/12 h-screen bg-gray-400 animate-pulse text-white text-xl shadow-xl flex space-x-3 justify-center items-center relative'>
        <span>
          <Loader />
        </span>
        <span>Loading...</span>
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <section className='h-screen flex justify-center items-center border-r w-3/12 flex-1 px-6'>
        <Button onClick={openCreateForm} variant='outline' color='primary'>
          Create Your First Link
        </Button>
      </section>
    );
  }

  const handleClick = (e) => {
    setActiveLinkID(e.target.parentElement.title);
  };

  return (
    <section className='w-3/12 flex flex-col relative border-r'>
      <p className='flex px-4 py-2 bg-pink-50 items-center justify-between'>
        <span className='font-thin text-gray-500'>{links.length} Link</span>
        <span>
          <ListIcon />
        </span>
      </p>
      <ul className='py-6'>
        {links.map((link) => (
          <li
            className={`px-5 py-2 flex flex-col border-b border-pink-50 hover:bg-gray-100  cursor-pointer transition ${
              link.id === activeLinkID && 'bg-gray-100'
            }`}
            key={link.id}
            title={link.id}
            onClick={handleClick}
          >
            <p className='text-xs font-extralight text-gray-400 transition mb-1'>
              {new Date(link.__createdtime__).toDateString()}
            </p>
            <p className='font-light'>{link.title}</p>
            <p className='text-sm font-semibold text-pink-600 transition'>
              {'https://pynk.in/' + link.short_link}
            </p>
            <p
              className='text-sm font-thin text-pink-600 transition'
              title={link.original_link}
            >
              Redirects to:{' '}
              <span className='text-blue-600 transition'>
                {link.original_link}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

const ListIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5'
    viewBox='0 0 20 20'
    fill='currentColor'
  >
    <path
      fillRule='evenodd'
      d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
      clipRule='evenodd'
    />
  </svg>
);
export default LeftNav;
