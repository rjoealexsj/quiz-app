import React from 'react';
import '../Quiz/Quiz.css';
import { data } from '../../Assets/data';
const Quiz = () => {

  let [index,setIndex] = useState(0);
  let [question,setQuestion] = useState(data[index]);

const checkAns =(e,ans) {
  if(question.ans==ans) {
    e.target.classList.add("correct");
  }
  else{
    e.target.classList.add("wrong");
  }
}

  return (
    <div className='container'>
<h1>Quiz App</h1>
<hr />
<h2>{index+1}. {question.question}</h2>
<u1>
    <li onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li> 
    <li onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
    <li onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
    <li onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
</u1>
<button>Next</button>
    <div  className="index"> 1 of 5 questions</div></div>
  )
}

export default Quiz