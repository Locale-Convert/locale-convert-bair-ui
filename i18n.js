import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const resources = {
    ua: {
        translation: {
            homepage: {
                mainBanner: {
                    title: "Зимовi конверти Bair",
                    text: "Теплий аксесуар для холодної погоди дітям від народження.\
                    Зберігає тепло та захищає дитину від вітру, дощу і снігу."
                },
                promoFirstLeft: {
                    title: "Універсальні прорізи для ременів безпеки",
                    text: "Прорізи на липучках, дозволяють використовувати конверт з різними видами кріплення"
                },
                promoFirstRight: {
                    title: "Затишний капюшон",
                    text: "Глибокий капюшон на кулісці, щільно стягується навколо голови малюка. Знімне хутро."
                },
                promoSecondLeft: {
                    title: "Розстебніть конверт повністю та використовуйте як килимок або м'який матрацик",
                    text: "двосторонні блискавки, повністю або частково відкривають конверт для швидкого доступу до дитини"
                },
                promoSecondRight: {
                    title: "Зовнішня тканина захищає від вітру і мокрого снігу",
                    textOne: "Конверт виготовляється із міцної тканини, яка не продувається вітром і не промокає",
                    textTwo: "Щільний шар утеплювача, надійно зберігає тепло. Усередині м'яка плюшева тканина"
                },
                productList: {
                    title: "Оберіть модель конверту"
                },
                accessoriesBanner: {
                    title: "Доповніть коляску теплим і стильним аксесуаром",
                    text: "Рукавички в колір конверту"
                },
                video: {
                    title: "Вiдео"
                },
                feedback: {
                    title: "Фото-відгуки"
                },
                faq: {
                    title: "Часто запитують"
                }
            },
            menu: {
                convert: 'Конверти',
                gloves: 'Рукавички',
                feedback: 'Відгуки',
                conditions: 'Умови',
                contacts: 'Контакти'
            },
            contactsInfo: {
                firstLine: 'ФОП Парненко Вікторія Юріївна',
                secondLine: 'м. Харків',
                thirdLine: 'тел.: +38 (096) 109-30-40'
            },
            footer: {
                conditions: {
                    text: 'З правилами та умовами роботи магазину можна ознайомитись тут.'
                }
            },
            product: {
                article: 'Артикул',
                color: 'Колір',
                addToBasket: 'Додати в кошик',
                emptyBasket: 'Кошик пустий',
                goTo: 'Перейти',
                placingAnOrder: 'Перейти до оформлення',
                placingAnOrderTwo: 'Оформити замовлення',
                description: 'Опис',
                video: 'Відео',
                relatedProduct: {
                    titleOne: "Разом з конвертом",
                    titleTwo: 'Схожі товари'
                },
                otherModels: 'Інші моделі',
                addCountPosition: 'Додано',
                positionOne: 'позицію',
                positionTwo: 'позиції'
            },
            accessories: {
                otherModels: 'Пропонуємо разом з рукавичками'
            },
            basket: {
                color: 'Колір',
                addPosition: 'Додано {{count}} позиції',
                button: 'Оформити замовлення'
            },
            communicationButton: {
                title: 'Запитати',
                name: 'Ім\'я',
                numberText: 'Залиште свій номер телефону і ми надамо відповіді на всі ваші запитання',
                buttonSend: 'Надicлати повiдомлення'
            },
            orderPage: {
                placingAnOrder: 'Оформлення замовлення',
                contactInfoTitle: 'Ваші контактні дані',
                name: 'Iм\'я',
                surname: 'Прізвище',
                contactNumber: 'Контактний телефон',
                deliveryTitle: 'Виберіть спосіб доставки',
                novaPost: 'Нова Пошта',
                courier: 'Кур\'єром Нової Пошти',
                address: 'Адреса',
                city: 'Місто',
                payTitle: 'Спосіб оплати',
                cashOnDelivery: 'Накладеним платежем (2% комісії) сплачується при отриманні',
                priceProduct: 'Ціна товару',
                comment: 'Коментар',
                deliverySubTitleText: 'Доставка за тарифами Нової пошти',
                all: 'Разом',
                pay: 'Оплатити',
                send: 'Надіслати замовлення',
                sending: 'Відправка...',
                loading: 'Почекайте...',
                department: 'Відділення',
                noOptionsText: 'Немає варіантів',
                errorInvoice: 'При створенні рахунку виникла помилка',
                emptyBasket: 'У вашому кошику немає товарів. Ходімо за покупками!',
                textOne: 'Наші повернення безкоштовні та прості. Якщо щось не так, у вас є 10 днів, щоб надіслати це нам. Дізнайтеся більше в нашій політиці повернення та відшкодування тут.',
                textTwo: 'Докладніше про політику доставки читайте тут.',
                textThree: 'Тобі потрібна допомога? Перейдіть до служби підтримки клієнтів.',
                textFour: 'Ми обробляємо ваші особисті дані для керування вашим замовленням відповідно до Політики конфіденційності Bair.'
            }
        },
    },
    en: {
        translation: {
            homepage: {
                mainBanner: {
                    title: "Winter Bair Blankets",
                    text: "A warm accessory for cold weather for children from birth.\
                    Keeps warm and protects the child from wind, rain, and snow."
                },
                promoFirstLeft: {
                    title: "Universal slots for seat belts",
                    text: "Velcro slots allow you to use the blanket with various types of fastening"
                },
                promoFirstRight: {
                    title: "Cozy hood",
                    text: "A deep hood with a drawstring tightly fits around the baby's head. Removable fur."
                },
                promoSecondLeft: {
                    title: "Unzip the blanket completely and use it as a blanket or soft mattress",
                    text: "Two-way zippers fully or partially open the blanket for quick access to the baby"
                },
                promoSecondRight: {
                    title: "Outer fabric protects from wind and wet snow",
                    textOne: "The blanket is made of durable fabric that is windproof and waterproof",
                    textTwo: "A dense layer of insulation reliably retains heat. Soft plush fabric inside"
                },
                productList: {
                    title: "Choose a blanket model"
                },
                accessoriesBanner: {
                    title: "Complement your stroller with a warm and stylish accessory",
                    text: "Gloves to match the blanket"
                },
                video: {
                    title: "Video"
                },
                feedback: {
                    title: "Photo reviews"
                },
                faq: {
                    title: "Frequently Asked Questions"
                }
            },
            menu: {
                convert: 'Blankets',
                gloves: 'Gloves',
                feedback: 'Reviews',
                conditions: 'Terms',
                contacts: 'Contacts'
            },
            contactsInfo: {
                firstLine: 'Individual Entrepreneur Parnenko Victoria Yuriivna',
                secondLine: 'Kharkiv',
                thirdLine: 'tel.: +38 (096) 109-30-40'
            },
            footer: {
                conditions: {
                    text: 'You can familiarize yourself with the rules and conditions of the store here.'
                }
            },
            product: {
                article: 'Article',
                color: 'Color',
                addToBasket: 'Add to cart',
                emptyBasket: 'Cart is empty',
                goTo: 'Go to',
                placingAnOrder: 'Proceed to checkout',
                placingAnOrderTwo: 'Place an order',
                description: 'Description',
                video: 'Video',
                relatedProduct: {
                    titleOne: "Together with the blanket",
                    titleTwo: 'Similar Products'
                },
                otherModels: 'Other models',
                addCountPosition: 'Added',
                positionOne: 'position',
                positionTwo: 'positions'
            },
            accessories: {
                otherModels: 'Offered together with gloves'
            },
            basket: {
                color: 'Color',
                addPosition: 'Added {{count}} positions',
                button: 'Place an order'
            },
            communicationButton: {
                title: 'Ask',
                name: 'Name',
                numberText: 'Leave your phone number and we will provide answers to all your questions',
                buttonSend: 'Send message'
            },
            orderPage: {
                placingAnOrder: 'Order placement',
                contactInfoTitle: 'Your contact details',
                name: 'Name',
                surname: 'Surname',
                contactNumber: 'Contact phone number',
                deliveryTitle: 'Choose delivery method',
                novaPost: 'Nova Poshta',
                courier: 'Nova Poshta Courier',
                address: 'Address',
                city: 'City',
                payTitle: 'Payment method',
                cashOnDelivery: 'Cash on delivery (2% commission) paid upon receipt',
                priceProduct: 'Product price',
                comment: 'Comment',
                deliverySubTitleText: 'Delivery according to Nova Poshta tariffs',
                all: 'All',
                pay: 'Pay',
                send: 'Send order',
                sending: 'Sending...',
                loading: 'Please wait...',
                department: 'Department',
                noOptionsText: 'No options',
                errorInvoice: 'An error occurred while creating the invoice',
                emptyBasket: 'Your cart is empty. Let\'s go shopping!',
                textOne: 'Our returns are free and easy. If something is wrong, you have 10 days to send it back to us. Learn more in our return and refund policy here.',
                textTwo: 'Read more about the delivery policy here.',
                textThree: 'Need help? Contact customer support.',
                textFour: 'We process your personal data to manage your order in accordance with the Bair Privacy Policy.'
            }
        },
    },

    pl: {
        mainBanner: {
            title: "Зимовi конверти Bair",
            text: "Теплий аксесуар для холодної погоди дітям від народження.\
            Зберігає тепло та захищає дитину від вітру, дощу і снігу."
        }
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'ua',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
