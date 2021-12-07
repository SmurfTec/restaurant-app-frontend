import { Box, Container } from '@material-ui/core';
import Banner from 'components/common/Banner';
import React from 'react';
import RestaurantsList from 'components/restaurants';
import homeImg from 'assets/home.jpg';

const Home = () => {
  return (
    <Box>
      <Banner bannerTitle='Restaurants' imageUrl={homeImg} />
      <RestaurantsList />
    </Box>
  );
};

export default Home;
