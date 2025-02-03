import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, Image } from '@heroui/react';
import DefaultLayout from '@/layouts/default';

interface Destination {
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
}

interface Activity {
	id: string;
	travelDayId: string;
	destinationId: string;
	createdAt: string;
	updatedAt: string;
	destination: Destination;
}

interface TravelDay {
	id: string;
	day: number;
	date: string;
	travelPlanId: string;
	createdAt: string;
	updatedAt: string;
	activities: Activity[];
}

interface Plan {
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
}

const PlanDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [plan, setPlan] = useState<Plan | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchPlanDetail = async () => {
			try {
				const token = localStorage.getItem('access_token');

				if (!token) {
					throw new Error('Token tidak ditemukan');
				}

				const response = await fetch(
					`${import.meta.env.VITE_APP_URL}/plans/${id}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) throw new Error('Failed to fetch plan details');

				const result = await response.json();

				setPlan(result.data);
			} catch (error) {
				setError(error instanceof Error ? error.message : 'An error occurred');
			} finally {
				setLoading(false);
			}
		};

		fetchPlanDetail();
	}, [id]);

	return (
		<DefaultLayout>
			<div className="plan-detail w-full max-w-screen-lg mx-auto py-6">
				<h1 className="text-2xl font-bold mb-4">Plan Details</h1>

				{loading && <p>Loading plan details...</p>}
				{error && <p className="text-red-500">{error}</p>}

				{plan && (
					<Card className="bg-white dark:bg-black p-6 rounded-lg shadow-md">
						<CardBody>
							<h2 className="text-xl font-semibold">{plan.name}</h2>
							<p className="text-sm text-gray-600">{plan.city}</p>
							<div className="mt-4">
								<p>
									<strong>Travel Companion:</strong> {plan.travelCompanion}
								</p>
								<p>
									<strong>Budget:</strong> Rp {plan.budget.toLocaleString()}
								</p>
								<p>
									<strong>Theme:</strong> {plan.travelTheme}
								</p>
								<p>
									<strong>Dates:</strong>{' '}
									{new Date(plan.startDate).toLocaleDateString()} -{' '}
									{new Date(plan.endDate).toLocaleDateString()}
								</p>
								<div>
									<strong>Travel Days:</strong>
									{plan.travelDay.length > 0 ? (
										<ul>
											{plan.travelDay.map((day) => (
												<li key={day.id}>
													<strong>Day {day.day}:</strong>{' '}
													{new Date(day.date).toLocaleDateString()}
													<ul>
														{day.activities.length > 0 ? (
															day.activities.map((activity) => (
																<li key={activity.id}>
																	<Card className="shadow-lg rounded-lg overflow-hidden my-3">
																		<div className="flex flex-row items-center p-4">
																			<Image
																				alt="HeroUI hero Image"
																				src={
																					activity.destination.category.imageUrl
																				}
																				width={124}
																				height={124}
																				className="rounded-md object-cover"
																			/>
																			<div className="flex flex-col ml-2">
																				<p className="text-xl font-semibold text-gray-800">
																					{activity.destination.placeName}
																				</p>
																				<p className="text-sm text-gray-600">
																					{activity.destination.description}
																				</p>
																				<p className="text-sm text-gray-500">
																					{activity.destination.address}
																				</p>
																			</div>
																		</div>
																	</Card>
																</li>
															))
														) : (
															<li>No activities listed</li>
														)}
													</ul>
												</li>
											))}
										</ul>
									) : (
										<p>No travel days listed</p>
									)}
								</div>
							</div>
						</CardBody>
					</Card>
				)}
			</div>
		</DefaultLayout>
	);
};

export default PlanDetail;
