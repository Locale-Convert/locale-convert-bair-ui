export function formatData(data, isCybex) {
  let result = '';

  result += `Cybex: ${isCybex ? 'Да;' : 'Нет;'}\n\n`;

  for (let i = 0; i < data.length; i++) {
      result += `Товар: ${i + 1};\n`;
      result += `Артикул: ${data[i].article};\n`;
      result += `Назва: ${data[i].title};\n`;
      result += `Ціна: ${data[i].price} грн;\n`;
      result += `Стара ціна: ${data[i].oldPrice} грн;\n`;
      result += `Колір: ${data[i].color};\n`;
      result += `Кількість: ${data[i].count};\n`;
      result += '            \n';
  }

  return result;
}