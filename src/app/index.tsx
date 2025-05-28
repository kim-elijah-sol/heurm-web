import { Route, Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import Login from '~/pages/login';
import Main from '~/pages/main';
import { QueryClientProvider } from './query-client-provider';
import './style/reset.css';
import { ToastPortal } from './toast-portal';

render(
  () => (
    <QueryClientProvider>
      <Router>
        <Route path='/' component={Main} />
        <Route path='/login' component={Login} />
      </Router>
      <ToastPortal />
    </QueryClientProvider>
  ),
  document.getElementById('root')!
);
