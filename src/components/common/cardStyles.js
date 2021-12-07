import { makeStyles } from '@material-ui/styles';

const styles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: '#f2f2f2',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    padding: '10px 15px',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountContent: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 20,
  },
  DiscountPrice: {
    backgroundColor: '#fff',
    padding: theme.spacing(1.2),
    borderRadius: 15,
    transform: 'scale(0.9)',
    opacity: 0.5,
    textDecoration: 'line-through solid red',
  },
  Price: {
    backgroundColor: '#fff',
    padding: theme.spacing(1.2),
    borderRadius: 15,
  },
  expireDate: {
    position: 'absolute',
    top: 0,
    left: 0,
    background: '#FE7D6D',
    padding: 7,
    fontSize: 16,
    /* font-weight: bold; */
    borderBottomRightRadius: 12,
    color: '#fff',
  },
  discountSpan: {
    position: 'absolute',
    top: 0,
    right: 0,
    background: '#18D680',
    padding: 7,
    fontSize: 16,
    color: '#fff',
    borderBottomLeftRadius: 12,
  },
  logo: {
    width: 50,
    height: 50,
  },
  description: {
    wordBreak: 'break-word',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
  },
}));

export default styles;
