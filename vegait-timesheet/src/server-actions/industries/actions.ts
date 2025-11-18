import { fetchAllIndustries } from "@/src/app/db/IndustryService/service";
import type { GetAllIndustriesActionResult } from "@/src/server-actions/industries/types";

// TO-DO: Error handling
export async function getAllIndustriesAction(): GetAllIndustriesActionResult {
	try {
		const allIndustries = await fetchAllIndustries();
		return allIndustries;
	} catch (error) {}
}
