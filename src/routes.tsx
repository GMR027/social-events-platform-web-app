import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'src/redux/store';
import Home from 'src/pages/home/home';
import About from 'src/pages/about/about';
import EnvironmentVariables from 'src/constants/EnvironmentVariables';
import ChangeLogPage from 'src/pages/changelog/changelog';
import EventDetailPage from 'src/pages/event-detail/event-detail';
import BadgePage from 'src/pages/badge/badge-page';

const env = EnvironmentVariables.getInstance();
const isMobileApp = env.isMobileApp;

const Routes = (): React.ReactElement => {
  return (
    <Router forceRefresh={!isMobileApp}>
      <Switch>
        <Route path='/badge/:badgetId'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><BadgePage /></PersistGate>
          </Provider>
        </Route>
        <Route path='/evento/:eventId'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><EventDetailPage /></PersistGate>
          </Provider>
        </Route>
        <Route path='/about'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><About /></PersistGate>
          </Provider>
        </Route>
        <Route path='/changelog'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><ChangeLogPage /></PersistGate>
          </Provider>
        </Route>
        <Route path='/'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><Home /></PersistGate>
          </Provider>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
