import { useEffect,useState } from "react";
import Diary from "../components/Diary";

const PostList = ({date}) =>{
    const [allPosts,setAllPosts] = useState([]);
    const [filteredPosts,setFilteredPosts] = useState([]);

    const filterPosts = (posts) =>{
        const ts = Math.floor(new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime() / 1000)
        const filtered = posts.filter(post => post[1].timestamp>ts+18000&&post[1].timestamp<ts+86400+18000)
        // Object.keys(allPosts).forEach(key => {if(allPosts[key].timestamp>ts+18000&&allPosts[key].timestamp<ts+86400+18000){filtered[key]=allPosts[key]}})
        setFilteredPosts(filtered)
    }
    useEffect(() => {
        fetch('https://vacation1weeknext-default-rtdb.firebaseio.com/posts.json') // realtime database
            .then(res => res.json())
            .then(
                (result) => {
                    console.log({result})
                    setAllPosts(Object.entries(result))
                    filterPosts(Object.entries(result))
                },
                (error) => {
                }
            );
    }, []);
    useEffect(() => {
        if(allPosts){
        filterPosts(allPosts)
        }
    }, [date]);

    const Posts = () =>{
        return filteredPosts.map((post,i) => <Diary key={i} emojis={post[1].emojis} name={post[1].name} text={post[1].text} timestamp={post[1].timestamp-18000}/>)
    }

    return <div><Posts/></div>
}

export default PostList;