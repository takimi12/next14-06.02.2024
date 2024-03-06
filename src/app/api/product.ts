import { type Product } from "@/model/product";
import { type SearchProduct } from "@/model/searchProduct";
import {
	GetSingleProductDocument,
	ProductGetReviewsByIdDocument,
	ProductGetSimilarDocument,
	ProductsByNameDocument,
	ProductsGetAllPaginatedDocument,
	ReviewAddDocument,
	ReviewPublushAddDocument,
	type TypedDocumentString,
} from "@/gql/graphql";

import { redirect } from "next/navigation";
import { graphql } from "@/gql";
import { executeGraphql } from "./graphql";

export type ProductFromResponse = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: string;
	rating: Rating;
	image: string;
	longDescription: string;
};

type Rating = {
	rate: number;
	count: number;
};

export const getProductsList = async (take?: number) => {
	const takePart = take ? `?take=${take}` : "";
	const res = await fetch(`https://naszsklep-api.vercel.app/api/products${takePart}`);
	const productsResponse = (await res.json()) as ProductFromResponse[];
	const products = productsResponse.map((product): Product => {
		return {
			id: product.id,
			name: product.title,
			price: product.price,
			description: product.description,
			category: product.category,
			image: {
				src: product.image,
				alt: product.title,
			},
		};
	});

	return products;
};

export const getProductsPaginated = async (page: number) => {
	const res = await fetch(
		`https://naszsklep-api.vercel.app/api/products?take=20&offset=${page === 1 ? 0 : page * 20}`,
	);
	const productsResponse = (await res.json()) as ProductFromResponse[];
	const products = productsResponse.map((product): Product => {
		return {
			id: product.id,
			name: product.title,
			price: product.price,
			description: product.description,
			category: product.category,
			image: {
				src: product.image,
				alt: product.title,
			},
		};
	});

	return products;
};

export const getAllProductsPaginated = (currentPage: number, perPage: number) => {
	const skip = (currentPage - 1) * perPage;
	return executeGraphql(ProductsGetAllPaginatedDocument, { skip, first: perPage });
};

export const getProduct = (id: string) => {
	return executeGraphql(GetSingleProductDocument, { id: id });
};

export const getProductsByName = async (name: string): Promise<SearchProduct[]> => {
	const graphqlResponse = await executeGraphql(ProductsByNameDocument, { name: name });

	// Access the products property directly
	const products: SearchProduct[] = graphqlResponse.products;

	return products;
};

export const getSimilarProductsByCategory = (categoryName: string) => {
	return executeGraphql(ProductGetSimilarDocument, { categoryName: categoryName });
};

export const getReviewsByProductId=(productId:string)=>{
	return executeGraphql(ProductGetReviewsByIdDocument, {id: productId})
}

export const addAndPublishReview=async ({id,content,email,headline,name,rating}:{id:string, content: string, email:string,headline:string, name:string, rating: number})=>{
	const {createReview}=await executeGraphql(ReviewAddDocument,{id:id, content: content, headline: headline, email: email, name: name, rating: rating})
	if(createReview){
		const published=await executeGraphql(ReviewPublushAddDocument,{id:createReview?.id})
		console.log("published",published)
	}
	
}