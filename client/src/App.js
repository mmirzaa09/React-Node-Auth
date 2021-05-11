import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home'; 
import CreatePost from './pages/CreatePost'; 
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {

  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to="/createpost">Create A Post</Link>
          <Link to="/">Home Page</Link>
          <Link to="/login">Login</Link>
          <Link to="/registration">Registration</Link>
        </div>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/createpost" exact component={CreatePost}/>
          <Route path="/post/:id" exact component={Post}/>
          <Route path="/registration" exact component={Register}/>
          <Route path="/login" exact component={Login}/>
        </Switch>
      </Router>  
    </div>
  );
}

export default App;
