import { Button, Container, Grid } from '@material-ui/core';
import { PlusOne } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import RestaurantCard from 'components/common/RestaurantCard';
import { AuthContext } from 'contexts/AuthContext';
import { RestaurantsContext } from 'contexts/RestaurantsContext';
import React, { useContext } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';

const RestaurantsList = () => {
  const { loading, restaurants, deleteRestaurant } =
    useContext(RestaurantsContext);
  const { user } = useContext(AuthContext);

  return (
    <Container>
      {user && (
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          color='secondary'
          style={{
            marginBottom: '2rem',
          }}
          component={Link}
          to='/restaurants/new'
        >
          New Restaurant
        </Button>
      )}
      {loading ? (
        <Grid container spacing={2}>
          {Array(5)
            .fill()
            .map(() => (
              <Grid item xs={12} sm={4} md={3} key={v4()}>
                <Skeleton height={300} />
              </Grid>
            ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {restaurants?.map((el) => (
            <Grid item xs={12} sm={4} md={3} key={el._id}>
              <RestaurantCard
                restaurant={el}
                user={user}
                deleteRestaurant={deleteRestaurant}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default RestaurantsList;
