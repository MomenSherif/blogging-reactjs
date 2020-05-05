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
    cursor: 'pointer',
  },
  blogTitle: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

export default useStyles;
