import React, { useContext } from 'react';
import { Button, Container, Grid, Box } from '@material-ui/core';

import { Skeleton } from '@material-ui/lab';
import MenuCard from 'components/common/MenuCard';
import { AuthContext } from 'contexts/AuthContext';
import { MenusContext } from 'contexts/MenusContext';
import AddIcon from '@material-ui/icons/Add';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';

import menuImg from 'assets/menucover.jpg';
import Banner from 'components/common/Banner';

const MenusList = () => {
  const { loading, menus, deleteMenu } = useContext(MenusContext);
  const { user } = useContext(AuthContext);

  return (
    <Box>
      <Banner bannerTitle='Menus' imageUrl={menuImg} />
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
            to='/menus/new'
          >
            New Menu
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
            {menus?.map((el) => (
              <Grid item xs={12} sm={4} md={3} key={el._id}>
                <MenuCard menu={el} user={user} deleteMenu={deleteMenu} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default MenusList;
