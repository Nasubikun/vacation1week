import { useMemo } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, Paper } from '@material-ui/core';
import 'emoji-mart/css/emoji-mart.css'
import { Emoji, Picker } from 'emoji-mart'

let isSm = false;

if (typeof window !== "undefined") {
    isSm = window.innerWidth<600?true:false
  }

const emojiSize =  isSm?48:64;
console.log(emojiSize)
const useStyles = makeStyles((theme) => ({
    root: {
        height: 540,
        minWidth: 350,
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   '& > *': {
    //     margin: theme.spacing(1),
    //     width: theme.spacing(16),
    //     height: theme.spacing(16),
    //   },
    },
    paper: {
        width: "90%",
        margin: '0 auto',
        marginTop: 20,
        height: '95%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFF8DC',
    },
    emojiContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 5,
        width: '75%',
        height: '30%',
        border: 'solid 2px',
        borderRadius: 8
    },
    emoji: {
        height: emojiSize,
        width: emojiSize,
        marginLeft: 10,
        marginRight: 10,
    },
    diaryTextContainer:{
        width:"100%",
        display:'flex',
        flexDirection:'row-reverse',
        flexShrink:0,
        marginTop: 10,
    },
    diaryDate:{
        font:"400 20px Yomogi",
        marginRight: 20,
        marginLeft: 8,
        marginTop: 30,
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
        // backgroundSize: '100% 2em',
    },
    diaryNameTitle:{
        font:"400 20px Noto Sans JP",
        marginBottom: 4,
        writingMode: 'vertical-rl',
        // backgroundSize: '100% 2em',
    },
    diaryNameContainer:{
        width: '2rem',
        marginTop: 55,
        marginBottom: 20,
        marginLeft: 0,
        // backgroundSize: '100% 2em',
    },
    diaryText:{
        font:"400 20px Yomogi",
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
        // backgroundSize: '100% 2em',
    },
    diaryName:{
        font:"400 20px Yomogi",
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
        // backgroundSize: '100% 2em',
    },
    diaryText:{
        width:"80%",
        font:"400 20px Yomogi",
        marginTop: 20,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row-reverse'
        // backgroundSize: '100% 2em',
    },
    diaryLiner:{
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
        background: 'linear-gradient(90deg, #ccc 1px, transparent 1px)',
    },
    diaryLinerFirst:{
        writingMode: 'vertical-rl',
        textOrientation: 'upright',
        paddingRight: '0.2em',
        marginRight: '0em',
        background: 'linear-gradient(90deg, #ccc 1px, transparent 1px)',

    }
  }));

const timestamp2dateStr = (timestamp) =>{
    console.log(timestamp)
    // const date = new Date(new Date(timestamp*1000-18000000).toLocaleString({ timeZone: 'Asia/Tokyo' }));
    const date = new Date(timestamp*1000-18000000)
    return `${date.getMonth()+1}???${date.getDate()}???`
}

const Diary = ({name,emojis,text,timestamp}) =>{
    console.log({timestamp})

    const alignPTags = (text) =>{
        let splitted = [""]
        if(text){
            for (let i = 0; i < text.length; i+=10) {
                splitted.push(text.slice(i, i+10));
                if(splitted.length>5) break;
            }
        }
        // while(splitted.length<5){
        //     splitted.push("")
        // }
        const dst =  splitted.map((item,idx)=>{
            return idx!==1?<p className={classes.diaryLiner}>{item}</p>:<p className={classes.diaryLinerFirst}>{item}</p>})
        return dst
    }

    const classes = useStyles();

    const Inside = useMemo(()=>{
        return <Paper elevation={5} className={classes.paper}>
        <div className = {classes.emojiContainer}>
            <Emoji emoji={emojis[0]} size={emojiSize} className={classes.emoji} set='twitter'/>
            <Emoji emoji={emojis[1]} size={emojiSize} className={classes.emoji} set='twitter'/>
            <Emoji emoji={emojis[2]} size={emojiSize} className={classes.emoji} set='twitter'/>
        </div>
        <div className={classes.diaryTextContainer}>
        <div className={classes.diaryDate}>{timestamp2dateStr(timestamp)}</div>
        <div className={classes.diaryNameContainer}>
        <div className={classes.diaryNameTitle}>?????????</div>
        <div className={classes.diaryName}>{name}</div>
        </div>
        <div className={classes.diaryText} >{alignPTags(text)} </div>
        </div>
        </Paper>
    })

    return <div className={classes.root}>
        {Inside}
    </div>
}

export default Diary;