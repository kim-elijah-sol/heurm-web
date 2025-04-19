import { Route, Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import Index from '~/pages/Index';
import Login from '~/pages/login';
import './style/reset.css';

render(
  () => (
    <Router>
      <Route path='/' component={Index} />
      <Route path='/login' component={Login} />
    </Router>
  ),
  document.getElementById('root')!
);
