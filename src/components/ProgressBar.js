import React,{useRef} from 'react';

function ProgressBar({value}) {
    const progressBar = useRef(0);
    const valueContainer = useRef(0);

    const dummyValue = 20;
    const progress = setInterval(()=>{
        progress.current.textContent(dummyValue+'%');
    },2000);
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
