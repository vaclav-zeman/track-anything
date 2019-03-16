import React from 'react';

import './App.css';
import AddForm from './features/AddForm';
import TrackerList from './features/TrackerList';

const App = () => {
  return (
    <>
      <AddForm />

      <TrackerList />
    </>
  );
};

export default App;
