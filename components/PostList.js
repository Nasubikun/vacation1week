import { useEffect,useState } from "react";
import Diary from "../components/Diary";
import Loading from "./Loading";

const PostList = ({date}) =>{
    const [isLoading,setIsLoading] = useState(true);
    const [allPosts,setAllPosts] = useState([]);
    const [filteredPosts,setFilteredPosts] = useState([]);

    const filterPosts = (posts) =>{
        console.log({posts})
        const ts = Math.floor(new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime() / 1000)
        console.log({date})
        const filtered = posts.filter(post => post[1].timestamp>ts+18000&&post[1].timestamp<ts+86400+18000)
        // Object.keys(allPosts).forEach(key => {if(allPosts[key].timestamp>ts+18000&&allPosts[key].timestamp<ts+86400+18000){filtered[key]=allPosts[key]}})
        console.log({filtered})
        return filtered;
    }
    useEffect(() => {
        fetch('https://vacation1weeknext-default-rtdb.firebaseio.com/posts.json') // realtime database
            .then(res => res.json())
            .then(
                (result) => {
                    console.log({result})
                    setAllPosts(Object.entries(result));
                    setFilteredPosts(filterPosts(Object.entries(result)));
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
         }).map((post,i) => <Diary key={i} emojis={post[1].emojis} name={post[1].name} text={post[1].text} timestamp={post[1].timestamp-18000}/>)
    }

    return <div>{isLoading?<Loading/>:<Posts/>}</div>
}

export default PostList;