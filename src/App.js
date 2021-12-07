import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from 'components/Home';
import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import theme from 'theme';
import RestaurantDetails from 'components/restaurants/details';
const { ThemeProvider } = require('@material-ui/styles');

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route
            exact
            path='/restaurants/:id'
            element={<RestaurantDetails />}
          />
          {/* <Route exact path='/' element={Home} /> */}
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
