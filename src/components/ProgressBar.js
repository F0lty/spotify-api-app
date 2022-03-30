import React,{useEffect, useRef} from 'react';
import './progressBarStyles.css';
function ProgressBar({value}) {
    const progressBar = useRef(0);
    const valueContainer = useRef(0);
    console.log(value);
    useEffect(()=>{
        valueContainer.current.textContent=value+'%';
        progressBar.current.style.background = `conic-gradient(
        #4d5bf9 0deg,
        #cadcff 0deg
    )`;
        var currentValue = 0;
        const delay = setInterval(()=>{

            valueContainer.current.textContent=currentValue+'%';
            progressBar.current.style.background = `conic-gradient(
            #1ec14b ${currentValue * 3.6}deg,
            #000000 ${currentValue * 3.6}deg
        )`;
        progressBar.current.style.transition= 'all 0.5s ease-in-out';  
        if (value == currentValue) {
            clearInterval(delay);
        }
        currentValue++;
        },10);
        return () => clearInterval(delay);
    },[value]);
  return <div className='container'>
      <div ref={progressBar} className='circular-progress'>
          <div ref={valueContainer} className='value-container'>0%</div>
      </div>
  </div>;
}

export default ProgressBar;



// let progressBar = document.querySelector(".circular-progress");
// let valueContainer = document.querySelector(".value-container");

// let progressValue = 0;
// let progressEndValue = 100;
// let speed = 50;

// let progress = setInterval(() => {
//   progressValue++;
//   valueContainer.textContent = `${progressValue}%`;
//   progressBar.style.background = `conic-gradient(
//       #4d5bf9 ${progressValue * 3.6}deg,
//       #cadcff ${progressValue * 3.6}deg
//   )`;
//   if (progressValue == progressEndValue) {
//     clearInterval(progress);
//   }
// }, speed);
