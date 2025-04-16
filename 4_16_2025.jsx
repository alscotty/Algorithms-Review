import React, { useState } from 'react';

function Slides({slides}) {
    const [showIdx, setShowIdx] = useState(0);

    const handleRestart = () => {
        setShowIdx(0);
    }

    const handleIdxChange = (change) => {
        if (change == 'increment') {
            setShowIdx(Math.min(showIdx+1, slides.length - 1))
        } else if (change == 'decrement') {
            setShowIdx(Math.max(showIdx-1, 0))
        }
    } 
    
    return (
        <div>
            <div id="navigation" className="text-center">
                <button disabled={showIdx === 0}data-testid="button-restart" className="small outlined" onClick={()=>handleRestart()}>Restart</button>
                <button disabled={showIdx === 0} data-testid="button-prev" className="small" onClick={() => handleIdxChange('decrement')}>Prev</button>
                <button disabled={showIdx === slides.length -1} data-testid="button-next" className="small" onClick={() => handleIdxChange('increment')}>Next</button>
            </div>
            <div id="slide" className="card text-center">
                {showIdx}
                <h1 data-testid="title">{slides[showIdx].title}</h1>
                <p data-testid="text">{slides[showIdx].text}</p>
            </div>
        </div>
    );

}

export default Slides;
import React, { useState } from 'react';
import './App.css';
import 'h8k-components';

import Articles from './components/Articles';

const title = "Sorting Articles";

function App({ articles }) {
    const [currentArticles, setCurrentArticles] = useState([...articles].sort((a,b) => {
            return b['upvotes'] > a['upvotes'] ? 1 : -1
        }));

    const handleSort = (sortKey) => {
        let sortedArticles = [...articles].sort((a,b) => {
            return b[sortKey] > a[sortKey] ? 1 : -1
        })
        setCurrentArticles(sortedArticles)
    }

    return (
        <div className="App">
            <h8k-navbar header={title}></h8k-navbar>
            <div className="layout-row align-items-center justify-content-center my-20 navigation">
                <label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
                <button data-testid="most-upvoted-link" className="small" onClick={()=> handleSort('upvotes')}>Most Upvoted</button>
                <button data-testid="most-recent-link" className="small" onClick={()=> handleSort('date')}>Most Recent</button>
            </div>
            <Articles articles={currentArticles} />
        </div>
    );

}

export default App;
