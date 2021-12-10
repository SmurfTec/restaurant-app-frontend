import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const styles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    //   backgroundColor: theme.palette.grey[800],
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: (props) => `url(${props.imageUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    // backgroundPosition: (props) => props.align,
    minHeight: 280,
    [theme.breakpoints.down('sm')]: {
      minHeight: 200,
    },
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    position: 'absolute',
    bottom: 20,
    left: 65,
    textShadow: '0px 0px 5px rgba(0,0,0,0.38)',
    textTransform: 'uppercase',
  },
}));

const Banner = (props) => {
  const classes = styles(props);

  return (
    <div className={classes.heroContent}>
      <Box className={classes.mainFeaturedPost}>
        <section className={classes.title}>
          <Typography variant='h3'>{props.bannerTitle}</Typography>
        </section>
      </Box>
    </div>
  );
};

export default Banner;
