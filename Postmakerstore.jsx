import { createContext, useEffect, useReducer, useState } from "react";
const postreducer=(currlist,action)=>{
var newpostlist=[...currlist];
console.log('Before Update: ',newpostlist)
if(action.type==='DELETE_POST'){
newpostlist=currlist.filter((post)=>post.id!=action.payload.postid)
}
else if(action.type==='ADD_POST'){
  console.log("A am object",action.payload.newpost.title)
  newpostlist=[
    ...currlist,action.payload.newpost
  ]
  console.log('After Update: ',newpostlist)

}
else if(action.type=='ADD_MUl_POSTS'){
  console.log("posts",action.payload.posts)
  newpostlist=action.payload.posts
}
return newpostlist;
}
export const Postlistcontext=createContext({postlist:[],addpost:()=>{},deletepost:()=>{}});

const Postmakerprovider=({children})=>{
  
  const [posts,dispachpost]=useReducer(postreducer, []);
  const [fetching,setfetching]=useState(false);

const addpost=(obj)=>{

  fetch('https://dummyjson.com/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: obj.title,
      reactions:obj.reaction,
      body:obj.detail,
      userId: obj.id,
      tags:obj.tags,
    })
  })
  .then(res => res.json())
  .then((post)=>{
    console.log(post)
    dispachpost({
      type:'ADD_POST',
      payload:{
        newpost:post
      }
    })
  }
  );



}
const addposts=(posts)=>{
 
dispachpost({
  type:"ADD_MUl_POSTS",
  payload:{
    posts
  }
})
}
const deletepost=(postid)=>{
dispachpost({
  type:'DELETE_POST',
  payload:{
  postid:postid,},
})
}
useEffect(()=>{
  setfetching(true);
const controller = new AbortController();
const signal = controller.signal;
fetch('https://dummyjson.com/posts',{signal})
.then(res => res.json())
.then(obj=>addposts(obj.posts));
setfetching(false)
return()=>{
  controller.abort();
}

},[])

  return(
<>
<Postlistcontext.Provider value={{posts,addpost,deletepost,fetching}}>
{children}
</Postlistcontext.Provider>
   </> )
}
export default Postmakerprovider