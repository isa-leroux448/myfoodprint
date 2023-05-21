import React, { useState } from 'react';
import Navbar from './components/navbar'
import LandingPage from './components/landingPage'
import Content from './components/recipeGenerator'

const App = () => {
  return (
    <div>
      <Navbar />
      <LandingPage />
      <Content />
    </div>
  );
};

export default App;
