import { useNavigate } from "react-router-dom"

const NotFound = () => {
   let navigate = useNavigate();
   function clickMe() {
      navigate('/login',true)
   }
 return (
   <div>
    <p className="not-found-message"> Page you are looking is not found </p>
    <button className ="auth-status-message button" onClick={clickMe}>Go To HomePage</button>
    </div>
 )
}

export default NotFound