import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Text } from '../components/Text';
import { FaCheck, FaRegCreditCard } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

interface Plan {
  id: number;
  name: string;
  price: number;
  duration: string;
  features: string[];
}

export const Cart: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const plans: Plan[] = [
    {
      id: 1,
      name: 'Basic',
      price: 2000,
      duration: '2 часа',
      features: ['Простое общение', 'Базовые темы', 'Кофе-брейк']
    },
    {
      id: 2,
      name: 'Medium',
      price: 4000,
      duration: '4 часа',
      features: ['Общие интересы', '1 активность', 'Хобби']
    },
    {
      id: 3,
      name: 'VIP',
      price: 10000,
      duration: '6 часов',
      features: ['Филосовские разговоры', '2 активности', 'Профессиональные темы']
    }
  ];

  const handleOrder = () => {
    if (selectedPlan) {
      setOrderCompleted(true);
      console.log('Заказ оформлен:', selectedPlan);
    }
  };

  return (
    <>
      <Helmet>
        <title>YIKES | Выбор тарифа</title>
        <meta 
          name="description" 
          content="Выберите подходящий тариф для аренды друга: Basic, Medium или VIP" 
        />
        <meta 
          name="keywords" 
          content="тарифы, цены, стоимость, выбор пакета" 
        />
      </Helmet>

      <div className="min-h-screen bg-black py-12">
        <Container>
          <div className="flex items-center mb-8">
            <FaRegCreditCard className="text-[#00FF00] text-4xl mr-4" />
            <Text as="h1" size="xlarge" color="accent" className="font-bold">
              Выберите тариф
            </Text>
          </div>
          
          {orderCompleted ? (
            <div className="bg-green-900/30 p-6 rounded-lg border border-green-500 text-center">
              <FaCheck className="text-[#00FF00] text-5xl mx-auto mb-4" />
              <Text size="large" color="accent" className="mb-4 font-bold">
                Заказ оформлен!
              </Text>
              <Text className="mb-4">
                Вы выбрали тариф "{selectedPlan?.name}". Наш менеджер свяжется с вами в ближайшее время.
              </Text>
              <Button 
                color="primary" 
                size="large" 
                title="Вернуться на главную"
                onClick={() => window.location.href = '/'}
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {plans.map(plan => (
                  <div 
                    key={plan.id}
                    className={`p-6 rounded-lg border transition-all ${selectedPlan?.id === plan.id ? 'border-[#00FF00] bg-gray-800 scale-105' : 'border-gray-700 bg-gray-900 hover:border-[#00FF00]/50'} cursor-pointer`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedPlan?.id === plan.id ? 'bg-[#00FF00] text-black' : 'bg-gray-800 text-[#00FF00]'}`}>
                        {plan.id}
                      </div>
                      <Text size="large" color="accent" className="ml-3 font-bold">
                        {plan.name}
                      </Text>
                    </div>
                    <Text size="xlarge" className="mb-4">
                      {plan.price} руб.
                    </Text>
                    <Text size="small" color="secondary" className="mb-4">
                      {plan.duration}
                    </Text>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-[#00FF00] mr-2">✓</span>
                          <Text size="small">{feature}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              {selectedPlan && (
                <div className="flex justify-center">
                  <Button 
                    color="primary" 
                    size="large" 
                    title={`Оформить заказ (${selectedPlan.price} руб.)`}
                    onClick={handleOrder}
                  />
                </div>
              )}
            </>
          )}
        </Container>
      </div>
    </>
  );
};