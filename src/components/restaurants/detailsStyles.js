const { makeStyles } = require('@material-ui/styles');

const styles = makeStyles((theme) => ({
  root: {},
  Carousel: {
    '& img': {
      height: 300,
      objectFit: 'cover',
    },
  },
  carouselItem: {
    '& p': {
      fontSize: '20px !important',
      opacity: '1 !important',
    },
  },
  menuItem: {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemImg: {
    height: 100,
    width: 140,
    objectFit: 'cover',
  },
}));

export default styles;
