import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { useNavigate } from 'react-router';
import useStyles from './cardStyles';
import { Box, CardActions, IconButton } from '@material-ui/core';
import { DeleteForever, Edit } from '@material-ui/icons';
import DeleteMenuDialog from 'dialogs/ConfirmDialogBox';
import { useToggle } from 'hooks';

const RestautantCard = ({ menu, user, deleteMenu }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { _id, name, items } = menu;
  const [isDeleteOpen, toggleDeleteOpen] = useToggle(false);

  const handleClick = () => {
    navigate(`/menus/${_id}`);
  };

  const handleDelete = () => {
    toggleDeleteOpen();
    deleteMenu(_id);
  };

  const handleEdit = () => {
    navigate(`/menus/${_id}/edit`);
  };

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            className={classes.cardMedia}
            image={items?.[0]?.image}
            title={name}
          />
          <CardContent className={classes.cardContent}>
            {/* <span className={classes.discountSpan}> {discount}% Off</span> */}

            <section className={classes.content}>
              <Typography variant='h6' component='h2'>
                {name}
              </Typography>
            </section>

            {items.slice(0, 3).map((item) => (
              <Box className={classes.MenuItem}>
                <Box>
                  <Typography
                    variant='body1'
                    component='p'
                    className={classes.description}
                    key={item._id}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant='body1'
                    component='p'
                    className={classes.price}
                    key={item._id}
                  >
                    {item.price} $
                  </Typography>
                </Box>
                <img className={classes.logo} src={item.image} alt='item img' />{' '}
              </Box>
            ))}
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{
            textAlign: 'right',
          }}
        >
          {user && (
            <>
              <IconButton onClick={toggleDeleteOpen}>
                <DeleteForever color='error' />
              </IconButton>
              <IconButton onClick={handleEdit}>
                <Edit color='primary' />
              </IconButton>
            </>
          )}
        </CardActions>
      </Card>
      <DeleteMenuDialog
        open={isDeleteOpen}
        toggleDialog={toggleDeleteOpen}
        success={handleDelete}
        dialogTitle='Delete this Menu ?'
      />
    </>
  );
};
export default RestautantCard;
