import { useState } from "react";
import { Button } from "@material-ui/core"
import PostForm from "./post";

const PostFunc = () =>{
    const [isButtonClick, setIsButtonClick] = useState(false);
    return <>
    <Button
        onClick = {() => setIsButtonClick(!isButtonClick)}
    >
        Button
        </Button>
    {isButtonClick&&<PostForm/>}
    </>

}

export default PostFunc