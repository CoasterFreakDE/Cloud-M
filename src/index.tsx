import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.scss';
import AppBase from './App';

import './pages/styles/colors.scss'

ReactDOM.render(
  <BrowserRouter>
    <AppBase />
  </BrowserRouter>,
  document.getElementById('root')
);

