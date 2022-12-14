import React from 'react';
import {useNavigate} from 'react-router-dom'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import Counter from './components/Counter';
import './styles/Body.css'

library.add(fas)



function App() {
 
  const navigate = useNavigate()

  const handleRegClick = () =>{
    navigate('/register')
  }
  const handleLogClick = () =>{
    navigate('/login')
  }
  const handleLogOClick =() => {
    navigate('/logout')
  }
  const handleRollClick = () =>{
    navigate('/rolldice')
  }
  const handleRandomCard = ()=>{
    navigate('/randomcard')
  }
  const handleSearchCard = () =>{
    navigate('/searchcard')
  }
  const handleFavorites = () =>{
    navigate('/favorites')
  }

  return(
    <>
    <div className='nav-container'>
    <button onClick ={handleRegClick}>Register</button>
    <button onClick ={handleLogClick}>Login</button>
    <button onClick ={handleRollClick}>Roll A D20</button>
    <button onClick ={handleSearchCard}>Search Card</button>
    <button onClick ={handleRandomCard}>Random Card</button>
    <button onClick ={handleFavorites}>Favorite Cards</button>
    <button onClick ={handleLogOClick}>Logout</button>
    </div>
    <Counter/>
    </>
  )
}

const mapStateToProps =(state)=>{
  return{
    authUser:state.isAuthenticated
}
}

export default connect(mapStateToProps)(App)
