import { v4 as uuidv4 } from 'uuid';
import { navigate } from "gatsby";

const wayForPay = (products, merch) => {
    const orderDate = Math.floor(Date.now() / 1000);
    const totalAmount = products.reduce((total, product) => {
        return total + product.price * product.count;
    }, 0);

    const generateSixDigitOrderReference = () => {
        const uuid = uuidv4();
        return parseInt(uuid.slice(0, 6), 16).toString().slice(0, 6);
    };

    const requestData = {
        transactionType: 'CREATE_INVOICE',
        merchantAccount: 'konverty_bair_ua',
        merchantAuthType: 'SimpleSignature',
        merchantDomainName: 'konverty.bair.ua',
        apiVersion: 1,
        language: 'ua',
        serviceUrl: 'http://serviceurl.com',
        orderReference: generateSixDigitOrderReference(),
        orderDate: orderDate,
        amount: totalAmount,
        currency: 'UAH',
        orderTimeout: 86400,
        productId: products.map(product => product.id),
        productName: products.map(product => `${product.article} ${product.title}, ${product.color}`),
        productPrice: products.map(product => product.price),
        productCount: products.map(product => product.count),
        paymentSystems: 'card;googlePay;applePay;privat24',
        clientFirstName: merch.surname,
        clientLastName: merch.name,
        clientEmail: merch.email,
        clientPhone: merch.phone,
    };

    const makePaymentRequest = async () => {
        try {
            const response = await fetch('https://eox7477khoxvpvg.m.pipedream.net', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const data = await response.json();
                navigate(data.data.invoiceUrl);
            } else {
                console.log('Error:', response.statusText);
            }
        } catch (error) {
            console.log('error', error);
        }    
    };

    makePaymentRequest();
};

export default wayForPay;


// try {
//     const urlProducts = 'https://converty-bair.herokuapp.com/products';
//     const urlAccessories = 'https://converty-bair.herokuapp.com/accessories';

//     const responseProducts = await axios.get(urlProducts);
//     const responseAccessories = await axios.get(urlAccessories);

//     const productsData = responseProducts.data;
//     const accessoriesData = responseAccessories.data;

//     const data = [
//       ...productsData,
//       ...accessoriesData
//     ];

//     // Порівняння цін та оновлення даних
//     requestData.productPrice.forEach((price, index) => {
//       const productId = requestData.productId[index];

//       const productFromDatabase = data.find((product) => product.id === productId);
//       if (productFromDatabase && productFromDatabase.price !== price) {
//         // Оновлення ціни, якщо ціна відмінна
//         requestData.productPrice[index] = productFromDatabase.price;
//       }
//     });

//     const updatedData = {
//       ...requestData,
//       merchantSignature: generatedSignature,
//     };

//     return updatedData;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return requestData;
//   }