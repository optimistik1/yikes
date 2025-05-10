import React, { useEffect, useState } from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { FaUserFriends, FaRegSmile, FaRegClock } from 'react-icons/fa';

interface Testimonial {
  nickname: string;
  text: string;
  rating: number;
  date?: string;
}

export const Home: React.FC = () => {
  const [featuredTestimonials, setFeaturedTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const savedTestimonials = localStorage.getItem('testimonials');
    if (savedTestimonials) {
      setFeaturedTestimonials(JSON.parse(savedTestimonials).slice(0, 2));
    }
  }, []);

  return (
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
              onClick={() => window.location.href = '/cart'}
            />
            <Button 
              color="secondary" 
              size="large" 
              title="Узнать больше"
              onClick={() => window.location.href = '/blog'}
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

          {featuredTestimonials.length > 0 && (
            <div className="mt-12">
              <Text as="h2" size="xlarge" className="mb-8 font-bold">
                Что говорят наши клиенты
              </Text>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {featuredTestimonials.map((testimonial, index) => (
                  <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                    <Text as="h3" size="large" className="font-bold mb-2">
                      {testimonial.nickname}
                    </Text>
                    <Text className="mb-4">{testimonial.text}</Text>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`text-${i < testimonial.rating ? '[#00FF00]' : 'gray-500'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Button
                color="accent"
                size="medium"
                title="Все отзывы"
                className="mt-6"
                onClick={() => window.location.href = '/about#reviews'}
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};