import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { FaStar } from 'react-icons/fa';

const LecturerRating = () => {
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get('/ratings?rating_type=lecturer');
      setRatings(response.data.ratings);
      
      if (response.data.ratings.length > 0) {
        const avg = response.data.ratings.reduce((sum, r) => sum + r.rating, 0) / response.data.ratings.length;
        setAvgRating(avg);
        setTotalRatings(response.data.ratings.length);
      }
    } catch (err) {
      setError('Failed to load ratings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} color={i < rating ? '#ffc107' : '#e4e5e9'} />
    ));
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Container className="mt-5 text-center">
          <Spinner animation="border" variant="primary" />
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container fluid className="px-4">
        <h2 className="mb-4">My Ratings</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Card className="mb-4">
          <Card.Body className="text-center">
            <h1 className="display-4">{avgRating.toFixed(1)}</h1>
            <div className="mb-2">{renderStars(Math.round(avgRating))}</div>
            <p className="text-muted">Based on {totalRatings} rating{totalRatings !== 1 ? 's' : ''}</p>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <h5 className="mb-0">All Ratings</h5>
          </Card.Header>
          <Card.Body>
            {ratings.length > 0 ? (
              <div className="list-group">
                {ratings.map((rating) => (
                  <div key={rating.id} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <strong>{rating.rated_by_name}</strong>
                        <div>{renderStars(rating.rating)}</div>
                      </div>
                      <small className="text-muted">
                        {new Date(rating.created_at).toLocaleDateString()}
                      </small>
                    </div>
                    {rating.comment && <p className="mb-0">{rating.comment}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <Alert variant="info">No ratings yet</Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default LecturerRating;