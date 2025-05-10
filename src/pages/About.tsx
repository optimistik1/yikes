import React, { useState, useEffect } from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { Input } from '../components/Input';
import { FaHeadset, FaCommentAlt, FaPlus, FaStar, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

interface Review {
  id: number;
  nickname: string;
  text: string;
  rating: number;
  date: string;
}

export const About: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    nickname: '',
    text: '',
    rating: '5'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/testimonials');
        setReviews(response.data);
        localStorage.setItem('reviews', JSON.stringify(response.data));
      } catch (err) {
        const saved = localStorage.getItem('reviews');
        if (saved) setReviews(JSON.parse(saved));
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.nickname || !newReview.text) return;

    try {
      const response = await axios.post('http://localhost:3001/api/testimonials', {
        nickname: newReview.nickname,
        text: newReview.text,
        rating: newReview.rating
      });

      const updatedReviews = [...reviews, response.data];
      setReviews(updatedReviews);
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
      
      setIsModalOpen(false);
      setNewReview({ nickname: '', text: '', rating: '5' });
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Ошибка при отправке отзыва');
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <FaStar 
          key={i} 
          className={`${i < rating ? 'text-yellow-400' : 'text-gray-500'} mr-1`} 
        />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Text>Загрузка отзывов...</Text>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>YIKES | Отзывы клиентов</title>
        <meta 
          name="description" 
          content="Реальные отзывы пользователей о сервисе аренды друзей YIKES. Оставьте свой отзыв!" 
        />
        <meta 
          name="keywords" 
          content="отзывы YIKES, мнения, оценки, рейтинг сервиса" 
        />
      </Helmet>

      <div className="min-h-screen bg-black py-12">
        <Container>
          <div className="flex items-center mb-8">
            <FaHeadset className="text-[#00FF00] text-4xl mr-4" />
            <Text as="h1" size="xlarge" color="accent" className="font-bold">
              Отзывы
            </Text>
          </div>

          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <Text as="h2" size="large" className="font-bold">
                Что говорят наши клиенты
              </Text>
              <Button
                color="primary"
                icon={<FaPlus className="mr-2" />}
                title="Добавить отзыв"
                onClick={() => setIsModalOpen(true)}
              />
            </div>

            {error && (
              <Text color="error" className="mb-4">
                {error}
              </Text>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-[#00FF00] transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <Text as="h3" size="large" className="font-bold">
                      {review.nickname}
                    </Text>
                    {renderStars(review.rating)}
                  </div>
                  <Text className="mb-4">{review.text}</Text>
                  <Text size="small" color="secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-[#00FF00]">
                <div className="flex justify-between items-center mb-4">
                  <Text as="h3" size="large" className="font-bold">
                    Новый отзыв
                  </Text>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    name="nickname"
                    value={newReview.nickname}
                    onChange={(e) => setNewReview({...newReview, nickname: e.target.value})}
                    placeholder="Ваше имя"
                    required
                  />
                  <Input
                    name="text"
                    value={newReview.text}
                    onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                    placeholder="Ваш отзыв"
                    multiline
                    rows={4}
                    required
                  />
                  <div className="flex items-center">
                    <Text className="mr-3">Оценка:</Text>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
                      className="bg-gray-700 text-white rounded px-3 py-2"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                    <div className="ml-2">
                      {renderStars(parseInt(newReview.rating))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      type="button"
                      color="secondary"
                      title="Отмена"
                      onClick={() => setIsModalOpen(false)}
                    />
                    <Button
                      type="submit"
                      color="primary"
                      title="Отправить"
                      icon={<FaCommentAlt className="mr-2" />}
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};