import { getSession } from 'next-auth/client'
import Head from 'next/head'
import Feed from '../components/Feed';
import Header from '../components/Header'
import Login from '../components/Login'
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import { db } from '../firebase';

export default function Home({session, posts}) {
  if(!session) return <Login/>;

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Clone of Facebook || by Mr.Kouhadi</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className="flex">
        <Sidebar />
        <Feed posts={posts}/>
       <Widgets/>
      </main>
    </div>
  )
}

export const getServerSideProps = async(context)=>{
  const session = await getSession(context);

  const posts = await db.collection('posts').orderBy('timestamp', 'desc').get();

  const docs = posts.docs.map(post =>{
    return {
      id:post.id, 
      ...post.data(),
      timestamp:null,
    }
  })
  return {
    props:{
      session:session,
      posts:docs,

    }
  }
}