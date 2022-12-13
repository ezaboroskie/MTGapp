import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {connect} from 'react-redux'


function Login (props) {

    const [user, setUser] =useState({})
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const handleHome = () =>{
        navigate('/')
    }

    const handleRegister = () =>{
        navigate('/register')
    }

    const handleSubmit = () =>{

        if(!user.username && !user.password){
            alert('Please enter a username and password')
        }else if(!user.password){
            alert('Please enter a password')
        }else if(!user.username){
            alert('Please enter a username')
        }else{

        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(result => {
            if(result.success){
                const token = result.token
                const username = result.username
                localStorage.setItem('jwt', token)
                localStorage.setItem('username', username)
                localStorage.setItem('userId', result.userId)
                props.onLogin(token)
                navigate('/')
            }
        })
    }
}
    return(
        <>
            <input onChange = {handleOnChange} name = "username" type = "text" placeholder = "Enter username" />
            <input onChange = {handleOnChange} name = "password" type = "password" placeholder = "Enter password" />
            <button onClick = {handleSubmit}>Login</button>
            <button onClick = {handleRegister}>Register</button>
            <button onClick = {handleHome}>Home</button>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        onLogin: (token)=>dispatch({type: 'ON_LOGIN', payload: token})
    }
}

export default connect(null, mapDispatchToProps)(Login)