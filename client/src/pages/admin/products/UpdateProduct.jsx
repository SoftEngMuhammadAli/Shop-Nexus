import React from "react";

const UpdateProductPage = () => {
  return (
    <div>
      Update Product Page
      <form>
        <div>
          <label htmlFor="productName">Product Name</label>
          <input type="text" id="productName" name="productName" />
        </div>
        <div>
          <label htmlFor="productPrice">Product Price</label>
          <input type="number" id="productPrice" name="productPrice" />
        </div>
        <div>
          <label htmlFor="productDescription">Product Description</label>
          <textarea
            id="productDescription"
            name="productDescription"
          ></textarea>
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProductPage;
