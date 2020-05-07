import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),
  },
  dropZone: {
    minHeight: 'auto',
  },
}));

export default useStyles;
