import React from 'react';
import Main from './components/Main';
import { MainProvider } from './hooks/useMain';

const App = () => {
  return (
    <MainProvider>
      <Main />
    </MainProvider>
  );
};

export default App;
