import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    header: {
      font:"400 20px Kosugi Maru",
      marginTop: "10px",
      marginBottom: "20px"
    }
  }));

const Header = () =>{
  const classes = useStyles();
    
    return <div className={classes.header}><Link href='/'>みんなの絵（文字）日記</Link></div>
}

export default Header;