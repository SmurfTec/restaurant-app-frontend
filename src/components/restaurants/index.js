import { Container, Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import RestaurantCard from 'components/common/RestaurantCard';
import { RestaurantsContext } from 'contexts/RestaurantsContext';
import React, { useContext } from 'react';

const RestaurantsList = () => {
  const { loading, restaurants } = useContext(RestaurantsContext);
  return (
    <Container>
      {loading ? (
        <Skeleton />
      ) : (
        <Grid container spacing={2}>
          {restaurants?.map((el) => (
            <Grid item xs={12} sm={4} md={3} key={el._id}>
              <RestaurantCard restaurant={el} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default RestaurantsList;
