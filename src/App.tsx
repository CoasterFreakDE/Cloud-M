import './App.scss';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CallbackFactory } from './util/CallbackFactory';
import { LanguageSystem } from './util/LanguageSystem';

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ToastFactory from './util/ToastFactory';
import Dashboard from './pages/Dashboard';

type LangState = {
  loaded: boolean
}

export default class AppBase extends React.Component<{}, LangState> {

  componentDidMount() {
    this.setState({ loaded: false });
    CallbackFactory.getInstance().addCallback("languageLoaded", () => {
      this.setState({ loaded: true });
    })
    LanguageSystem.getInstance()
  }

  render() { 
    const loaded = this.state?.loaded || false
      return (
        <div>
          {
            loaded ? <>
              <ToastFactory></ToastFactory>
              <Dashboard />
               </>
              : <div className="fallbackContainer"><Loader
              type="TailSpin"
              color="#00BFFF"
              height={100}
              width={100}
            /></div>
          }
        </div>
      );
  }
}
