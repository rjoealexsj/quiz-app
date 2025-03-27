import React, {useState} from 'react';
import '../Quiz/Quiz.css';
import { data } from '../../assets/data';
const Quiz = () => {

  let [index,setIndex] = useState(3);
  let [question,setQuestion] = useState(data[index]);
  let [lock,setLock] = useState(false);


const checkAns =(e,ans) => {

  if (lock  === false) {
    if (question.ans==ans) {
      e.target.classList.add("correct");
      setLock(true);
      setScore(prev=>prev+1);
    }
    else{
      e.target.classList.add("wrong");
      setLock(true);
      
    }
  }
  
}

     
  return (
    <div className='container'>
<h1>Quiz App</h1>
<hr />

<h2>{index+1}. {question.question}</h2>
<ul>
    <li >{question.option1}</li> 
    <li >{question.option2}</li>
    <li>{question.option3}</li>
    <li >{question.option4}</li>
</ul>
<button >Next</button>
    <div  className="index"> {index+1} of {data.length} questions</div>
    
    
      
    </div>
  
  )
}

export default Quiz