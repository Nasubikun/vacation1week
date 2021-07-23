import { useRouter } from "next/router";
import TwitterIcon from '@material-ui/icons/Twitter';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    shareButton: {
      margin: '10px 0px'
    },
  }));

const ShareButton =({post})=>{
    const classes = useStyles();
    const router = useRouter(); 
    console.log(router.pathname)
    const postUrl = 'localhost:3000' + "/post/" + post.id
    const shortDiary = post.text.length>20?`${post.text.slice(0.19)}…`:post.text
    const shareText = `今日の日記を書きました。「${shortDiary}」`
    const query =`?url=${postUrl}&hashtags=みんなの絵文字日記&text=${shareText}`
    const shareUrl = `https://twitter.com/intent/tweet${encodeURI(query)}`
    console.log(shareUrl)

    return <Button className={classes.shareButton} href={shareUrl} variant="contained"><TwitterIcon/>Twitterでシェア！</Button>
}

export default ShareButton;