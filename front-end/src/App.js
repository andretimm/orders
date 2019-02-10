import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/*}<Route path="/" exact component={Login} />{*/}
          <Route path="/" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;