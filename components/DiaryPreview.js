import { makeStyles,Button } from "@material-ui/core";
import Diary from "./Diary";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '95%',
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'space-around'
    },
    button:{
        marginTop:14,
        marginBottom:14,
        font:"400 16px Kosugi Maru",
    }
  }));

const DiaryPreview = ({name,emojis,text,timestamp,isShow,setIsShow}) =>{
    const classes = useStyles();
    return <div className={classes.root}><Diary name={name} emojis={emojis} text={text} timestamp={timestamp}/><Button className={classes.button} onClick={()=>setIsShow(false)} variant="contained">編集に戻る</Button></div>

}

export default DiaryPreview;