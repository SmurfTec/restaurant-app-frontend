import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@material-ui/core';
import { MenusContext } from 'contexts/MenusContext';
import React, { useContext, useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router';
import { v4 } from 'uuid';

import useStyles from './detailsStyles';

const MenuDetails = () => {
  const { loading, menus, getMenuById } = useContext(MenusContext);
  const [menu, setMenu] = useState();
  const [itemTypes, setItemTypes] = useState([]);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const classes = useStyles();

  const theme = useTheme();

  useEffect(() => {
    if (loading) return;

    let el = getMenuById(id);
    if (!el) return setError(true);

    setMenu(el);

    // * Get Menu Types
    let types = el.items.map((item) => item.type);
    types = [...new Set(types)];
    // console.log(`types`, types);
    setItemTypes(types);
  }, [id, menus, getMenuById, loading]);

  return (
    <>
      {loading ? (
        <div className='loader'></div>
      ) : error ? (
        <Typography variant='h5' color='error'>
          No Menu
        </Typography>
      ) : (
        menu && (
          <div className={classes.root}>
            <Carousel
              showThumbs={false}
              animationHandler='fade'
              swipeable={false}
              className={classes.Carousel}
              autoPlay
            >
              {menu?.items?.map((item) => (
                <Box key={v4()} className={classes.carouselItem}>
                  <img src={item.image} />
                  <Typography className='legend'>
                    {item.name.toUpperCase()}
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
                  <Typography variant='h4'>{menu.name}</Typography>

                  <Box className={classes.itemTypes}>
                    {itemTypes.map((el) => (
                      <Typography
                        sx={{ color: '#212b36' }}
                        variant='body1'
                        fontWeight='normal'
                        component='span'
                        className={classes.itemType}
                      >
                        {el}
                      </Typography>
                    ))}
                  </Box>
                </Box>
                <Typography
                  variant='h4'
                  align='center'
                  style={{ marginBottom: '2rem' }}
                >
                  Menu Items
                </Typography>
                <Grid container spacing={2}>
                  {menu.items?.map((item) => (
                    <Grid item xs={12} sm={4} key={item._id}>
                      <Card>
                        <CardMedia image={item.image} title={item.name} />
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

export default MenuDetails;
