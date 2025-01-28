export const addToLocalStorage = (product, article) => {    
    const { id,title, url, price, oldPrice, colorSlider, mainImage, color = '', updatedAt } = product;

    if (typeof window !== 'undefined') {
        const existingProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
        const selectedColor = color ? product : colorSlider.find(color => color.article === article);

        let totalAmount = 0;

        if (selectedColor) {
            const existingProductIndex = existingProducts.findIndex(item => item.article === article);

            if (existingProductIndex !== -1) {
                existingProducts[existingProductIndex].count += 1;
            } else {
                const productWithSelectedColor = {
                    id,
                    title,
                    url,
                    price : selectedColor.colorPrice ? selectedColor.colorPrice : price,
                    oldPrice : selectedColor.colorOldPrice ? selectedColor.colorOldPrice : oldPrice,
                    color: selectedColor.color,
                    article,
                    updatedAt,
                    mainImage: selectedColor.imageColor,
                    count: 1
                };

                existingProducts.push(productWithSelectedColor);
            }
        } else {
            const existingProductIndex = existingProducts.findIndex(item => item.article === article);

            if (existingProductIndex !== -1) {
                existingProducts[existingProductIndex].count += 1;
            } else {
                existingProducts.push({ ...product, count: 1 });
            }
        }

        existingProducts.forEach(product => {
            totalAmount += Number(product.price) * (product.count || 1);
        });

        localStorage.setItem('selectedProducts', JSON.stringify(existingProducts));
        localStorage.setItem('totalAmount', totalAmount);
        return existingProducts;
    }
};
