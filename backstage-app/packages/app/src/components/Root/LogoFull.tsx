import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  svg: {
    width: 'auto',
    height: 30,
  },

}));
const LogoFull = () => {
  const classes = useStyles();

  return (
  
     <img  className={classes.svg} src="/android-chrome-192x192.png" alt="Logo" />
  );
};

export default LogoFull;
