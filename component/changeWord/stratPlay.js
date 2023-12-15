import React from 'react'
import { useDrop } from "react-dnd";
import { useEffect, useState } from "react";
import styles from '../../styles/Changeword.module.css'
import DragFile from './dragword';
import StartGame from './startgame';
import GameOver from './gameOver';
function StratPlay() {
    let dataArray = ["ANT","ONT","OTT","OTO"];
    let question = [
      { name: "A" },
      { name: "N" },
      { name: "C" },
    ];
  
    const [baskets, setBaskets] = useState(question);
    const[enterkanswer, setEnterkanswer]= useState(baskets);
    const[enterAanswer, setEnterAanswer]= useState("");
    const[randomNumber, setRandomNumber]= useState();
    const[progress, setprogress]= useState(99);
    const[word,setWord]= useState(0);
    const[play,setPlay] = useState(false);
    const[score, setScore] = useState(0);
    

    useEffect(()=>{
      if(progress>0 && play ){  
       let clerInterval =   setTimeout(() => {
          setprogress(pre=>pre-1)
        }, 100);
        ()=>clearTimeout(clerInterval);
      }

      if(dataArray.length == word){
        setprogress(0)
        setBaskets(question);

      }
    },[play,  progress])
  
    useEffect(()=>{
      const enteranswerfirst =  enterkanswer.map((basket) => basket.name).join("");
    const dta =   dataArray.find(ele => ele === enteranswerfirst);
    if(dta && enterAanswer !== dta){
      setEnterAanswer(dta);
    setBaskets(dta.split('').map(char => ({ name: char })));
    setScore(pre=>pre+66);
    setWord(pre=>pre+1);
    setprogress(100);
    }
    else{  
       setEnterkanswer(baskets);
    }
     
        },[randomNumber])
       
    const handleDropBasket = (item, index) => {
      setEnterkanswer((prevBaskets) => {
          const newBaskets = [...prevBaskets];
          newBaskets[index] = item;
          return newBaskets;
        })
        setTimeout(() => {
      setRandomNumber(Math.random());    
        }, 100);
    };
  
    const [{ isOver }, dropRef] = useDrop({
      accept: "language",
      drop: (item) => {
        handleDropBasket(item, 0);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });
  
    const [{ isOver: isOver1 }, dropRef1] = useDrop({
      accept: "language",
      drop: (item) => {
        handleDropBasket(item, 1);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });
  
    const [{ isOver: isOver2 }, dropRef2] = useDrop({
      accept: "language",
      drop: (item) => {
        handleDropBasket(item, 2);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });
    const [{ isOver: isOver3 }, dropRef3] = useDrop({
      accept: "language",
      drop: (item) => {
        handleDropBasket(item, 3);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });
  
    return (
       <>
       <StartGame setPlay ={setPlay}/>
      <div className="flex">
        <div className="my-8 mx-8 rounded-xl border w-fit">
          <div className="my-4">
            <div className={styles.details}>
              <p className="mx-16 font-bold" style={{}}> Your Total Score: {score}</p>
              <p className="mx-16 font-bold" style={{}}> Word {word}</p>
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>
  
            {baskets.map((basket, index) => (
              <p style={{padding:"9px",
                fontSize: "22px",
                border: "1px solid blue"}}
                ref={index === 0 ? dropRef : index === 1 ? dropRef1 : index===2? dropRef2: dropRef3}
                key={index}
                className="border1 w-fit my-2 p-2 mx-16 rounded bg-indigo-400 text-white font-bold cursor-pointer"
              >
                {basket.name}
              </p>
            ))}
            </div>
          </div>
        </div>
        <div>
          <DragFile />
        </div>
        <div className={styles.progress}>
        <progress className={styles.progressElement} id="file" value={progress} max="100"></progress>
        </div>
      </div>
     <GameOver
      progress ={progress}
       setPlay={setPlay}
        setprogress={setprogress} 
        score={score} word={word}
        setWord={setWord}
        setScore={setScore}
     />
      </>
    );
}

export default StratPlay