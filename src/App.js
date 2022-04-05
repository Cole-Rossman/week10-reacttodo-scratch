import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useState } from 'react';

import Auth from './views/Home/Auth';
import TodoList from './views/TodoList/TodoList';
import NavHeader from './components/NavHeader';
import { getUser } from './services/users';


function App() {
  const [currentUser, setCurrentUser] = useState(getUser());
  
  return (
    <BrowserRouter>
      <NavHeader currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className="App">
        <Switch>
          <Route exact path="/">
            {!currentUser ? <Auth setCurrentUser={setCurrentUser}/> : <Redirect to="/todos" /> }
          </Route>
          <Route exact path="/todos">
            {currentUser ? <TodoList /> : <Redirect to="/"/>}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
