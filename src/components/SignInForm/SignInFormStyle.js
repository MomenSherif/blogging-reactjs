import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
  },
  manIcon: {
    marginLeft: theme.spacing(1),
    height: 50,
    verticalAlign: 'middle',
  },
  submitBtn: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
