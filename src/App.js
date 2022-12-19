import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./store";
import './App.css';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import setAuthToken from './utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import { logoutUser, setCurrentUser } from './actions/authActions';
import PrivateRoute from './components/PrivateRoute';

// check for token to keep user logged in
if (localStorage.jwtToken) {
  // set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // decode token and get user info and expiration
  const decoded = jwtDecode(token);

  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Landing />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
