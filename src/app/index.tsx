import { Route, Router } from '@solidjs/router';
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';
import { EditFlowPanel } from '~/panel-pages/edit-flow-panel';
import { QueryClientProvider } from './query-client-provider';
import './style/reset.css';
import { ToastPortal } from './toast-portal';

const Login = lazy(() => import('~/pages/login'));

const Main = lazy(() => import('~/pages/main'));

render(
  () => (
    <QueryClientProvider>
      <Router>
        <Route path='/' component={Main} />
        <Route path='/login' component={Login} />
      </Router>
      <EditFlowPanel.Adapter />
      <ToastPortal />
    </QueryClientProvider>
  ),
  document.getElementById('root')!
);
