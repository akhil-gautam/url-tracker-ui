import { useContext } from 'react';

import { ThemeContext } from '../ThemeContext';

const Backdrop = (props) => {
  const {
    theme: { backdrop },
  } = useContext(ThemeContext);

  return <div className={backdrop.base} {...props}></div>;
};

export default Backdrop;
