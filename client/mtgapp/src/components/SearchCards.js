import React, {useState, useEffect} from 'react';
import '../styles/Card.css'
import Home from '../components/Home'
import {connect} from 'react-redux'
import CenterModal from './CenterModal';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/Body.css'



function SearchCard(){

    const[searchedCards, setSearchedCards] = useState([])
    const[cardName, setCardName] = useState ('')
    const[modalShow, setModalShow]= React.useState(false)
    const[objCard, setObjCard] = useState({})
  

    useEffect(()=>{
        fetchSearchCard()
    },[])

    const fetchSearchCard = () =>{

        if (cardName.length==0){return}
        
        fetch(`https://api.scryfall.com/cards/search?q=name=${cardName}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(response=>response.json())
        .then(searchedCards=>{
            setSearchedCards(searchedCards.data)
            console.log(searchedCards)
        })
    }

    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        fetchSearchCard()
        }
    }

    const handleAddFav = (imageURL) =>{
        

        const token = localStorage.getItem('jwt')
        const userId = localStorage.getItem('userId')

        fetch('http://localhost:8080/add-fav', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({userId:userId, imageURL:imageURL})
        })
        

    }
       
    const handleImgClick=(card)=>{
        setObjCard(card)
        setModalShow(true) 
    }  
  
    const searchedCardItems = searchedCards.map((card,index)=>{
        return <div className='card-container' key={index}>
                    <img variant="primary" onClick={()=>handleImgClick(card)}  className='image-thumb' src={card.image_uris ? card.image_uris.border_crop : card.card_faces[0].image_uris.border_crop}/>
                <button onClick={()=>card.image_uris ? handleAddFav(card.image_uris.border_crop) : handleAddFav(card.card_faces[0].image_uris.border_crop)} className='fav-btn'>Favorite</button>
        
                </div>
                
    })

    return(
        <>
        <Home/>
        <input onKeyDown={handleKeyDown} type = 'text' name= 'cardName' placeholder= 'Enter card name' onChange={(e)=>setCardName (e.target.value)} />
        <button onClick ={fetchSearchCard}>Search</button>
        <div className='thumb-container'>{searchedCardItems}</div>
        {Object.keys(objCard).length>0?<CenterModal cardobj={objCard} image={objCard.image_uris.border_crop}
            show={modalShow}
            onHide={()=>setModalShow(false)}
            /> : ''}
        </>
    )


}

const mapStateToProps = (state)=>{
    return{
        authUser:state.isAuthenticated
    }
}

export default connect(mapStateToProps)(SearchCard)