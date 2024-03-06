import { getAllProductsPaginated } from "@/app/api/product";
import { ProductList } from "@/components/ProductList";

// Zmodyfikuj funkcję generującą statyczne parametry
export async function generateStaticParams() {
	const { products } = await getAllProductsPaginated(1, 5);
	const numOfPages = Math.ceil(products.length / 5); // Ustaw ilość produktów na stronie
	const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);
	return pages.map((page) => ({ params: { page: page.toString() } }));
}

// Zmodyfikuj funkcję strony produktów
export default async function ProductsPage({ params }: { params: { page: string } }) {
	const currentPage = parseInt(params.page) || 1; // Pobierz aktualną stronę z parametrów URL
	const perPage = 5; // Ustaw ilość produktów na stronie
	const { products } = await getAllProductsPaginated(currentPage, perPage);

	return <ProductList products={products} />;
}
