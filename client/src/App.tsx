import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Dashboard, Home, OnBoarding } from './pages';
import { useCookies } from 'react-cookie';

export const App = () => {
  const [cookies, setCookies, removeCookie] = useCookies();
  const authToken = cookies.AuthToken;
  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<Home />} />
          {authToken && <Route path={'/dashboard'} element={<Dashboard />} />}
          {authToken && <Route path={'/onboarding'} element={<OnBoarding />} />}
          {/*<Route path={'*'} element={<NotFound />} />*/}
        </Routes>
      </Router>
    </>
  );
};
