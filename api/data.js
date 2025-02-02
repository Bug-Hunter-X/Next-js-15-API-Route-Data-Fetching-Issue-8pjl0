```javascript
// pages/about.js
import {useEffect, useState} from 'react';

export default function About() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>About Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```
```javascript
// pages/api/data.js
// This is a sample API route and needs to be adapted
export default async function handler(req, res) {
  // You would fetch data from a database or other source here
  const data = {
    message: 'Hello from the API!',
    version: '1.0.0'
  };
  res.status(200).json(data);
}
```