import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@material-ui/core';
import { RestaurantsContext } from 'contexts/RestaurantsContext';
import React, { useContext, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router';
import { v4 } from 'uuid';

import useStyles from './detailsStyles';

const RestaurantDetails = () => {
  const { loading, restaurants, getRestaurantById } =
    useContext(RestaurantsContext);
  const [restaurant, setRestaurant] = useState();
  const [error, setError] = useState(false);
  const { id } = useParams();
  const classes = useStyles();

  const theme = useTheme();

  useEffect(() => {
    if (loading) return;

    let el = getRestaurantById(id);
    if (!el) return setError(true);

    setRestaurant(el);
  }, [id, restaurants, getRestaurantById, loading]);

  return (
    <>
      {loading ? (
        <div className='loader'></div>
      ) : error ? (
        <Typography variant='h5' color='error'>
          No Restaurant
        </Typography>
      ) : (
        restaurant && (
          <div className={classes.root}>
            <Carousel
              showThumbs={false}
              animationHandler='fade'
              swipeable={false}
              className={classes.Carousel}
              autoPlay
            >
              {restaurant?.images.map((el) => (
                <Box key={v4()} className={classes.carouselItem}>
                  <img src={el} />
                  <Typography className='legend'>
                    {restaurant.name.toUpperCase()}
                  </Typography>
                </Box>
              ))}
            </Carousel>
            <div
              style={{
                minHeight: '50vh',
                background: '#f2f2f2',
                paddingTop: '3rem',
              }}
            >
              <Container style={{ padding: 0 }}>
                <Box
                  sx={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    marginBottom: '2rem',
                    // width: 500,
                  }}
                >
                  <Typography variant='h4'>{restaurant.name}</Typography>
                  <Typography color='success' variant='h5' fontWeight='normal'>
                    Timings : {restaurant.hours}
                  </Typography>

                  <Typography
                    sx={{ color: '#212b36' }}
                    variant='body1'
                    fontWeight='normal'
                    component='p'
                  >
                    {restaurant.description}
                  </Typography>
                </Box>
                <Typography
                  variant='h4'
                  align='center'
                  style={{ marginBottom: '2rem' }}
                >
                  Meals
                </Typography>
                <Grid container spacing={2}>
                  {restaurant?.meals?.map((meal) => (
                    <Grid item xs={12} sm={4}>
                      <Typography
                        align='center'
                        style={{ marginBottom: '1rem' }}
                        variant='h5'
                      >
                        {meal.name.toUpperCase()}
                      </Typography>
                      {meal?.menu?.items?.map((item) => (
                        <React.Fragment key={item._id}>
                          <Card>
                            {/* <CardMedia image={item.image} title={item.name} /> */}
                            <CardContent className={classes.menuItem}>
                              <Box>
                                <Typography
                                  gutterBottom
                                  variant='h5'
                                  component='h2'
                                >
                                  {item.name}
                                </Typography>
                                <Typography
                                  variant='body2'
                                  color='textSecondary'
                                  component='p'
                                >
                                  {item.description}
                                </Typography>
                                <Typography
                                  variant='h6'
                                  color='textSecondary'
                                  component='p'
                                  style={{ color: theme.palette.success.main }}
                                >
                                  {item.price} $
                                </Typography>
                              </Box>
                              <Box>
                                <img
                                  className={classes.menuItemImg}
                                  src={item.image}
                                />
                                <Typography
                                  variant='h6'
                                  color='textSecondary'
                                  component='p'
                                  fontWeight='normal'
                                  align='right'
                                  style={{ color: theme.palette.warning.main }}
                                >
                                  {item.type}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>

                          <Divider />
                        </React.Fragment>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default RestaurantDetails;
