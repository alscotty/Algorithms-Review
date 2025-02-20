import { useState } from 'react';
import users from './data/users.json';

export default function DataTable() {
  const [message, setMessage] = useState('Data Table');
  const [startIdx, setStartIdx] = useState(0);
  const [numItemsToRender, setNumItemsToRender] = useState(10)

  const adjustIdx = (direction) => {
    if (direction == 'lower') {
      setStartIdx(Math.max(0, startIdx - numItemsToRender))
    } else if (direction == 'raise') {
      setStartIdx(Math.min(users.length - 1, startIdx + numItemsToRender))
    }
  }

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={() => adjustIdx('lower')}> Prev </button>
      <button onClick={() => adjustIdx('raise')}> Next </button>
      {startIdx}
      <input type='number' value={numItemsToRender} onChange={(e)=> setNumItemsToRender(Number(e.target.value))}/>
      <table>
        <thead>
          <tr>
            {[
              { label: 'ID', key: 'id' },
              { label: 'Name', key: 'name' },
              { label: 'Age', key: 'age' },
              { label: 'Occupation', key: 'occupation' },
            ].map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.slice(startIdx, startIdx + numItemsToRender).map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
