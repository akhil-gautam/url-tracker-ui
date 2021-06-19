import { useState } from 'react';
import { toast } from 'react-toastify';

import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import LinkCreateSchema from '../../validation_schema/LinkCreateSchema';
import { getAuthToken, getUserID, post } from '../../Api';
import { Loader, RightArrow } from '../../icons';

const NewLink = ({ refetch, handleModalClose }) => {
  const [loading, setLoading] = useState(false);
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
        refetch();
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
        placeholder='(Required)'
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
        placeholder='(Optional)'
      />
      <Button
        type='submit'
        color={loading ? 'disabled' : 'primary'}
        className='w-full my-8'
        RightIcon={loading ? Loader : RightArrow}
      >
        CREATE
      </Button>
    </form>
  );
};

export default NewLink;
