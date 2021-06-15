import { object, string } from 'yup';

const SignInSchema = object({
  email: string().email().required(),
  password: string().required(),
});

export default SignInSchema;
