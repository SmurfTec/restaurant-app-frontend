import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { useNavigate } from 'react-router';
import useStyles from './cardStyles';
import { List, ListItem, ListItemText } from '@material-ui/core';

const FlashCard = ({ restaurant }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { _id, name, images, hours, logo, description, meals } = restaurant;

  const handleClick = () => {
    navigate(`/restaurants/${_id}`);
  };

  return (
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
            <Typography variant='h5' component='h2'>
              {name}
            </Typography>
          </section>
          {/* <List variant='body1' component='p' align='center'>
            {meals?.map((el) => (
              <ListItem sx={{ paddingBlock: 0, marginBlock: 0 }}>
                <ListItemText>{el.name}</ListItemText>
              </ListItem>
            ))}
          </List> */}
          <Typography
            variant='body1'
            component='p'
            className={classes.description}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default FlashCard;
