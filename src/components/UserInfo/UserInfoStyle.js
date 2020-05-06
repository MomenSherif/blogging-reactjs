import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  userName: {
    fontWeight: 500,
    marginRight: theme.spacing(2),
  },
  followings: {
    marginRight: theme.spacing(2),
  },
  mb: {
    marginBottom: theme.spacing(1),
  },
  img: {
    height: '100%',
  },
}));

export default useStyles;
