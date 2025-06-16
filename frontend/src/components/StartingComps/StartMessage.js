import React from 'react'
import '../../App.css'
import George from '../../assets/george.png'
import Moliere from '../../assets/moliere.jpg'

function StartMessage() {
  return (
    <div className='StartMessage'>
            
        <p className='start-text'>
            Decouvrez de nouvelles Histoires en plongeant 
            <br />
            dans l'univers de ScrollBook.
        </p>

        <p className='start-text-subtitle'>
            Explore des récits captivants, des aventures épiques 
            <br/>
            et des classiques intemporels.
        </p>
        <div className='images-container'>
            <img className='moliere-image' src={Moliere} alt='Moliere' />
            <img className='george-image' src={George} alt='George' />
        </div>
        <p className='flashing-text'>
            Appuyez sur la barre d'espace pour commencer
        </p>
    </div>
  )
}

export default StartMessage