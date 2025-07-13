import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../features/products/productSlice";
import Loader from "../components/ui/Loader";
import ProductImages from "../components/products/ProductImages";
import ProductInfo from "../components/products/ProductInfo";
import Reviews from "../components/reviews/Reviews";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Corrected selector to match Redux state
  const {
    productDetails: product,
    loading: status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  console.log("Current state:", { product, status, error });

  if (status) return <Loader />;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-red-500 text-xl">Error loading product</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ProductImages images={product.images} />
        <ProductInfo product={product} />
      </div>
      <Reviews productId={id} reviews={product.reviews} />
    </div>
  );
};

export default ProductDetails;
