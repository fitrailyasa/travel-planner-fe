import { useEffect, useState } from 'react';
import { Plan } from '@/types/plan';

export default function Itinerary({
	destinationId,
	handleClose,
}: {
	destinationId: string;
	handleClose: () => void;
}) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [plan, setPlan] = useState<Plan[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
	const [selectedTravelDayId, setSelectedTravelDayId] = useState<string | null>(
		null
	);

	useEffect(() => {
		const fetchPlan = async () => {
			try {
				setIsLoading(true);
				const token = localStorage.getItem('access_token');

				if (!token) {
					throw new Error('Token tidak ditemukan');
				}

				const response = await fetch(`${import.meta.env.VITE_APP_URL}/plans`, {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) throw new Error('Failed to fetch plan');

				const result = await response.json();
				setPlan(result.data);
			} catch (error) {
				setError(error instanceof Error ? error.message : 'An error occurred');
			} finally {
				setIsLoading(false);
			}
		};

		fetchPlan();
	}, [destinationId]);

	const handlePlanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedPlanId(event.target.value);
		setSelectedTravelDayId(null);
	};

	const handleTravelDayChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedTravelDayId(event.target.value);
	};

	const handleAddToPlan = async () => {
		if (selectedPlanId && selectedTravelDayId) {
			try {
				const token = localStorage.getItem('access_token');

				if (!token) {
					throw new Error('Token tidak ditemukan');
				}

				const response = await fetch(
					`${import.meta.env.VITE_APP_URL}/plans/destination`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							destinationId: destinationId,
							travelDayId: selectedTravelDayId,
						}),
					}
				);

				if (!response.ok) throw new Error('Failed to fetch plan');

				alert('Successfully added destination to the plan.');
			} catch (error) {
				setError(error instanceof Error ? error.message : 'An error occurred');
			}
		}
	};

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

					{!isLoading && plan && (
						<div>
							<label className="block font-semibold">Select Plan:</label>
							<select
								className="border p-2 w-full mt-1"
								onChange={handlePlanChange}
							>
								<option value="">-- Choose a Plan --</option>
								{plan.map((planItem) => (
									<option key={planItem.id} value={planItem.id}>
										{planItem.name}
									</option>
								))}
							</select>

							{selectedPlanId && (
								<div className="mt-4">
									<label className="block font-semibold">
										Select Travel Day:
									</label>
									<select
										className="border p-2 w-full mt-1"
										onChange={handleTravelDayChange}
									>
										<option value="">-- Choose a Day --</option>
										{plan
											.find((p) => p.id === selectedPlanId)
											?.travelDay.map((day) => (
												<option key={day.id} value={day.id}>
													Day {day.day}
												</option>
											))}
									</select>
								</div>
							)}

							{selectedTravelDayId && (
								<button
									onClick={handleAddToPlan}
									className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
								>
									Add to Plan
								</button>
							)}
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
