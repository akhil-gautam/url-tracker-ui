import { object, string } from 'yup';

const LinkEditSchema = object({
  short_link: string().required(),
  original_link: string().required(),
  title: string(),
});

export default LinkEditSchema;
