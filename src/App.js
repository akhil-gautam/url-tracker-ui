import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SignIn, SignUp, Dashboard, Redirector } from './pages';

export default function App() {
  return (
    <>
      <div className='w-full py-8 px-2 md:px-0 rounded-3xl md:border border-dashed border-black md:shadow-xl'>
        <Switch>
          <Route path='/signin'>
            <SignIn />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/:id'>
            <Redirector />
          </Route>
          <Route path='/'>
            <Dashboard />
          </Route>
        </Switch>
      </div>
      <ToastContainer />
    </>
  );
}
