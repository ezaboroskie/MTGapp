import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Register(){
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const handleOnChange = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleHome = () =>{
        navigate('/')
    }

    const handleSubmit = () => {

        fetch('http://localhost:8080/register', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(response => response.json())
        .then(result =>{
            if(result.error){
                console.log(result.error)
            }else{
                setUser(user)
                navigate('/login')
            }
        })
    }

    return(
        <>  
            <input onChange ={handleOnChange} name = "firstName" type = "text" placeholder="Enter your first name"/>
            <input onChange ={handleOnChange} name = "lastName" type = "text" placeholder="Enter your last name"/>
            <input onChange ={handleOnChange} name = "username" type = "text" placeholder="Enter your username"/>
            <input onChange ={handleOnChange} name = "password" type = "password" placeholder="Enter your password"/>
            <button onClick ={handleSubmit}>Register</button>
            <button onClick ={handleHome}>Home</button>
        </>
    )

}

export default Register