import React, {useState, useEffect} from "react";
import '../styles/Card.css'
import Home from '../components/Home'
import RandomModal from "./RandomModal";
import 'bootstrap/dist/css/bootstrap.min.css'

const logo = require('../images/logo.png')

function RandomCard(){

    const[randomCard, setRandomCard] = useState({})
    const[imageUrl, setImageUrl] = useState('')
    const[modalShow, setModalShow] = React.useState(false)
    const[objCard, setObjCard] = useState({})


    useEffect(()=>{
        fetchRandomCard()
    },[])

    const handleReload = ()=>{
        fetchRandomCard()
       }

    const fetchRandomCard = () =>{

        fetch('https://api.scryfall.com/cards/random', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response=>response.json())
        .then(randomCard=>{
            setRandomCard(randomCard)
            setImageUrl(randomCard.image_uris.border_crop)
        })
    }

    const handleAddFav = (imageURL) =>{
    
        const token = localStorage.getItem('jwt')
        const userId = localStorage.getItem('userId')

        fetch('http://afternoon-taiga-47194.herokuapp.com/add-fav', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({userId:userId, imageURL:imageURL})
        })
        
        
    }

    const handleImgClick=(randomCard) =>{
        setObjCard(randomCard)
        setModalShow(true)
    }

    return(
        <>
     <Home/>

        <img className='logo-center' alt='logo' src={String(logo)} />

        <div className='random-card-container'>
           
            <img variant="primary" onClick={()=>handleImgClick(randomCard)} className='image-normal' src={imageUrl}></img>

        </div>
        <div className='button-container'>
        <button onClick ={()=>handleReload()} className='rand-reload-btn'>Random Card</button>
        <button onClick ={()=>handleAddFav(imageUrl)} className='fav-btn1'>Favorite</button>
       
        <RandomModal cardobj={objCard} image={imageUrl}
            show={modalShow}
            onHide={()=>setModalShow(false)}/>
        </div>
        </>
    )


}

export default RandomCard