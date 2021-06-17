import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SignIn, SignUp, Dashboard } from './pages';

export default function App() {
  return (
    <>
      <div className='h-screen w-full'>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/signin'>
            <SignIn />
          </Route>
          <Route path='/signup'>
            <SignUp />
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
