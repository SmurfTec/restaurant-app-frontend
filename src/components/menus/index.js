import React, { useContext, useState, useEffect } from 'react';
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
import SearchBarComponent from 'components/common/SearchBar';

const MenusList = () => {
  const { loading, menus, deleteMenu } = useContext(MenusContext);
  const { user } = useContext(AuthContext);

  const [state, setState] = useState([]);

  useEffect(() => {
    if (!menus || loading) return;

    setState(menus);
  }, [menus]);

  const filterMenus = (val) => {
    console.log(`val`, val);
    setState(menus?.filter((el) => el.name.toLowerCase().indexOf(val) !== -1));
  };

  return (
    <Box>
      <Banner bannerTitle='Menus' imageUrl={menuImg} />
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
              style={{
                marginBottom: '2rem',
              }}
              component={Link}
              to='/menus/new'
            >
              New Menu
            </Button>
          )}
          <SearchBarComponent title='Search Menus' handleSearch={filterMenus} />
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
            {state?.map((el) => (
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
