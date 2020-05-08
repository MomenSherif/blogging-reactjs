import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    '& > *': {
      marginBottom: theme.spacing(3),
    },
  },
  inputsContainer: {
    marginBottom: theme.spacing(5),
  },
}));

export default useStyles;
