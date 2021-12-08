import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchBar from 'material-ui-search-bar';

import useStyles from './styles';
import { Box, Button } from '@material-ui/core';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import logo from 'assets/logo.jpg';
import { AuthContext } from 'contexts/AuthContext';
import theme from 'theme';

const Navbar = () => {
  const classes = useStyles();

  const location = useLocation();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchTxt, setSearchTxt] = useState('');
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { logoutUser, user } = useContext(AuthContext);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleSearch = (searchValue) => {
    console.log(`searchValue`, searchValue);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={classes.MobileMenu}
    >
      <MenuItem>
        <Button
          variant='contained'
          className={classes.RegisterBtn}
          onClick={() => navigate('/login')}
        >
          Login / Register
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={`${classes.root}`}>
      <AppBar position='fixed' className={classes.Appbar}>
        <Toolbar>
          <Typography
            variant='h5'
            noWrap
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              minWidth: 160,
              color: '#000',
            }}
            onClick={() => navigate('/')}
          >
            <img
              src={logo}
              style={{ height: 40, width: 40, marginRight: '1rem' }}
            />
            Restaurant App
          </Typography>
          {user && (
            <Typography
              variant='h5'
              style={{
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginLeft: 10,
              }}
            >
              <NavLink
                to='/menus'
                // activeStyle={{
                //   color: 'red',
                // }}
                style={({ isActive }) => ({
                  color: isActive ? theme.palette.primary.main : '#000',
                  textDecoration: 'none',
                })}
              >
                Menus
              </NavLink>
            </Typography>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginInline: 'auto',
            }}
            className={classes.SearchBar}
          >
            {location.pathname === '/' && (
              <SearchBar
                value={searchTxt}
                onChange={(newValue) => setSearchTxt(newValue)}
                onRequestSearch={handleSearch}
                placeholder='Search Restaurants'
                style={{ boxShadow: 'none', border: '1px solid #ccc' }}
              />
            )}
          </div>
          <div className={classes.sectionDesktop}>
            <Box
              display='flex'
              justifyContent='space-around'
              alignItems='center'
              sx={{ marginLeft: 'auto' }}
            >
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexGrow: 1,
                  padding: '0px 20px',
                  flexBasis: '75%',
                }}
              ></Box>
              <Box
                style={{
                  display: 'flex',
                  flexGrow: 1,
                  justifyContent: 'space-around',
                  flexBasis: '25%',
                  maxWidth: 300,
                  minWidth: 200,
                }}
              >
                {user ? (
                  <Button
                    variant='contained'
                    className={classes.RegisterBtn}
                    onClick={logoutUser}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    className={classes.RegisterBtn}
                    onClick={() => navigate('/login')}
                  >
                    Admin Login
                  </Button>
                )}
              </Box>
            </Box>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              style={{
                marginLeft: 'auto',
                color: '#000',
              }}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Box paddingTop={'64px'}> </Box>
    </div>
  );
};
export default Navbar;
