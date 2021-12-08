import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { useNavigate } from 'react-router';
import useStyles from './cardStyles';
import { CardActions, IconButton } from '@material-ui/core';
import { DeleteForever, Edit } from '@material-ui/icons';
import DeleteRestaurantDialog from 'dialogs/ConfirmDialogBox';
import { useToggle } from 'hooks';

const RestautantCard = ({ restaurant, user, deleteRestaurant }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { _id, name, images, hours, logo, description, meals } = restaurant;
  const [isDeleteOpen, toggleDeleteOpen] = useToggle(false);

  const handleClick = () => {
    navigate(`/restaurants/${_id}`);
  };

  const handleDelete = () => {
    toggleDeleteOpen();
    deleteRestaurant(_id);
  };

  const handleEdit = () => {
    navigate(`/restaurants/${_id}/edit`);
  };

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            className={classes.cardMedia}
            image={images?.[0]}
            title={name}
          />
          <CardContent className={classes.cardContent}>
            {/* <span className={classes.discountSpan}> {discount}% Off</span> */}
            <span className={classes.discountSpan}>{hours}</span>
            <section className={classes.content}>
              <img className={classes.logo} src={logo} alt='logo' />{' '}
              <Typography variant='h6' component='h2'>
                {name}
              </Typography>
            </section>

            <Typography
              variant='body1'
              component='p'
              className={classes.description}
            >
              {description}
            </Typography>
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
      <DeleteRestaurantDialog
        open={isDeleteOpen}
        toggleDialog={toggleDeleteOpen}
        success={handleDelete}
        dialogTitle='Delete this Restaurant ?'
      />
    </>
  );
};
export default RestautantCard;
