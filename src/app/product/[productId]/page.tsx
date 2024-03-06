import { type Metadata } from "next";
import { addAndPublishReview, getProduct, getReviewsByProductId, getSimilarProductsByCategory } from "@/app/api/product";
import { ProductCoverImage } from "@/components/ProductCoverImage";
import { ProductListItemDescription } from "@/components/ProductListItemDescription";
import { notFound } from "next/navigation";
import { ProductVariant } from "@/components/ProductVariant";
import { cookies } from "next/headers";
import { CartCreateDocument, CartGetByIdDocument } from "@/gql/graphql";
import { Suspense } from "react";
import { Reviews } from "@/components/Reviews";
import { executeGraphql } from "@/app/api/graphql";
import { revalidatePath } from 'next/cache'
import { AddToCartButton } from "@/components/AddToCartButton";

export async function generateMetadata({
	params,
}: {
	params: { productId: string };
}): Promise<Metadata> {
	return {};
}

export default async function SingleProductPage({ params }: { params: { productId: string } }) {
	const { product } = await getProduct(params.productId);

	if (!product) {
		notFound();
	}
	const similarProducts = await getSimilarProductsByCategory(product.categories[0].name);


	const productReviews = await getReviewsByProductId(params.productId)


	async function getCartById(cartId: string) {
		return executeGraphql(CartGetByIdDocument, { id: cartId });
	}

	function createCart(email: string, stripeCheckoutId: string) {
		return executeGraphql(CartCreateDocument, {email: email, stripeCheckoutId: stripeCheckoutId});
	
	}

	const addNewReview=async ({headline,content,name,email,rating}:any)=>{
		"use server"
		addAndPublishReview({id: params.productId, headline, content, name,email,rating});
		revalidatePath("/product/[productId]")
		// fetch(`/webhook?path=/product/${params.productId}`)
	}

	return (
		<div className="mx-auto max-w-2xl">
			<h1>{product.name}</h1>
			<ProductCoverImage src={product.images[0].url} alt={"TODO"} />
			<ProductListItemDescription name={product.name} />
			<p>{product.description}</p>
			{product.variants ? <ProductVariant variants={product.variants} /> : null}
			<AddToCartButton productName={product.name} />
			
			<div data-testid="releated-products">{/* TODO: lista produktów similarProducts */}</div>
		
			
			<Reviews productId={params.productId} reviews={productReviews.product?.reviews} addReviewAction={addNewReview}/>
		</div>
	);
}
