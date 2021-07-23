import Detail from '../../components/Detail'
import ShareButton from '../../components/ShareButton'
import Header from '../../components/Header'
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

// post：getStaticPropsから取得したデータ
const ShareDetail= ({ post }) => {
  const classes = useStyles()
  return <div className={classes.root}><Header/><Detail post={post}/><ShareButton post={post}/></div>
}

export const getStaticPaths = async () => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch("https://vacation1weeknext-default-rtdb.firebaseio.com/posts.json")
  const posts = await res.json() 

  // 事前ビルドしたいパスを指定
  const paths = Object.keys(posts).map((post) => ({
    params: {
      // ファイル名と合わせる ※文字列指定
      id: post.toString(),
    },
  }))
  // paths：事前ビルドするパス対象を指定するパラメータ
  // fallback：事前ビルドしたパス以外にアクセスしたときのパラメータ true:カスタム404Pageを表示 false:404pageを表示
  return { paths, fallback: false }
}

// paramsには上記pathsで指定した値が入る（1postずつ）
export const getStaticProps = async ({ params }) => {  
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch(`https://vacation1weeknext-default-rtdb.firebaseio.com/posts/${params.id}.json`)
  let post = await res.json()
  post['id'] = params.id  

  // ページコンポーネントにpropsとしてに渡す
  return {
    props: {
      post
    },
  }
}

export default ShareDetail;