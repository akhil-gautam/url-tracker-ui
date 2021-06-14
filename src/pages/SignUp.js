import { useState, useCallback } from 'react'

import TextInput from '../components/TextInput'
import Button from '../components/Button'

const SignUp = () => {
  const [data, setData] = useState({ email: '', password: '' })

  const handleChange = useCallback(
    (e) => {
      setData({ ...data, [e.target.name]: e.target.value })
    },
    [data]
  )
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      console.log(data)
    },
    [data]
  )

  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <form
        onSubmit={handleSubmit}
        className='px-8 py-10 w-1/3 rounded-xl space-y-8 shadow-lg border'
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
          autoComplete='new-password'
          onChange={handleChange}
          value={data.password}
          helperChild='Note: You can right click and choose Suggest Password!'
        />
        <Button
          type='submit'
          variant='outline'
          className='w-full'
          RightIcon={RightArrow}
        >
          Register
        </Button>
      </form>
      <a href='/signin' className='mt-6 font-normal text-blue-700 underline'>
        Sign in instead?
      </a>
    </div>
  )
}

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
)

export default SignUp
