import { useState, useEffect } from 'react';

export default function App() {
  const [jobIds, setJobIds] = useState()
  const [viewStartIdx, setViewStartIdx] = useState(0);
  const [jobsInView, setJobsInView] = useState([]);

  useEffect(() => {
    const fetchData = async function () {
      let res = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')
      let data = await res.json();

      setJobIds(data);
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchJobData = async function () {
      console.log(`FETCHING DATA with startIdx ${viewStartIdx}`)
      if (!jobIds) return;
      let jobIdsInRange = jobIds.slice(viewStartIdx, viewStartIdx + 6);
      let jobsToRender = [];
      for (let jobId of jobIdsInRange) {
        let jobRes = await fetch(` https://hacker-news.firebaseio.com/v0/item/${jobId}.json`);
        let jobData = await jobRes.json()
        if (jobData) jobsToRender.push(jobData)
      }
        setJobsInView(jobsToRender)
    }

    fetchJobData()
  }, [viewStartIdx])

  if (jobsInView.length === 0 ) return; 
  return (
    <div>
      <h1>Hacker News Jobs Board</h1>
      {viewStartIdx > 0 ? 
      <button onClick = {()=> setViewStartIdx(viewStartIdx - 6)}>Load Prev Jobs </button>
      : ''}
      <ul>
      {jobsInView.map(jobInView => {
        const {title, by, time, url}  = jobInView;
        let dateObj = new Date(time * 1000);

        return (
          <li>
          <a href={url}>
          <h4>{title}</h4>
          By {by} - {dateObj.toUTCString()}
          </a>
          </li>
        )
      })}
      </ul>
      <button onClick = {()=> setViewStartIdx(viewStartIdx + 6)}>Load More Jobs </button>
      <br/>
    </div>
  );
}
