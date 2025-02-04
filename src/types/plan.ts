export type Destination = {
	id: string;
	placeName: string;
	description: string;
	address: string;
	categoryId: string;
	createdAt: string;
	updatedAt: string;
	category: {
		imageUrl: string;
	};
};

export type Activity = {
	id: string;
	travelDayId: string;
	destinationId: string;
	createdAt: string;
	updatedAt: string;
	destination: Destination;
};

export type TravelDay = {
	id: string;
	day: number;
	date: string;
	travelPlanId: string;
	createdAt: string;
	updatedAt: string;
	activities: Activity[];
};

export type Plan = {
	id: string;
	name: string;
	city: string;
	travelCompanion: string;
	budget: number;
	travelTheme: string;
	startDate: string;
	endDate: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
	travelDay: TravelDay[];
};

export type Place = {
	nama_tempat: string;
	deskripsi: string;
	kategori: string;
	alamat: string;
};

export type ItineraryData = {
	[key: string]: Place[];
};
