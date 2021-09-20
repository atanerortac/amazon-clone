import React from "react";
import RecommendedProduct from "../../components/RecommendedProduct";
import Header from "../../components/Header";
import ProductDetail from "../../components/ProductDetail";

const details = ({ product, category }) => {
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className=" flex-grow m-5 shadow-sm">
          <ProductDetail product={product} />
          <RecommendedProduct id={product.id} category={category} />
          {console.log(category)}
        </div>
      </main>
    </div>
  );
};

export default details;
export const getStaticPaths = async () => {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );
  const paths = products.map((item) => {
    return {
      params: { id: item.id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async (context) => {
  const id = context.params.id;
  // const session = await getSession(context);
  const product = await fetch("https://fakestoreapi.com/products/" + id).then(
    (res) => res.json()
  );
  const category = await fetch(
    "https://fakestoreapi.com/products/category/" + product.category
  ).then((res) => res.json());

  return {
    props: {
      product: product,
      category: category,
    },
  };
};
