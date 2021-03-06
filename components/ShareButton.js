import { useRouter } from "next/router";
import TwitterIcon from '@material-ui/icons/Twitter';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    shareButton: {
      margin: '10px 0px'
    },
  }));

const ShareButton =({post, message,labelText})=>{
    const classes = useStyles();
    const router = useRouter(); 
    const postUrl = 'https://nikki.yasan.app' + "/posts/" + post.id
    const shortDiary = post.text.length>20?`${post.text.slice(0,19)}…`:post.text
    const shareText = `${message}「${shortDiary}」`
    const query =`?url=${postUrl}&hashtags=みんなの絵文字日記&text=${shareText}`
    const shareUrl = `https://twitter.com/intent/tweet${encodeURI(query)}`

    return <Button className={classes.shareButton} href={shareUrl} variant="contained"><TwitterIcon/>{labelText}</Button>
}

export default ShareButton;