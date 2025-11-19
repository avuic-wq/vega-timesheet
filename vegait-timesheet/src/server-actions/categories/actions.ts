import { fetchAllTimelogCategories } from "@/src/db/TimelogCategoryService/service";

export async function getAllTimelogCategoriesAction() {
	const categories = await fetchAllTimelogCategories();
	return categories;
}
