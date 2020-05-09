import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {},
  img: {
    maxWidth: '100%',
    borderRadius: 30,
  },
  wrapText: {
    whiteSpace: 'break-spaces',
    wordBreak: 'break-word',
  },
  tag: {
    marginLeft: 6,
  },
  blogTitle: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default useStyles;
