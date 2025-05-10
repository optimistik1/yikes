import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Container } from '../components/Container';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { FaHeadset, FaCommentAlt, FaPlus, FaStar, FaTimes } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface Review {
  nickname: string;
  text: string;
  rating: number;
  date: string;
}

export const About: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    nickname: '',
    text: '',
    rating: '5'
  });

  useEffect(() => {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newReview.nickname && newReview.text) {
      const reviewToAdd = {
        ...newReview,
        date: new Date().toISOString(),
        rating: parseInt(newReview.rating)
      };
      setReviews([...reviews, reviewToAdd as Review]);
      setNewReview({
        nickname: '',
        text: '',
        rating: '5'
      });
      setIsReviewModalOpen(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReviewChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={`${i < rating ? 'text-yellow-400' : 'text-gray-500'} mr-1`} 
          />
        ))}
      </div>
    );
  };

  return (
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
              Отзывы о друзьях
            </Text>
            <Button
              color="primary"
              size="medium"
              icon={<FaPlus className="mr-2" />}
              title="Добавить отзыв"
              onClick={() => setIsReviewModalOpen(true)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-[#00FF00] transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <Text as="h3" size="large" className="font-bold">
                    {review.nickname}
                  </Text>
                  {renderRatingStars(review.rating)}
                </div>
                <Text className="mb-4">
                  {review.text}
                </Text>
                <Text size="small" color="secondary">
                  {new Date(review.date).toLocaleDateString()}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {isReviewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full border border-[#00FF00]">
              <div className="flex justify-between items-center mb-4">
                <Text as="h3" size="large" className="font-bold">
                  Оставить отзыв о друге
                </Text>
                <button 
                  onClick={() => setIsReviewModalOpen(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <Input
                  name="nickname"
                  value={newReview.nickname}
                  onChange={handleReviewChange}
                  placeholder="Ваш никнейм"
                  required
                />
                <Input
                  name="text"
                  value={newReview.text}
                  onChange={handleReviewChange}
                  placeholder="Ваш отзыв"
                  multiline
                  required
                />
                <div className="flex items-center">
                  <label className="mr-3">Оценка:</label>
                  <select
                    name="rating"
                    value={newReview.rating}
                    onChange={handleReviewChange}
                    className="bg-gray-700 text-white rounded px-3 py-2"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <div className="ml-2 flex">
                    {renderRatingStars(parseInt(newReview.rating))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    color="secondary"
                    title="Отмена"
                    onClick={() => setIsReviewModalOpen(false)}
                  />
                  <Button
                    type="submit"
                    color="primary"
                    title="Опубликовать"
                    icon={<FaCommentAlt className="mr-2" />}
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-12">
          <Text as="h2" size="large" className="mb-4 font-bold">
            Свяжитесь с нами
          </Text>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              required
            />
            <Input 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ваш email"
              type="email"
              required
            />
            <Input 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ваш телефон"
              type="tel"
            />
            <Input 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Ваш вопрос или пожелание"
              multiline
            />
            
            <div className="flex justify-center">
              <Button 
                type="submit"
                color="primary" 
                size="large" 
                title="Отправить"
              />
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};