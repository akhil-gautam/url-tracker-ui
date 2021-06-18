import { useState } from 'react';
import { toast } from 'react-toastify';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import LinkCreateSchema from '../../validation_schema/LinkCreateSchema';
import { getAuthToken, getUserID, post } from '../../Api';

const NewLink = ({ handleModalClose }) => {
  const [data, setData] = useState({
    short_link: '',
    original_link: '',
    title: '',
  });
  const [errs, setErrs] = useState({
    short_link: '',
    original_link: '',
    title: '',
  });

  const handleChange = (e) => {
    if (e.target.name === 'short_link' && e.nativeEvent.data === ' ') return;
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    const er = {};
    LinkCreateSchema.validate(data, { abortEarly: false })
      .then(() => {
        createLink();
      })
      .catch((err) => {
        for (const el in err.inner) {
          if (er[err.inner[el].path]) {
            er[err.inner[el].path] =
              er[err.inner[el].path] + ', ' + err.inner[el].errors.toString();
          } else {
            er[err.inner[el].path] = err.inner[el].errors.toString();
          }
        }
        setErrs(er);
      });
  };

  const createLink = async () => {
    try {
      const response = await post('links', {
        ...data,
        token: getAuthToken(),
        user_id: getUserID(),
      });
      if (response.status !== 200) {
        const e = await response.json();
        toast.error(e.message);
      } else {
        toast.success('Created successfully!', { position: 'top-center' });
        handleModalClose();
      }
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-4/5 mx-auto'>
      <header className='text-lg font-bold text-center'>NEW LINK</header>
      <TextInput
        labelChild='Redirect Link'
        type='text'
        name='original_link'
        onChange={handleChange}
        autoComplete='off'
        value={data.original_link}
        helperChild={errs.original_link}
        helperType='error'
      />

      <TextInput
        labelChild='Title'
        type='text'
        name='title'
        onChange={handleChange}
        autoComplete='off'
        value={data.title}
        helperChild={errs.title}
        helperType='error'
        placeholder='This is optional.'
      />
      <Button
        type='submit'
        variant='outline'
        className='w-full my-8'
        RightIcon={RightArrow}
      >
        CREATE
      </Button>
    </form>
  );
};

const RightArrow = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M13 7l5 5m0 0l-5 5m5-5H6'
    />
  </svg>
);

export default NewLink;
