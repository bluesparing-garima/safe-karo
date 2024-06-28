import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";
import { ADD, header } from "../../../../context/constant";
import { ICategoryForm } from "../ICategory";
import AddCategoryForm from "./AddCategoryForm";
import getCategoryDetailsService from "../../../../api/Category/GetCategoryDetails/getCategoryDetailsService";
import { convertICategoryVMToICategoryForm } from "../../../../api/Category/convertICategoryVMToICategoryForm";

const AddCategory = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const isAdd = pathName[pathName.length - 1] === ADD;
  const [editCategoryDetails, setEditCategoryDetails] = useState<ICategoryForm | undefined>(
    undefined
  );

  useEffect(() => {
    if (!isAdd && categoryId) {
      getCategoryDetailsService({ header, categoryId })
        .then((categoryDetails) => {
          const categoryVMToCategoryForm = convertICategoryVMToICategoryForm(categoryDetails);
          setEditCategoryDetails(categoryVMToCategoryForm);
        })
        .catch((error) => {
          console.error("Failed to fetch category details", error);
        });
    }
  }, [isAdd, categoryId]);

  const title = isAdd ? "Add Category" : "Update Category";

  return (
    <div className="bg-blue-200 p-7">
      <Paper
        elevation={3}
        style={{ padding: 20, margin: 30, borderRadius: 10 }}
      >
        <Typography className="text-safekaroDarkOrange" variant="h5">
          {title}
        </Typography>
        <Typography variant="h5" mb={2}>
          <Link to="/dashboard" className="text-addButton font-bold text-sm">
            Dashboard {" / "}
          </Link>
          <Link to="/category" className="text-addButton font-bold text-sm">
            Categories /
          </Link>
          <span className="text-grey-600 text-sm"> {title}</span>
          <hr
            className="mt-4"
            style={{ width: "100%", borderColor: "grey-800" }}
          />
        </Typography>

        <AddCategoryForm
          initialValues={{
            id: isAdd ? "0" : editCategoryDetails?.id || "",
            categoryName: isAdd ? "" : editCategoryDetails?.categoryName || "",
            createdBy: "Admin",
          }}
        />
      </Paper>
    </div>
  );
};

export default AddCategory;
