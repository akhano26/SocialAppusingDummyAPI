import Card from "./Card";
import { useContext } from "react";
import { Postlistcontext } from "./Postmakerstore";
import Spinner from "./Spinner";
const Mulcard=()=>{
const {posts,fetching}=useContext(Postlistcontext);
return(
  <>
  {fetching&&<Spinner/>}
  {posts.map((post)=>(
    <Card key={post.id} post={post}/>
  ))
  }
  </>
)
}
export default Mulcard;