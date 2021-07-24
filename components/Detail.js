import Seo from "./Seo"
import Diary from "./Diary"
import Link from "next/link"
import { makeStyles } from '@material-ui/core';

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
const Detail = ({post}) =>{
    const classes = useStyles()
    console.log({post})
    const imgUrl = "https://og-imagev2.vercel.app/"
    const imgName = post.id+".png"
    const emojiUnicodes = post.emojis.map(emoji => emoji.unicode)
    const emojiJoined = emojiUnicodes.join('&emojis=')
    const query = '?emojis='+emojiJoined
    const reqUrl = imgUrl+imgName+query
    console.log(reqUrl)
  return (
    <div className={classes.root}>
      <Seo
        pageTitle='みんなの絵（文字）日記'
        pageDescription={post.text}
        pageImg={reqUrl}
        pageImgWidth={1386}
        pageImgHeight={790}
      />
      <Diary emojis={post.emojis} name={post.name} text={post.text} timestamp={post.timestamp-18000}/>
      <Link href='/'>トップに戻る</Link>
    </div>
  )
}

export default Detail;