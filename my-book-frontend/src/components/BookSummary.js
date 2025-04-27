import React, { useState, useEffect } from 'react';

function BookSummary({ isbn }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8080/ai/books/${isbn}/summary`);
        if (!response.ok) {
          throw new Error('Failed to fetch book summary');
        }
        const data = await response.text();
        setSummary(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [isbn]);

  if (loading) {
    return <div>Loading summary...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Book Summary</h3>
      <div>{summary}</div>
    </div>
  );
}

export default BookSummary;