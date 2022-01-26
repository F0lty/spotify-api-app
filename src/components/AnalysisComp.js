import React from 'react'

function AnalysisComp({songAnalysis,songPopularity}) {
    
    const analysis = {...songAnalysis,popularity:songPopularity}
    const analysisTopics = ['popularity','valence','energy','danceability']
    return (
        <>
            {analysisTopics.map(topic=>{return <div className='analysisValue'><h2>{topic}</h2>{(analysis[topic]<1 ? parseInt(analysis[topic]*100) : parseInt(analysis[topic]))}</div>})}
        </>
    )
}

export default AnalysisComp
