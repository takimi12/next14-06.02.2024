import { getAllProductsPaginated, getProduct, getProductsList } from "@/app/api/product";
import { ProductList } from "@/components/ProductList";

export default async function ProductsPage() {
	const { products } = await getAllProductsPaginated(1, 20);

	return (
		<>
			<div className="mb-12 py-24 text-center">
				<h1 className="text-5xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
				<p className="mx-auto mt-4 max-w-3xl text-xl text-gray-500">
					Thoughtfully designed objects for the workspace, home, and travel.
				</p>
			</div>
			<ProductList products={products} />
		</>
	);
}
