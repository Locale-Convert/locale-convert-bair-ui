import { v4 as uuidv4 } from 'uuid';

export const createWayForPayRequest = async (products, merch) => {
    const orderDate = Math.floor(Date.now() / 1000);
    const totalAmount = products.reduce((total, product) => {
        return total + product.price * product.count;
    }, 0);

    const generateSixDigitOrderReference = () => {
        const uuid = uuidv4();
        return parseInt(uuid.slice(0, 6), 16).toString().slice(0, 6);
    };

    const domain = typeof window !== 'undefined' ? window.location.hostname : 'konverty.bair.ua';
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://konverty.bair.ua';

    const requestData = {
        transactionType: 'PURCHASE',
        merchantAccount: 'konverty_bair_ua',
        merchantAuthType: 'SimpleSignature',
        merchantDomainName: domain,
        merchantTransactionSecureType: 'AUTO', // ДОБАВЛЕНО
        apiVersion: 1,
        language: 'ua',
        returnUrl: `${origin}/thanks`,
        serviceUrl: 'https://konverty.bair.ua/service',
        orderReference: generateSixDigitOrderReference(),
        orderDate: orderDate,
        amount: totalAmount,
        currency: 'UAH',
        orderTimeout: 86400,
        productId: products.map(product => product.id),
        productName: products.map(product => `${product.article} ${product.title}, ${product.color}`),
        productPrice: products.map(product => product.price),
        productCount: products.map(product => product.count),
        paymentSystems: 'card;googlePay;applePay;privat24;payPartsMono;payPartsPrivat',
        clientFirstName: merch.surname,
        clientLastName: merch.name,
        clientEmail: merch.email,
        clientPhone: merch.phone,
    };

    try {
        const response = await fetch('/api/wayforpay-proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (response.ok) {
            // Теперь прокси возвращает подписанный объект напрямую
            const signedData = await response.json();
            return signedData;
        } else {
            console.log('Error:', response.statusText);
            throw new Error('Failed to get signature from proxy');
        }
    } catch (error) {
        console.log('error', error);
        throw error;
    }
};
