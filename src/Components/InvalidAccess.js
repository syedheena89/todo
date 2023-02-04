import { useNavigate } from "react-router-dom"


const InvalidAccess = () => {
    let navigate = useNavigate();
    function clickMeToLoginAgain(){
        navigate('/login',true)
    }
 return (
   <div>
    <p> invalid credentials please login again </p>
    <button onClick={clickMeToLoginAgain}>Login Again</button>
    </div>
 )
}

export default InvalidAccess