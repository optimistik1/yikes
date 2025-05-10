import React, { useEffect, useState } from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { FaUserFriends, FaRegSmile, FaRegClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface Review {
  id: number;
  nickname: string;
  text: string;
  rating: number;
  date: string;
}

export const Home: React.FC = () => {
  const [featuredReviews, setFeaturedReviews] = useState<Review[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('reviews');
    if (saved) {
      const allReviews = JSON.parse(saved);
      setFeaturedReviews(allReviews.slice(0, 2));
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>YIKES | Главная - Аренда друзей для общения</title>
        <meta 
          name="description" 
          content="Сервис для временного общения без обязательств. Выберите тариф и начните общение уже сегодня!" 
        />
        <meta 
          name="keywords" 
          content="аренда друзей, общение, компаньон, временный друг, сервис общения" 
        />
      </Helmet>

      <div className="min-h-screen bg-black">
        <Container>
          <div className="text-center py-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Выбери идеального <span className="text-[#00FF00]">друга</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Временное общение без обязательств. Выбери тариф и начни общение уже сегодня!
            </p>
            <div className="flex justify-center gap-4 mb-16">
              <Button 
                color="primary" 
                size="large" 
                title="Выбрать тариф"
                onClick={() => navigate('/cart')}
              />
              <Button 
                color="secondary" 
                size="large" 
                title="Узнать больше"
                onClick={() => navigate('/blog')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
              <div className="bg-gray-800 p-6 rounded-lg">
                <FaUserFriends className="text-[#00FF00] text-4xl mb-4 mx-auto" />
                <Text as="h3" size="large" className="mb-2 font-bold">
                  100+ друзей
                </Text>
                <Text color="secondary">
                  Большая база проверенных людей с разными интересами
                </Text>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <FaRegSmile className="text-[#00FF00] text-4xl mb-4 mx-auto" />
                <Text as="h3" size="large" className="mb-2 font-bold">
                  Без обязательств
                </Text>
                <Text color="secondary">
                  Общайтесь столько, сколько нужно без лишних обязательств
                </Text>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <FaRegClock className="text-[#00FF00] text-4xl mb-4 mx-auto" />
                <Text as="h3" size="large" className="mb-2 font-bold">
                  Быстрый подбор
                </Text>
                <Text color="secondary">
                  Находим подходящего человека в течение часа
                </Text>
              </div>
            </div>

            {featuredReviews.length > 0 && (
              <div className="mt-12">
                <Text as="h2" size="xlarge" className="mb-8 font-bold text-center">
                  Последние отзывы
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {featuredReviews.map(review => (
                    <div key={review.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-start mb-2">
                        <Text as="h3" size="large" className="font-bold">
                          {review.nickname}
                        </Text>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                          ))}
                        </div>
                      </div>
                      <Text className="mb-4">{review.text}</Text>
                      <Text size="small" color="secondary">
                        {new Date(review.date).toLocaleDateString()}
                      </Text>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Button
                    color="accent"
                    title="Все отзывы"
                    onClick={() => navigate('/about#reviews')}
                  />
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};