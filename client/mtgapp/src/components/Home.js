import { useNavigate } from "react-router-dom";


function Home () {

    const navigate = useNavigate()

    const handleHome = ()=>{
        navigate('/')
    }

    return(
        <>
        <button onClick= {handleHome}>Home</button>
        </>
    )

}

export default Home