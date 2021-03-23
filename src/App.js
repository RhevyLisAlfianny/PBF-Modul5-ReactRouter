import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useHistory, Redirect,
  useLocation, useRouteMatch,
  useParams
} from "react-router-dom";

export default function AuthExample(){
  return (
    <Router>
      <div className="App">
          <nav
            className="navbar container"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <b className="navbar-item is-size-4 ">ecommerce</b>
              
            </div>
              <div className= "navbar-menu ">
                <Link to="/home" className="navbar-item">
                  Home
                </Link>
                <Link to="/products" className="navbar-item">
                  Products
                </Link>
              </div>
            </nav>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/login">
                <LoginPage />
              </Route>
              <PrivateRoute path="/products">
                <ProductList />
                <Categories />
              </PrivateRoute>
            </Switch>
          </div>
    </Router>
  );
}
function Home(){
  return (
    <div  className="hero is-primary">
      <div className="hero-body container">
        <h4 className="title">Home</h4>
      </div>
    </div>
  );
}
function ProductList(){
  return (
    <div  className="hero is-primary">
      <div className="hero-body container">
        <h4 className="title">Our Products</h4>
      </div>
    </div>
  );
}
function Categories(){
  let { path, url } = useRouteMatch();
  return (
    <div className="container">
      <b style={{ textTransform: "capitalize" }}>
        Categories
      </b> 
      <ul>
        <li>
          <Link to={`${url}/Dress`}>Baju</Link>
        </li>
        <li>
          <Link to={`${url}/Sneakers`}>Sepatu</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={path}>
          <h3>Please select a Category.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}
function Topic(){
  let {topicId} = useParams();
  return(
    <div className="container">
      <div className="column columns is-multiline">
        <div className=" column is-half">
          <div className="box">
            <div className="media">
              <div className="media-left">
                <figure className="image is-120x120">
                  <img
                    src="https://via.placeholder.com/120" alt="placeholder"
                  />
                </figure>
              </div>
                <b style={{ textTransform: "capitalize" }}>
                  {topicId}
                  <span className="tag is-primary">Rp.200.000</span>
                </b>
            </div>
          </div>
        </div>
        <div className=" column is-half">
          <div className="box">
            <div className="media">
              <div className="media-left">
                <figure className="image is-120x120">
                  <img
                    src="https://via.placeholder.com/120"
                  />
                </figure>
              </div>
              <b style={{ textTransform: "capitalize" }}>
                  {topicId}
                  <span className="tag is-primary">Rp.200.000</span>
              </b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); //fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};
function PrivateRoute({children, ...rest}) {
  return (
    <Route
      {...rest}
      render={({ location }) => 
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname:"/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
function LoginPage(){
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button className="button is-small is-outlined is-primary " onClick={login}>
        Log in
      </button>
    </div>
  );
}
