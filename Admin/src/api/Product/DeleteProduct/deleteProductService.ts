import deleteProductAPI from "./deleteProductAPI";
import { DeleteProductProps } from "../getProductsTypes";

const deleteProductService = async ({
  header,
  productId,
  products,
}: DeleteProductProps) => {
  return deleteProductAPI({
    header,
    productId,
    products,
  })
    .then(() => {
      const deletedProductIndex = products.findIndex((product) => product._id === productId);
      //Remove this Why becasue i dont want to call Get API in display layer
      products.splice(deletedProductIndex, 1);
      return products;
    })
    .catch((response) => {
      console.error(
        `deleteProductAPI failed with http status = ${response.status}`
      );
      return Promise.reject(response);
    });
};

export default deleteProductService;
