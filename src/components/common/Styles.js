import { makeStyles } from '@material-ui/styles';

const styles = makeStyles((theme) => ({
  Wrapper: {
    height: '100vh',
    width: '100%',
    display: 'relative',
  },
  backgroundImg: {
    display: 'block',
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'absolute',
  },
  Main: {
    backgroundColor: '#f2f2f2',
    width: 350,
    display: 'flex',
    padding: 20,
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    zIndex: 123,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  },
  Header: {
    paddingBlock: 20,
    backgroundColor: '#fff',
    width: '100%',
  },
  Form: {
    padding: '40px 50px 20px',
    width: '100%',
  },

  textInput: {
    width: '100%',
    padding: '9px 20px',
    textAlign: 'left',
    // border: 0,
    outline: 0,
    border: '1px solid #ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
    fontSize: 15,
    fontWeight: 300,
    color: '#8D8D8D',
    webkitTransition: 'all 0.3s ease',
    transition: 'all 0.3s ease',
    marginBottom: 14,
  },
}));

export default styles;
