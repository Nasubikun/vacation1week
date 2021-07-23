import { Button } from "@material-ui/core"
import firebase from "firebase/app";
import 'firebase/database';
import { useRouter } from 'next/router'

// function writeUserData(userId, name, email, imageUrl) {
//     firebase.database().ref('users/' + userId).set({
//       username: name,
//       email: email,
//       profile_picture : imageUrl
//     });
//   }

const generateUuid = () => {
    // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
    // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
    for (let i = 0, len = chars.length; i < len; i++) {
        switch (chars[i]) {
            case "x":
                chars[i] = Math.floor(Math.random() * 16).toString(16);
                break;
            case "y":
                chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
                break;
        }
    }
    return chars.join("");
}

const PostButton = ({getValues,emojis,disabled}) =>{
    const router = useRouter()
    const submitPost = async() =>{
        const name = getValues('name')
        const text = getValues('diary')
        const uuid = generateUuid()
        console.log({
            emojis: emojis,
            name: name,
            text : text,
            timestamp: Math.floor(Date.now() / 1000),
          })
        firebase.database().ref('posts/' + uuid).set({
            emojis: emojis,
            name: name,
            text : text,
            timestamp: Math.floor(Date.now() / 1000),
          });
          router.push(`/share/${uuid}`)
        alert("投稿したよ！")

    }


    return<Button disabled={disabled} variant="contained" onClick={()=>submitPost()}>投稿！</Button>
}

export default PostButton;
