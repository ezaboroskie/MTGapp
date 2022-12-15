import React, {useState, useEffect} from 'react';
import '../styles/Card.css'
import Home from '../components/Home'
import FavModal from '../components/FavModal'

const logo = require('../images/logo.png')

function Favorites () {

    const [cards, setCards] = useState([])
    const [modalShow, setModalShow]= React.useState(false)
    const [objCard, setObjCard] = useState({})


    useEffect(()=>{
        fetchCards()
    }, [])

    const fetchCards = () =>{
        
        const token = localStorage.getItem('jwt')
        const userId = localStorage.getItem('userId')

        fetch(`http://localhost:8080/${userId}/favorites`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
           
        })
        .then(response=>response.json())
        .then(cards=>{
            setCards(cards)
        })
    }

    const handleDelFav = (id) => {

        fetch('http://localhost:8080/delete-fav', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        .then(fetchCards())

    }

    const handleImgClick=(card)=>{
        setObjCard(card)
        setModalShow(true)
    }

    const cardItems = cards.map((card, index) =>{

        return  <div className='card-container' key ={index}>
                <img variant="primary" onClick={()=>handleImgClick(card)}  className='image-thumb' src= {card.imageurl}/>
                <button className='rem-fav-btn' onClick={()=> handleDelFav(card.id)}>Remove Favorite</button>
                </div>
            
    })

    return(
        <>
            <Home/>
            <img className='logo-center' alt='logo' src={String(logo)} />
            <div className='thumb-container'>{cardItems}</div>
            {Object.keys(objCard).length>0?<FavModal cardobj={objCard} image={objCard.imageurl}
            show={modalShow}
            onHide={()=>setModalShow(false)}
            /> : ''}
        </>
    )

}

export default Favorites