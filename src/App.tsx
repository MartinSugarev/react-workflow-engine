import React from 'react'
import useFetch from './hooks/useFetch';

export default function App() {
  const { data, loading, error, refetch } = useFetch('/claims.json', {method: 'GET'});

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ul>
        {data && data.map(user => <li key={user.id}>{user.status}</li>)}
      </ul>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}