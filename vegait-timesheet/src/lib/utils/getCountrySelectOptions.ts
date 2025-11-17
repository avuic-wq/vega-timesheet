import { getCountryDataList } from "countries-list";

const countriesData = getCountryDataList();

export const getCountrySelectOptions = () => {
	return Object.values(countriesData).map((countryData) => {
		return { label: countryData.name, value: countryData.iso2 };
	});
};
