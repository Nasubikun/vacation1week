import Calendar from '../components/Calendar';
import { useState } from "react";
import PostForm from './post';
import { makeStyles,createTheme } from '@material-ui/core/styles';
import { AppBar, TextField } from '@material-ui/core';
import firebase from "firebase/app";
import 'firebase/database';
import Link from 'next/link';
import PostList from '../components/PostList';
import Header from '../components/Header';
import { parseISO } from 'date-fns'; 
import { Emoji } from 'emoji-mart';



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
  },
  search:{
    display:'flex',
    flexDirection:'row',
    alignItems:'flex-end',
  }
}));

function Home() {
  const classes = useStyles();
  const [previewDate, setPreviewDate] = useState(new Date(new Date().getTime()-18000000));
  const [previewName, setPreviewName] = useState("");

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
      <div className={classes.search}><Emoji emoji="mag" size={28} /><TextField label="名前で日記を検索！(実験的機能)" onChange={(event) => setPreviewName(event.target.value)}/></div>
      <PostList date={previewDate} previewName={previewName} />
    </div>
  );
}

export default Home;
