"use client";

import { addAndPublishReview } from "@/app/api/product";
import { useOptimistic } from "react";

type ReviewsProps = {
	productId: string;
	reviews: any[];
};

export const Reviews = ({ productId, reviews, addReviewAction }: ReviewsProps) => {

	const [productReviews,setProductReviews]=useOptimistic(
		reviews,
		//@ts-ignore
		(_state,newReview)=>{
			return [..._state,newReview]
		}
	)


	//pobieranie recenzji
	//dodawanie recenzji
	const addReview = async (event) => {
		event.preventDefault()
		const headline=event.target.headline.value
		const content=event.target.content.value
		const rating=Number(event.target.rating.value)
		const name=event.target.name.value
		const email=event.target.email.value

		setProductReviews({headline,content,rating,name,email})
		addReviewAction({headline,content,rating,name,email})
	};

	return (
		<>
			<form onSubmit={addReview} data-testid="add-review-form">
				<input type="text" name="headline" placeholder="Headline" />
				<input type="text" name="content" placeholder="Content" />
				<input type="text" name="rating" placeholder="Rating" />
				<input type="text" name="name" placeholder="Name" />
				<input type="email" name="email" placeholder="Email" />
				<button type="submit">Wyślij</button>
			</form>
			{productReviews && productReviews.map((el,index) => (
				<div key={el.name}>
					<p>Headline: {el.headline}</p>
					<p>Content: {el.content}</p>
					<p>Name: {el.name}</p>
					<p>Email: {el.email}</p>
					<p>Rating: {el.rating}</p>
				</div>
			))}
		</>
	);
};
