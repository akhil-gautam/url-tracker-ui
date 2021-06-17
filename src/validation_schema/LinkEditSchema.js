import { object, string } from 'yup';

const LinkEditSchema = object({
  short_link: string().required(),
  original_link: string()
    .matches(
      /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
      'Enter correct url!'
    )
    .required(),
  title: string(),
});

export default LinkEditSchema;
