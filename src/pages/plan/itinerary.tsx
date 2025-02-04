import { useEffect, useState } from 'react';
import { ItineraryData } from '@/types/plan';

export default function Itinerary({
	planId,
	handleClose,
}: {
	planId: string;
	handleClose: () => void;
}) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchItinerary = async () => {
			try {
				setIsLoading(true);
				const token = localStorage.getItem('access_token');

				if (!token) {
					throw new Error('Token tidak ditemukan');
				}

				const response = await fetch(
					`${import.meta.env.VITE_APP_URL}/plans/${planId}/itinerary`,
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) throw new Error('Failed to create itinerary');

				const result = await response.json();
				setItinerary(result.data);
			} catch (error) {
				setError(error instanceof Error ? error.message : 'An error occurred');
			} finally {
				setIsLoading(false);
			}
		};

		fetchItinerary();
	}, [planId]);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-3xl h-[80vh] flex flex-col">
				<div className="flex justify-between items-center border-b pb-2">
					<h2 className="text-xl font-bold">Itinerary Details</h2>
					<button onClick={handleClose} className="text-red-500 font-semibold">
						✕
					</button>
				</div>

				<div className="flex-1 overflow-y-auto p-2">
					{isLoading && <p>Loading...</p>}
					{error && <p className="text-red-500">{error}</p>}

					{!isLoading && itinerary && (
						<div>
							{Object.entries(itinerary).map(([day, places]) => (
								<div key={day} className="mb-4">
									<h3 className="font-semibold text-lg">{day}</h3>
									<ul className="list-disc pl-5">
										{places.map((place, index) => (
											<li key={index} className="mt-2">
												<p className="font-semibold">{place.nama_tempat}</p>
												<p className="text-gray-600">{place.deskripsi}</p>
												<p className="text-sm text-gray-500">
													{place.kategori} - {place.alamat}
												</p>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="border-t pt-2 flex justify-end">
					<button
						onClick={handleClose}
						className="bg-red-500 text-white px-4 py-2 rounded"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
