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
      <div style={{marginBottom: 1000}}></div>
    </div>
  );
};

export default App;
