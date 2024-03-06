
import { getCollectionById, getCollectionsList } from "@/app/api/collection";
import { ProductList } from "@/components/ProductList";
import { Metadata } from "next";

// export async function generateMetadata({
// 	params,
// }: {
// 	params: { id: string };
// }): Promise<Metadata> {
// 	const collection = await getCollectionById(params.id);

// 	return {
// 		title: collection?.name,
// 		openGraph: {
// 			title: collection?.name,
// 		},
// 	};
// }

export default async function SingleCollectionPage({ params }: { params: { collection: string } }) {
	const collection = await getCollectionById(params.collection);
	
	return (
		<main className="mx-auto min-h-screen max-w-7xl">
			<h1 className="pb-20 text-4xl font-extrabold first-letter:uppercase" role="heading">
				{collection.name}
			</h1>
			<ProductList products={collection.products} />
		</main>
	);
}

export async function generateStaticParams() {
	const collections = await getCollectionsList();

	return collections.map((collection) => ({
		id: collection.id,
	}));
}
