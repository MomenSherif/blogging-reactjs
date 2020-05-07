import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    wordBreak: 'break-word',
    fontWeight: 'bold',
  },
  author: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  heroImage: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    marginBottom: theme.spacing(5),
    height: '40vw',

    [theme.breakpoints.down('sm')]: {
      height: '60vw',
    },
  },
  content: {
    marginBottom: theme.spacing(3),
  },
  tag: {
    marginLeft: 6,
  },
}));

export default useStyles;
