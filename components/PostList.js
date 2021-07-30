import { useEffect,useState } from "react";
import ShareButton from "./ShareButton";
import Diary from "../components/Diary";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    OnePost: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: 12
    },
  }));

const PostList = ({date}) =>{
    const classes = useStyles()
    const [isLoading,setIsLoading] = useState(true);
    const [allPosts,setAllPosts] = useState([]);
    const [filteredPosts,setFilteredPosts] = useState([]);

    const filterPosts = (posts) =>{
        console.log({dateInPostList:date})
        const ts = Math.floor(new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime() / 1000)
        const filtered = posts.filter(post => post[1].timestamp>ts+18000&&post[1].timestamp<ts+86400+18000)
        // Object.keys(allPosts).forEach(key => {if(allPosts[key].timestamp>ts+18000&&allPosts[key].timestamp<ts+86400+18000){filtered[key]=allPosts[key]}})
        return filtered;
    }
    useEffect(() => {
        fetch('https://vacation1weeknext-default-rtdb.firebaseio.com/posts.json') // realtime database
            .then(res => res.json())
            .then(
                (result) => {
                    console.log({result})
                    setAllPosts(Object.entries(result));
                    setFilteredPosts(Object.entries(result));
                    setIsLoading(false);
                },
                (error) => {
                    alert("データの取得中にエラーが発生しました。")
                }
            );
    }, []);
    useEffect(() => {
        if(allPosts){
        setFilteredPosts(filterPosts(allPosts));
        }
    }, [date]);

    const Posts = () =>{
        return filteredPosts.sort(function(a, b) {
            if (a[1].timestamp < b[1].timestamp) {
                return 1;
            } else {
                return -1;
            }
         }).map(post => <div key={post[0]} className={classes.OnePost}><Diary key={post[0]} emojis={post[1].emojis} name={post[1].name} text={post[1].text} timestamp={post[1].timestamp-18000}/><ShareButton key={post[0]} post={{id:post[0],emojis:post[1].emojis,name:post[1].name,text:post[1].text,timestamp:post[1].timestamp}} message={'いいね！'} labelText={'この日記をシェアする！'}/></div>)
    }

    return <div>{isLoading?<Loading/>:<Posts/>}</div>
}

export default PostList;