import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import RandomData from './Components/RandomData';
import SearchUsers from './Components/SearchUsers';
import UserForm from './Components/UserForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      {/* @ts-ignore */}
      <Route path="/" exact component={RandomData} />
      <Route path="/search" exact component={SearchUsers} />
      <Route path="/form" exact component={UserForm} />



      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
