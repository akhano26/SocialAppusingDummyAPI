

import './SocialApp.css'
export default function Spinner(){
 
  return(
    <center className="Nopost">
      <div className="spinner-border m-5" style={{height:'10rem',width:'10rem'}} role="status">
  <span className="visually-hidden">Loading...</span>
</div>
    </center>
    
  )
}