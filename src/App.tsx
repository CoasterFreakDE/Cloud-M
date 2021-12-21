import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { CallbackFactory } from './util/CallbackFactory';
import { LanguageSystem } from './util/LanguageSystem';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ToastFactory from './util/ToastFactory';
import Dashboard from './pages/Dashboard';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Login } from './pages/Login';

export default class AppBase extends React.Component<{}, {}> {

  componentDidMount() {
    this.setState({ loaded: false });
    CallbackFactory.getInstance().addCallback("languageLoaded", () => {
      
    })
    LanguageSystem.getInstance()
  }

  render() { 
      return (
        <div>
          {
            <>
              <ToastFactory></ToastFactory>
              <Router>
                <Switch>
                  <Route exact path='/' component={Dashboard} />
                  <div className="auth-wrapper">
                    <div className="auth-inner">
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Dashboard} />
                    </div>
                 </div>
                </Switch>
              </Router>
            </>
          }
        </div>
      );
  }
}
