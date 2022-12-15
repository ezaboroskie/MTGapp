import React from 'react';
import {useNavigate} from 'react-router-dom'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import Counter from './components/Counter';
import './styles/Body.css'
import './styles/Home.css'
import './styles/Register.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';

library.add(fas)



function App() {
 
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width:720px)").matches
  )

  useEffect(()=>{
    window
    .matchMedia("(max-width:720px)")
    .addEventListener('change', e => setMatches(e.matches));
  }, [])

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
    <div className='top-container'>
      <div className='user-left-container'>
        <div className='user-container'>
          <FontAwesomeIcon className='home-user-icon' icon={["fas", "fa-user"]}/>
          <div className='user-dropdown'>
            <p onClick ={handleLogClick}>Login</p>
            <p onClick ={handleRegClick}>Register</p>
            <p onClick ={handleLogOClick}>Logout</p>
          </div>
        </div>
      </div>
    </div>

    {matches &&(
      <div className='nav-right-container'>
        <div className='nav-container'>
          <FontAwesomeIcon className='nav-drop-icon' icon={["fas", "fa-bars"]}/>
          <div className='nav-dropdown'>
            <p onClick ={handleSearchCard}>Search Cards</p>
            <p onClick ={handleRandomCard}>Random Card</p>
            <p onClick ={handleFavorites}>Favorite Cards</p>
          </div>
        </div> 
      </div>
    )}

    {!matches &&(
      <div className='nav-container-large'>
        <button className='home-search-btn' onClick ={handleSearchCard}>Search Card</button>
        <button className='home-rand-btn' onClick ={handleRandomCard}>Random Card</button>
        <button className='home-fav-btn' onClick ={handleFavorites}>Favorite Cards</button>
      </div>
    )}

    
    <Counter/>
    <div className='roll-btn-container'>
    <button className='home-roll-btn' onClick={handleRollClick}>Roll a D20</button>
    </div>
    </>
  )
}

const mapStateToProps =(state)=>{
  return{
    authUser:state.isAuthenticated
}
}

export default connect(mapStateToProps)(App)
