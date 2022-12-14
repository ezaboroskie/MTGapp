import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Register.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Register(){
    const [user, setUser] = useState({})
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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

        if(firstName.length==0){return}
        if(lastName.length==0){return}
        if(username.length==0){return}
        if(password.length==0){return}

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
            <div className='reg-body'>
                <FontAwesomeIcon className='user-icon' icon={["fas", "fa-user"]}/>
                <h1 className='reg-heading'>Register to Favorite Cards</h1>    
                <div className='reg-container'>
                    <input className='reg-textbox' onChange ={handleOnChange} name = "firstName" type = "text" placeholder="Enter your first name"/>
                    <input className='reg-textbox' onChange ={handleOnChange} name = "lastName" type = "text" placeholder="Enter your last name"/>
                    <input className='reg-textbox' onChange ={handleOnChange} name = "username" type = "text" placeholder="Enter your username"/>
                    <input className='reg-textbox' onChange ={handleOnChange} name = "password" type = "password" placeholder="Enter your password"/>
                    <button className='reg-reg-btn' onClick ={handleSubmit}>Register</button>
                    <button className='reg-home-btn' onClick ={handleHome}>Home</button>
                </div>
            </div>
        </>
    )

}

export default Register