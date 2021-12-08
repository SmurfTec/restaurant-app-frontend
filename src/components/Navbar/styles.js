import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  Appbar: {
    // backgroundColor: '#1462aa',
    backgroundColor: '#fff',
    // color: '#B033fa',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    cursor: 'pointer',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  NavItem: {
    display: 'block',
    color: '#000',
    cursor: 'pointer',
    fontWeight: 700,
    textDecoration: 'none',
    fontSize: 17,
    '&:hover': {
      // borderBottom: '2px solid #B033fa',
      color: 'deepskyblue',
      transition: '0.3s',
    },
  },
  darkBtn: {
    overflow: 'unset !important',
    '&button': {},
  },
  RegisterBtn: {
    '&.MuiButton-contained': {
      borderRadius: 20,
      color: '#fff',
      transition: '0.6s',
      backgroundColor: theme.palette.primary.light,
    },
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },

  sectionMobile: {
    display: 'flex',
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  MobileMenu: {
    height: 500,
  },
  SearchBar: {
    '&.MuiPaper-root': {
      boxShadow: 'none',
    },
  },
}));

export default useStyles;
