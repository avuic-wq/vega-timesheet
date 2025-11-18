export interface BaseItem {
	id: string;
	name: string;
}

export interface ClientItem extends BaseItem {
	countryCode: string;
}

export interface ProjectItem extends BaseItem {
	clientName: string;
	industryName: string;
}
