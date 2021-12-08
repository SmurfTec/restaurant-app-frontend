import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from 'components/Home';
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import theme from 'theme';
import RestaurantDetails from 'components/restaurants/details';
import Login from 'components/common/Login';
import NewRestaurant from 'components/restaurants/newRestaurant';
import EditRestaurant from 'components/restaurants/editRestaurant';
import Menus from 'components/menus';
import NewMenu from 'components/menus/newMenu';
import EditMenu from 'components/menus/editMenu';
import MenuDetails from 'components/menus/details';
const { ThemeProvider } = require('@material-ui/styles');

const App = () => {
  const { user, loading } = useContext(AuthContext);
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        {loading ? (
          <div className='loader'></div>
        ) : (
          <>
            {' '}
            <Navbar />
            <Routes>
              <Route exact path='/' element={<Home />} />
              {!user && <Route exact path='/login' element={<Login />} />}
              {user && (
                <>
                  <Route
                    exact
                    path='/restaurants/new'
                    element={<NewRestaurant />}
                  />
                  <Route
                    exact
                    path='/restaurants/:id/edit'
                    element={<EditRestaurant />}
                  />
                  <Route exact path='/menus' element={<Menus />} />
                  <Route exact path='/menus/new' element={<NewMenu />} />
                  <Route exact path='/menus/:id' element={<MenuDetails />} />
                  <Route exact path='/menus/:id/edit' element={<EditMenu />} />
                </>
              )}
              <Route
                exact
                path='/restaurants/:id'
                element={<RestaurantDetails />}
              />
              {/* <Navigate to='/' /> */}
              <Route path='*' element={<Navigate to='/' />} />
              {/* <Route exact path='/' element={Home} /> */}
            </Routes>
          </>
        )}
      </ThemeProvider>
    </div>
  );
};

export default App;
