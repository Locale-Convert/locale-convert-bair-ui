import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { navigate } from "gatsby";

const wayForPay = (products, merch) => {
    const productNames = products.map(product => `(${product.article}) ${product.title}, ${product.color};`);
    const productPrices = products.map(product => product.price);
    const productId = products.map(product => product.id);
    const productCounts = products.map(product => product.count);
    const orderDate = Math.floor(new Date().getTime() / 1000);
    const totalAmount = productPrices.reduce((total, price, index) => {
        return total + price * productCounts[index];
    }, 0);
    const generateSixDigitOrderReference = () => {
        const uuid = uuidv4();
        const sixDigitReference = parseInt(uuid.slice(0, 6), 16).toString().slice(0, 6);
        return sixDigitReference;
    };

    const requestData = {
        transactionType: 'CREATE_INVOICE',
        merchantAccount: 'konverty_bair_ua',
        merchantAuthType: 'SimpleSignature',
        merchantDomainName: 'konverty.bair.ua',
        productId: productId,
        apiVersion: 1,
        language: 'ua',
        serviceUrl: 'http://serviceurl.com',
        orderReference: generateSixDigitOrderReference(),
        orderDate: orderDate,
        amount: totalAmount,
        currency: 'UAH',
        orderTimeout: 86400,
        productName: productNames,
        productPrice: productPrices,
        productCount: productCounts,
        paymentSystems: 'card;privat24',
        clientFirstName: merch.surname,
        clientLastName: merch.name,
        clientEmail: merch.email,
        clientPhone: merch.phone,
    };

    const makePaymentRequest = async () => {
        try {
            const apiResponse = await axios.post('https://eox7477khoxvpvg.m.pipedream.net', requestData);
            if(apiResponse.status === 200) {
                navigate(apiResponse.data.data.invoiceUrl);
            }
        } catch (error) {
            console.log('error', error);
        }    
    }

    makePaymentRequest();
};

export default wayForPay;

