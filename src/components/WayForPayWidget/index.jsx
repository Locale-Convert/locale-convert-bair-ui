import React, { useEffect } from 'react';
import { navigate } from "gatsby";

const WayForPayWidget = ({ paymentData, onClose }) => {
  useEffect(() => {
    if (!window.Wayforpay) {
      console.error('WayForPay script not loaded');
      return;
    }

    const wayforpay = new window.Wayforpay();
    
    wayforpay.run(
      paymentData,
      function (response) {
        // Оплата пройшла успішно
        console.log('Approved:', response);
        navigate('/thanks'); // Редирект на сторінку подяки
      },
      function (response) {
        // Оплата відхилена
        console.log('Declined:', response);
        onClose(); // Закриваємо виджет
      },
      function (response) {
        // Оплата в очікуванні або обробці
        console.log('Pending:', response);
        onClose(); // Закриваємо виджет
      }
    );

  }, [paymentData, onClose]);

  return null; // Компонент не рендерить UI, тільки управляє виджетом
};

export default WayForPayWidget;
