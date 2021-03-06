import 'emoji-mart/css/emoji-mart.css'
import { Emoji, Picker } from 'emoji-mart'
import { useReducer, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { CardContent, Paper, Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import Diary from '../components/Diary';
import DiaryPreview from '../components/DiaryPreview'
import PostButton from '../components/PostButton';
import Header from '../components/Header';
import Loading from '../components/Loading';

let isSm = false;

if (typeof window !== "undefined") {
    isSm = window.innerWidth<600?true:false
  }
const emojiSize =  isSm?48:64;

const reducer = (state,action) =>{
    state[action.currentNo] = action.emoji
    const newState = [...state] //stateそのまま返すと再レンダリングが走らない
    return newState
}


const useStyles = makeStyles((theme) => ({
    root: {
        height: '95%',
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'space-around'

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
        height: '85%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    emojiContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30,
        width: '75%',
        height: '35%',
        border: 'solid 2px',
        borderRadius: 8
    },
    emoji: {
        height: emojiSize,
        width: emojiSize,
        marginLeft: 10,
        marginRight: 10,
    },
    emojiButton: {
        background: 'transparent',
        border: '0px',
        height: emojiSize+10,
        width: emojiSize+10,
    },
    diaryTextRoot:{
        width:"100%",
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    diaryTextInput:{
        width:"80%",
        font:"400 20px Noto Sans JP",
        marginTop: 20,
        marginBottom: 20
    },
    statement:{
      width:'80%',
      margin:'0 auto',
      marginBottom:10,
    },
    button:{
      marginTop:14,
      marginBottom:14,
      font:"400 16px Kosugi Maru",
    },
    event:{
      height:'100vh',
      width:'100vw',
      position:'absolute',
    }
  }));

const setDefaultEmoji = () =>{
  const now = new Date()
  const month = now.getMonth()
  const date = now.getDate()
  if(month==9 && date==31){
    return [{id:"jack_o_lantern",unicode:"🎃"},{id:"jack_o_lantern",unicode:"🎃"},{id:"jack_o_lantern",unicode:"🎃"}]
  }
  if(month==11 && (date==24 || date==25)){
    return [{id:"christmas_tree",unicode:"🎄"},{id:"santa",unicode:"🎅"},{id:"gift",unicode:"🎁"}]
  }
  if(month >= 2 && month <=4){
    return [{id:"dolls",unicode:"🎎"},{id:"cherry_blossom",unicode:"🌸"},{id:"mortar_board",unicode:"🎓"}]
  }
  if(month >= 5 && month <=7){
    return [{id:"watermelon",unicode:"🍉"},{id:"beach_with_umbrella",unicode:"🏖️"},{id:"shaved_ice",unicode:"🍧"}]
  }
  if(month >= 8 && month <=10){
    return [{id:"fallen_leaf",unicode:"🍂"},{id:"eggplant",unicode:"🍆"},{id:"rice_scene",unicode:"🎑"}]
  }
  if(month == 11 || month <=1){
    return [{id:"tangerine",unicode:"🍊"},{id:"snowman",unicode:"☃️"},{id:"skier",unicode:"⛷️"}]
  }
  return [{id:"watermelon",unicode:"🍉"},{id:"beach_with_umbrella",unicode:"🏖️"},{id:"shaved_ice",unicode:"🍧"}]
}
  

const PostForm = () =>{
    const classes = useStyles();

    const [currentNo, setCurrentNo] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isShowPreview, setIsShowPreview] = useState(false);
    const [isLoading ,setIsLoading] = useState(false);
    const [emojis, setEmoji] = useReducer(reducer,setDefaultEmoji())
    const { register,formState: { errors } ,watch, handleSubmit, getValues,} = useForm({mode: 'onChange',});
    const onSubmit = data => console.log(data);
    

    useEffect(() => {
      if(document.getElementById('event')){
        document.getElementById('event').addEventListener("click", handleDocumentClick, false);;
      }
      },[currentNo]);

      const handleDocumentClick = event => {
        let isEmojiClassFound = false;
    
        event &&
          event.path &&
          event.path.forEach(elem => {
            if (elem && elem.classList) {
              const data = elem.classList.value;
              if (data.includes("emoji")) {
                isEmojiClassFound = true;
              }
            }
          }); // end
        if ( isEmojiClassFound === false && event.target.id !== "emojis-btn")
          setCurrentNo(false);
      };

    // useEffect(()=>{
    //   if(!watch('name')){
    //     console.log(watch('name'))
    //     setIsEmpty(false);
    //   }
    // },[watch('name'),watch('diary')])

    const isNotEmpty = watch('name')&&watch('diary')

    const onEmojiSelect = (action) =>{
        setEmoji(action)
        setCurrentNo(false);
    }

    const onEmojiClick = (id,e) =>{
      if(e){
        setPosition({ x: e.clientX, y: e.clientY });
      }
        setCurrentNo(id)
    }

    
    
    return <div className={classes.root}><Header/>
    {isLoading ? <Loading/> : 
    isShowPreview?
    <><DiaryPreview name={getValues("name")} emojis={emojis} text={getValues("diary")} timestamp={Math.floor(Date.now() / 1000)-18000} isShow={isShowPreview} setIsShow={setIsShowPreview} />
    <PostButton className={classes.button} getValues={getValues} emojis={emojis} disabled={errors.name || errors.diary ||!isNotEmpty} setIsLoading={setIsLoading}></PostButton></>
      :
    <>
    <Paper elevation={5} className={classes.paper}>
    <div className = {classes.emojiContainer}>
        <button onClick = {(e) => onEmojiClick(0,e)} className={classes.emojiButton}><Emoji emoji={emojis[0]} size={emojiSize} className={classes.emoji} set='twitter'/></button>
        <button onClick = {(e) => onEmojiClick(1,e)} className={classes.emojiButton}><Emoji emoji={emojis[1]} size={emojiSize} className={classes.emoji} set='twitter'/></button>
        <button onClick = {(e) => onEmojiClick(2,e)} className={classes.emojiButton}><Emoji emoji={emojis[2]} size={emojiSize} className={classes.emoji} set='twitter'/></button>
    </div>
    <span>
        絵文字をタップして変更しよう！
      </span>
        {currentNo!==false && 
                <Picker
                onSelect={emoji => onEmojiSelect({currentNo:currentNo,emoji:{id:emoji.id,unicode:emoji.native}})}
                i18n={{
                search: '検索',
                categories: {
                    search: '検索結果',
                    recent: 'よく使う絵文字',
                    people: '顔 & 人',
                    nature: '動物 & 自然',
                    foods: '食べ物 & 飲み物',
                    activity: 'アクティビティ',
                    places: '旅行 & 場所',
                    objects: 'オブジェクト',
                    symbols: '記号',
                    flags: '旗',
                    custom: 'カスタム',
                },
                }}
                set="twitter"
                style={isSm?{
                    position: 'absolute',
                    zIndex: '1',
                    top: `${position.y + 50}px`,
                    }:{
                    position: 'absolute',
                    zIndex: '1',
                    left: `${position.x - 169}px`,
                    top: `${position.y + 50}px`,
                    }}
                title={`${currentNo+1}つ目の絵文字`}
                />}
        <form onSubmit={handleSubmit(onSubmit)}>
    <div className={classes.diaryTextRoot}>
      <input className={classes.diaryTextInput} placeholder="お名前（９文字まで）" {...register("name",{
              required: true,
              maxLength: {
                value: 9,
                message: '9文字以内で入力してください',
              },
              minLength: {
                value: 1,
                message: '名前を入力してください'
              }
            })}/>
      <span>
        {errors.name?.type === 'minLength' && "名無しだよ！"}
        {errors.name?.type === 'maxLength' && "名前が長すぎます！"}
        {errors.name?.type === 'required' && "名無しだよ！"}
      </span>
      <textarea className={classes.diaryTextInput} placeholder="日記を書こう！（５０文字まで）" {...register("diary",{
              required: '必須項目です',
              maxLength: {
                value: 50,
                message: '50文字以内で入力してください',
              },
              minLength: {
                value: 1,
                message: '日記を入力してください'
              }
            })} cols="40" rows="4" />
      <span>
        {errors.diary?.type === 'minLength' && "日記を書いてね！"}
        {errors.diary?.type === 'maxLength' && "日記が長すぎます！"}
        {errors.diary?.type === 'required' && "日記を書いてね！"}
      </span>
    </div>
    </form>
    <div className={classes.statement}>日付は午前5時に切り替わります。<br/>（0～5時に書かれた日記は前日の日記として投稿されます）</div>
    </Paper>
    {currentNo!==false&&<div id="event" className={classes.event}/>}
    <Button className={classes.button} onClick={()=>{setIsShowPreview(true)}} disabled={errors.name || errors.diary ||!isNotEmpty} variant="contained">
      プレビュー
    </Button>
    <PostButton className={classes.button} getValues={getValues} emojis={emojis} disabled={errors.name || errors.diary ||!isNotEmpty} setIsLoading={setIsLoading}></PostButton>
    </>}
    </div>

}

export default PostForm