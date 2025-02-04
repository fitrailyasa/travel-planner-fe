import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, Image, Button } from '@heroui/react';
import DefaultLayout from '@/layouts/default';
import { Plan } from '@/types/plan';
import Itinerary from './itinerary';

const PlanDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [plan, setPlan] = useState<Plan | null>(null);
	const [isRequest, setIsRequest] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [refresh, setRefresh] = useState<number>(0);

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
	}, [id, refresh]);

	const requestItinerary = () => {
		setIsRequest(true);
	};

	const handleCloseItinerary = () => {
		setIsRequest(false);
		setRefresh((prev) => prev + 1);
	};

	return (
		<DefaultLayout>
			{isRequest && plan?.id && (
				<Itinerary
					planId={plan.id}
					handleClose={handleCloseItinerary}
					key={refresh}
				/>
			)}
			<div className="plan-detail w-full max-w-screen-lg mx-auto py-6">
				<div className="flex flex-row">
					<h1 className="text-2xl font-bold mb-4">Plan Details</h1>
					<Button
						className="ml-auto"
						color="default"
						onPress={requestItinerary}
					>
						Request Itinerary
					</Button>
				</div>

				{loading && <p>Loading plan details...</p>}
				{error && <p className="text-red-500">{error}</p>}

				{plan && (
					<Card className="bg-white dark:bg-black p-6 rounded-lg shadow-md">
						<CardBody>
							<div className="">
								<h2 className="text-2xl font-semibold">{plan.name}</h2>
								{new Date(plan.startDate).toLocaleDateString()} -{' '}
								{new Date(plan.endDate).toLocaleDateString()}
							</div>
							<p className="text-xl text-gray-600">{plan.city}</p>

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
								<div className="mt-3">
									{plan.travelDay.length > 0 ? (
										<ul>
											{plan.travelDay.map((day) => (
												<li key={day.id}>
													<div className="flex flex-row">
														<strong className="text-xl">Day {day.day}:</strong>{' '}
														<p className="text-xl ml-2">
															{new Date(day.date).toLocaleDateString()}
														</p>
													</div>
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
