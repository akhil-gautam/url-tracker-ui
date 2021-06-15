import { object, string } from 'yup';

const SignUpSchema = object({
  email: string().email().required(),
  password: string().required().min(8),
});

export default SignUpSchema;
