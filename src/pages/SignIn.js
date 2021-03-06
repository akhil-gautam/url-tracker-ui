import { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import TextInput from '../components/TextInput';
import Button from '../components/Button';
import {
  post,
  saveAuthToken,
  getAuthToken,
  saveEmail,
  saveUserId,
} from '../Api';

import { Loader } from '../icons';

import SignInSchema from '../validation_schema/SignInSchema';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: '', password: '' });
  const [errs, setErrs] = useState({ email: '', password: '' });
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const token = getAuthToken() || '';
    token.length > 0 && setRedirect(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const er = {};
    SignInSchema.validate(data, { abortEarly: false })
      .then(() => {
        // implementing API call here
        createUser();
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

  const createUser = async () => {
    try {
      setLoading(true);
      const response = await post('login', data);
      setLoading(false);
      if (response.status !== 200) {
        const e = await response.json();
        toast.error(e.message);
      } else {
        const readableResponse = await response.json();
        saveAuthToken(readableResponse.token);
        saveEmail(readableResponse.email);
        saveUserId(readableResponse.id);
        setRedirect(true);
      }
    } catch (e) {
      toast.error(e);
    }
  };

  if (redirect) {
    return <Redirect to='/' />;
  }

  return (
    <div className='h-full w-full px-2 flex flex-col justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='px-4 md:px-8 py-10 w-full md:w-1/3 rounded-xl shadow-lg border'
      >
        <header className='text-xl text-center text-purple-700 font-medium'>SIGN IN</header>
        <TextInput
          labelChild='Email'
          value={data.email}
          onChange={handleChange}
          name='email'
          type='email'
          helperChild={errs.email}
          helperType='error'
        />
        <TextInput
          labelChild='Password'
          type='password'
          name='password'
          onChange={handleChange}
          autoComplete='off'
          value={data.password}
          helperChild={errs.password}
          helperType='error'
        />
        <Button
          type='submit'
          color={loading ? 'disabled' : 'primary'}
          className='w-full my-8'
          RightIcon={loading ? Loader : RightArrow}
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
