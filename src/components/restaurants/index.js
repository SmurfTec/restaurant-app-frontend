import { Button, Container, Grid, Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import RestaurantCard from 'components/common/RestaurantCard';
import { AuthContext } from 'contexts/AuthContext';
import { RestaurantsContext } from 'contexts/RestaurantsContext';
import React, { useContext, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';
import SearchBar from 'components/common/SearchBar';

const RestaurantsList = () => {
  const { loading, restaurants, deleteRestaurant } =
    useContext(RestaurantsContext);
  const { user } = useContext(AuthContext);

  const [state, setState] = useState([]);

  useEffect(() => {
    if (!restaurants || loading) return;

    setState(restaurants);
  }, [restaurants]);

  const filterRestaurants = (val) => {
    console.log(`val`, val);
    setState(
      restaurants?.filter((el) => el.name.toLowerCase().indexOf(val) !== -1)
    );
  };

  return (
    <Container>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        {user && (
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            color='secondary'
            component={Link}
            to='/restaurants/new'
          >
            New Restaurant
          </Button>
        )}
        <SearchBar
          title='Search Restaurants'
          handleSearch={filterRestaurants}
        />
      </Box>
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
          {state.map((el) => (
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
