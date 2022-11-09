import type { Component } from 'solid-js';
import { Calendar } from './components/calendar';

import './styles/app.styles.less';

const App: Component = () => {
  return (
    <>
      <Calendar/>
    </>
  );
};

export default App;
