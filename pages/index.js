import Calendar from './Calendar';
import { useState } from "react";
import PostForm from './post';
import { makeStyles,createTheme } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import firebase from "firebase/app";
import 'firebase/database';
import Link from 'next/link';
import PostList from './PostList';
import Header from '../components/Header';



const font =  "'Yomogi','Kosugi Maru'";
const theme = createTheme(
  {
    typography:{
      fontFamily: font,
    }
  }
);

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  link:{
    margin: '15px 0px 5px 0px',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#F07040',
  }
}));

function Home() {
  const classes = useStyles();
  const [previewDate, setPreviewDate] = useState(new Date());

//   useEffect(() => {
//     fetch('https://vacation1week-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json') // realtime database
//         .then(res => res.json())
//         .then(
//             (result) => {
//                 console.log(result);
//             },
//             (error) => {
//                 console.log(error);
//             }
//         );
// }, []);

  return (
    <div className={classes.root}>
      <Header/>
      <Calendar date={previewDate} setDate={setPreviewDate}/>
      <div className={classes.link}><Link href='/post'>今日の日記を書く</Link></div>
      <PostList date={previewDate} />
    </div>
  );
}

export default Home;
