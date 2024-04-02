
const relatedProductsHook = (nodes,location) => {
  let selectedProduct = null;
  let arrPagesIdLarger = [];
  let arrPagesIdLess = [];
  const pages = nodes.filter((item) => {
    if(`/${item?.url}/` !== `${location?.pathname}/` && `/${item?.url}/` !== `${location?.pathname}` &&
      `/${item?.url}/` !== `${location?.pathname}/` && `/${item?.url}/` !== `${location?.pathname}/`
    ) {
      item.id = parseInt(item?.id);
      return item
    }else {
      selectedProduct = item;
      selectedProduct.id = parseInt(selectedProduct?.id);
    }
  })

  pages.map((item) => {
    if(item?.id > selectedProduct?.id) {
      arrPagesIdLarger.push(item);
    } else {
      arrPagesIdLess.push(item)
    }
  })
  if(!!arrPagesIdLess) {
    arrPagesIdLarger = arrPagesIdLarger.concat(arrPagesIdLess);
  }

  return arrPagesIdLarger
}

export default relatedProductsHook