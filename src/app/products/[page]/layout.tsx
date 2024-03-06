import { getProductsList } from "@/app/api/product";
import { Pagination } from "@/components/Pagination";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	//TODO: zamienić na graphql
	const products = await getProductsList();
	const numOfPages = Math.ceil(products.length / 20);
	return (
		<>
			<section>{children}</section>
			<Pagination numOfPages={numOfPages} />
		</>
	);
}
