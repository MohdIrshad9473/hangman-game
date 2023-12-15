import React from 'react'
// import styles from '../../styles/Changeword.module.css'
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-20%, -20%)',
  },
};
function StartGame(props) {
  const {setPlay} =props

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(true);

 

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setPlay(true)
    
  }
  return (<>

<div>
      
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Play The Game</h2>
          {/* <button onClick={(e)=>{setPlay(true)}}>play Game</button> */}
          <button onClick={closeModal}>Play Game</button>
         
        
      </Modal>
    </div>
    </>
  )
}

export default StartGame