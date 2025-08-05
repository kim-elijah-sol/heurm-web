import { Route, Router } from '@solidjs/router';
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';
import { EditFlowPanel } from '~/panel-pages/edit-flow-panel';
import { QueryClientProvider } from './query-client-provider';
import { RouterRoot } from './router-root';
import './style/reset.css';
import { ToastPortal } from './toast-portal';

const Login = lazy(() => import('~/pages/login'));

const Main = lazy(() => import('~/pages/main'));

const Analytics = lazy(() => import('~/pages/analytics'));

const Setting = lazy(() => import('~/pages/setting'));

render(
  () => (
    <QueryClientProvider>
      <Router root={RouterRoot}>
        <Route path='/login' component={Login} />
        <Route path='/' component={Main} />
        <Route path='/analytics' component={Analytics} />
        <Route path='/setting' component={Setting} />
      </Router>
      <EditFlowPanel.Adapter />
      <ToastPortal />
    </QueryClientProvider>
  ),
  document.getElementById('root')!
);
