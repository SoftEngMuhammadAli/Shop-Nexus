import { useEffect } from "react";
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
  const { product, status } = useSelector(
    (state) => state.products.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  if (status === "loading") return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      {product && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ProductImages images={product.images} />
            <ProductInfo product={product} />
          </div>
          <Reviews productId={id} reviews={product.reviews} />
        </>
      )}
    </div>
  );
};

export default ProductDetails;
