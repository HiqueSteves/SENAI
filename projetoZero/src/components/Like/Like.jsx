import React, { useState } from 'react';
import likeImg from '../../assets/img/like.jpg'
import deslikeImg from '../../assets/img/deslike.jpg'

function ContadorLikes() {
    const [like, setLike] = useState(false);
    const [numeroLikes, setNumeroLikes] = useState(50)

    const darLike = () => {
        if (like){
            setNumeroLikes(numeroLikes - 1)
            setLike(false)
    } else {
        setNumeroLikes(numeroLikes + 1)
        setLike(true)
    } 
};
    return (
        <div>
            <h2>Likes: {like}</h2>
            <button className="like-btn" onClick={(darLike)}>
                <img src={like ? likeImg : deslikeImg} alt='' />
            </button>
        </div>
    
    )
    
 }

 export default ContadorLikes;

