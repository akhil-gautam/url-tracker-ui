import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';

import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { post } from '../Api';
import SignUpSchema from '../validation_schema/SignUpSchema';
import { Loader } from '../icons';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: '', password: '' });
  const [errs, setErrs] = useState({ email: '', password: '' });
  const [redirect, setRedirect] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const er = {};
    SignUpSchema.validate(data, { abortEarly: false })
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
      const response = await post('users', data);
      setLoading(false);
      if (response.status !== 200) {
        const e = await response.json();
        toast.error(e.message);
      } else {
        setRedirect(true);
      }
    } catch (e) {
      toast.error(e);
    }
  };

  if (redirect) {
    return <Redirect to='/signin' />;
  }

  return (
    <div className='h-full w-full px-2 flex flex-col justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='px-4 md:px-8 py-10 w-full md:w-1/3 rounded-xl shadow-lg border'
      >
        <header className='text-xl text-center text-purple-700 font-medium'>
          SIGN UP
        </header>
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
          autoComplete='new-password'
          onChange={handleChange}
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
          Register
        </Button>
      </form>
      <Link to='/signin' className='mt-6 font-normal text-blue-700 underline'>
        Sign in instead?
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

export default SignUp;
