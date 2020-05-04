import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(3),
  },
  bg: {
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(3),
  },
}));

export default useStyles;
