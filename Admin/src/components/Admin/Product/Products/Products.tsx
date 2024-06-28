import { useCallback, useEffect, useMemo, useState } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { DAYJS_DISPLAY_FORMAT, header } from "../../../../context/constant";
import { IProductForm, IProducts, IProductsVM } from "../IProduct";
//import dayjs from "dayjs";
import { Button, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  productAddPath,
  productEditPath,
  productSubTypesDirectAddPath,
} from "../../../../sitemap";
import deleteProductService from "../../../../api/Product/DeleteProduct/deleteProductService";
import dayjs from "dayjs";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import getProductsService from "../../../../api/Product/GetProducts/getProductsService";
import { convertIProductVMToIProductForm } from "../../../../api/Product/convertIProductVMToIProductForm";
import editProductService from "../../../../api/Product/EditProduct/editProductService";
const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProducts] = useState<IProducts[]>([]);
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate(productAddPath());
  };
  const GetProducts = useCallback(
    () =>
      getProductsService({ header })
        .then((productsDetails) => {
          setProducts(productsDetails.data);
        })
        .catch((error) => {
          console.error("Failed to fetch product details", error);
        }),
    []
  );
  useEffect(() => {
    GetProducts();
  }, [GetProducts]);
  const callUpdateProductAPI = async (product: IProductsVM) => {
    var convertProductVMToProductForm =
      convertIProductVMToIProductForm(product);

    const productData: IProductForm = {
      ...convertProductVMToProductForm,
      isActive: !convertProductVMToProductForm.isActive,
    };

    editProductService({ header, product: productData })
      .then(() => {
        GetProducts();
      })
      .catch((response) => {})
      .finally(() => {
        updateLoading();
      });
  };

  const handleClickChangeStatus = (product: IProductsVM) => {
    callUpdateProductAPI(product);
  };
  const [forcedRenderCount, setForcedRenderCount] = useState(0);
  const forceRender = useCallback(
    () => setForcedRenderCount(forcedRenderCount + 1),
    [forcedRenderCount]
  );
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<IProducts>[]>(
    () => [
      {
        accessorKey: "categoryName", //normal accessorKey
        header: "Category Name",
        size: 200,
      },
      {
        accessorKey: "productName", //normal accessorKey
        header: "Product Name",
        size: 200,
      },
      {
        header: "Status",
        accessorKey: "isActive",
        size: 50,
        Cell: ({ cell }) => {
          const value = cell.getValue<boolean>();
          return value ? (
            <CheckCircleOutlineIcon color="success" />
          ) : (
            <CancelOutlinedIcon color="error" />
          );
        },
      },

      {
        header: "Created On",
        accessorKey: "createdOn",
        size: 50,
      },
    ],
    []
  );

  const parsedData = useMemo(
    () =>
      productData.map(
        (product: IProducts) =>
          ({
            id: product._id,
            categoryId: product.categoryId,
            categoryName: product.categoryName,
            productName: product.productName,
            isActive: product.isActive,
            createdOn: dayjs(product.createdOn).format(DAYJS_DISPLAY_FORMAT),
            updatedOn: dayjs(product.updatedOn).format(DAYJS_DISPLAY_FORMAT),
            forceUpdate: forcedRenderCount,
          } as IProductsVM)
      ) ?? [],
    [productData, forcedRenderCount]
  );

  const updateLoading = useCallback(async () => {
    // setIsLoading(true) when products.length is 0, and setIsLoading(false) when products.length is > 0
    setIsLoading(productData.length >= 0 ? false : true);
  }, [productData]);

  useEffect(() => {
    updateLoading();
  }, [updateLoading]);

  const handleClickDeleteProduct = (product: IProductsVM) => {
    productDeleteApiCall(product.id!);
  };
  const handleClickEditProduct = (product: IProductsVM) => {
    navigate(productEditPath(product.id!));
  };
  const handleClickAddProductSubCategory = (product: IProductsVM) => {
    navigate(productSubTypesDirectAddPath(product.id!), {
      state: product,
    });
  };

  const productDeleteApiCall = async (productId: string) => {
    setIsLoading(true);
    deleteProductService({ header, productId, products: productData })
      .then((refreshedProducts) => {
        setProducts(refreshedProducts);
        forceRender();
      })
      .catch((response: any) => {})
      .finally(() => {
        updateLoading();
      });
  };
  return (
    <>
      <div className="bg-blue-200 p-7">
        <Paper elevation={3} style={{ padding: 30 }}>
          <Typography className="text-safekaroDarkOrange" variant="h5">
            Product Table
          </Typography>
          <Typography variant="h5" mb={2}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <Link
                  to="/dashboard"
                  className="text-addButton font-bold text-sm"
                >
                  Dashboard /
                </Link>
                <span className="text-grey-600 text-sm"> Product</span>
              </div>
              <Button
                type="button"
                className="w-26 h-10 bg-addButton text-white p-3 text-xs rounded-sm"
                onClick={handleAddProductClick}
              >
                Add Product
              </Button>
            </div>
            {/* Add a full-width grey line here */}
            <hr
              className="mt-4"
              style={{ width: "100%", borderColor: "grey-800" }}
            />
          </Typography>
          <MaterialReactTable
            state={{ isLoading }}
            columns={columns}
            data={parsedData}
            enableRowActions
            positionActionsColumn="last"
            renderRowActions={({ row }) => (
              <div style={{ display: "flex", flexWrap: "nowrap" }}>
                <Tooltip title={"Edit Product"}>
                  <IconButton
                    color="primary"
                    aria-label={"Edit Product"}
                    component="span"
                    onClick={() => {
                      handleClickEditProduct(row.original as IProductsVM);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5 text-addButton"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
                <Tooltip title={"Change Status"}>
                  <IconButton
                    color="primary"
                    aria-label={"Change Status"}
                    component="span"
                    onClick={() =>
                      handleClickChangeStatus(row.original as IProductsVM)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5 text-addButton"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
                {/* <Tooltip title={"Add Sub Product"}>
                  <IconButton
                    color="primary"
                    aria-label={"Add Sub Product"}
                    component="span"
                    onClick={() => {
                      handleClickAddProductSubCategory(
                        row.original as IProductsVM
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5 text-addButton"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9m0 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25m-2.25 0h-2.25m0 0v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v4.964m12-4.006v4.006m0 0v3.75m-12-7.756v3.75m0 0h12m-12 0V14.25m12-4.5V9"
                      />
                    </svg>
                  </IconButton>
                </Tooltip> */}
                <Tooltip title={"Delete Product"}>
                  <IconButton
                    color="primary"
                    aria-label={"Delete Product"}
                    component="span"
                    onClick={() =>
                      handleClickDeleteProduct(row.original as IProductsVM)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5 text-safekaroDarkOrange"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
              </div>
            )}
          />
        </Paper>
      </div>
    </>
  );
};

export default Products;
