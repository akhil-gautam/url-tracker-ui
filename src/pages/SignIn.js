import { useState } from 'react';
import { Link } from 'react-router-dom';

import TextInput from '../components/TextInput';
import Button from '../components/Button';

const SignIn = () => {
  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <div className='h-full w-full px-2 flex flex-col justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='px-4 md:px-8 py-10 w-full md:w-1/3 rounded-xl shadow-lg border'
      >
        <TextInput
          labelChild='Email'
          value={data.email}
          onChange={handleChange}
          name='email'
          type='email'
        />
        <TextInput
          labelChild='Password'
          type='password'
          name='password'
          onChange={handleChange}
          autoComplete='off'
          value={data.password}
        />
        <Button
          type='submit'
          variant='outline'
          className='w-full my-8'
          RightIcon={RightArrow}
        >
          Sign In
        </Button>
      </form>
      <Link to='/signup' className='mt-6 font-normal text-blue-700 underline'>
        Register instead?
      </Link>
    </div>
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

export default SignIn;
