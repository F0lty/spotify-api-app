import React from 'react';
import ProgressBar from './ProgressBar';

function AnalysisComp({songAnalysis,songPopularity}) {
    
    const analysis = {...songAnalysis,popularity:songPopularity}
    const analysisTopics = ['popularity','valence','energy','danceability']
    return (
        <>
            {analysisTopics.map(topic=>{
                let value = analysis[topic]<1 ? parseInt(analysis[topic]*100) : parseInt(analysis[topic]);
                return <div className='analysisValue'>
                    <h2>{topic}</h2>
                    <ProgressBar value={value}/>
                    
                    </div>
                })}
        </>
    )
}

export default AnalysisComp
