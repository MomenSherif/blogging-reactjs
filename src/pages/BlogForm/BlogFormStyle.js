import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),
  },
  dropZone: {
    minHeight: 'auto',
    backgroundColor: 'transparent',
  },
  submitBtn: {
    marginBottom: theme.spacing(1),
  },
  test: {
    backgroundColor: 'red !important',
    color: 'blue',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default useStyles;
