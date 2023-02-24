import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Dashboard, Home, NotFound, OnBoarding } from './pages';

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/dashboard'} element={<Dashboard />} />
          <Route path={'/onboarding'} element={<OnBoarding />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};
