import React, { useEffect } from 'react'
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

function GameOver(props) {

    const {progress, setPlay, setprogress,score ,word,setWord, setScore} =props

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

 


useEffect(()=>{
    if(progress<1){
        setIsOpen(true)
    }
},[progress])

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setPlay(true)
    setprogress(99);
    setWord(0);
    setScore(0);

  }
  return (

    <>

<div>
      
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <h2>Your Total Score: {score}</h2>
        <h2>Total Word: {word}</h2>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Game Over</h2>
          {/* <button onClick={(e)=>{setPlay(true)}}>play Game</button> */}
          <button onClick={closeModal}>Play Again </button>
         
        
      </Modal>
    </div>
    </>
  )
}

export default GameOver