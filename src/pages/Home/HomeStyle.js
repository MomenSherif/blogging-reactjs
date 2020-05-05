import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),

    '& > *': {
      marginBottom: theme.spacing(3),
    },
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
}));

export default useStyles;
