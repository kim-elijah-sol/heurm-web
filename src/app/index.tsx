import { Route, Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import Login from '~/pages/login';
import Main from '~/pages/Main';
import './style/reset.css';

render(
  () => (
    <Router>
      <Route path='/' component={Main} />
      <Route path='/login' component={Login} />
    </Router>
  ),
  document.getElementById('root')!
);
