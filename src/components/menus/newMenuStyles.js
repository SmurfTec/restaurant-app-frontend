const { makeStyles } = require('@material-ui/core');

const styles = makeStyles((theme) => ({
  FormBox: {
    width: 500,
    margin: 'auto',
    padding: 20,
    border: '1px solid #ccc',
    background: '#fff',
  },
  MenuItem: {
    padding: 10,
    border: '1px solid #ccc',
    margin: '10px 0px',
  },
}));

export default styles;
