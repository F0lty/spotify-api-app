import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import ProgressBar from './ProgressBar';

function AnalysisComp({songAnalysis,songPopularity}) {
    
    const [analysis,setAnalysis] = useState({...songAnalysis,popularity:songPopularity})
    const analysisTopics = ['popularity','valence','energy','danceability'];
    console.log(analysis);
    return (
        <>
            {analysisTopics.map((topic,index)=>{
                let value = analysis[topic]<1 ? parseInt(analysis[topic]*100) : parseInt(analysis[topic]);
                return <div key={index} className='analysisValue'>
                    <h2>{topic}</h2>
                    <ProgressBar value={value}/>
                    
                    </div>
                })}
        </>
    )
}

export default AnalysisComp
