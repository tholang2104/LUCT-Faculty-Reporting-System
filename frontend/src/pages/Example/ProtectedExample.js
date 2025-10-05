import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Button } from 'react-bootstrap';

const ProtectedExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProtected = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/example/protected');
      setData(res.data);
    } catch (err) {
      setData({ success: false, message: err.response?.data?.message || err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProtected();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Protected Example Page</h3>
      <p>This page calls <code>/api/example/protected</code> using the token stored by `AuthContext`.</p>

      {loading ? (
        <div><Spinner animation="border" /></div>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}

      <Button variant="secondary" onClick={fetchProtected}>Reload</Button>
    </div>
  );
};

export default ProtectedExample;
