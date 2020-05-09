import { makeStyles } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';

const useStyles = makeStyles((theme) => ({
  deleteIcon: {
    marginLeft: theme.spacing(1),
    backgroundColor: amber.A400,

    '&:hover': {
      backgroundColor: amber.A700,
    },
  },
}));

export default useStyles;
