import { object, string } from 'yup';

const LinkCreateSchema = object({
  original_link: string().required(),
  title: string(),
});

export default LinkCreateSchema;
