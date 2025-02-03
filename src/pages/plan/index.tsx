import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardFooter } from '@heroui/react';

import DefaultLayout from '@/layouts/default';

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
	travelDay: string[];
}

const Plan: React.FC = () => {
	const [plans, setPlans] = useState<Plan[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPlans = async () => {
			try {
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

				if (!response.ok) throw new Error('Failed to fetch plans');

				const result = await response.json();

				if (!Array.isArray(result.data)) {
					throw new Error('Data yang diterima bukan array!');
				}

				setPlans(result.data);
			} catch (error) {
				setError(error instanceof Error ? error.message : 'An error occurred');
			} finally {
				setLoading(false);
			}
		};

		fetchPlans();
	}, []);

	return (
		<DefaultLayout>
			<div className="plans-page w-full max-w-screen-lg mx-auto py-6">
				<h1 className="text-2xl font-bold mb-4">Plans</h1>
				<p className="mb-6">Here are your travel plans:</p>

				{loading && <p>Loading plans...</p>}
				{error && <p className="text-red-500">{error}</p>}

				{!loading && !error && (
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{plans.map((plan) => (
							<Card
								key={plan.id}
								isPressable
								onClick={() => navigate(`/plans/${plan.id}`)}
								className="bg-white dark:bg-black p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
								shadow="sm"
							>
								<CardBody>
									<h2 className="text-xl font-semibold">{plan.name}</h2>
									<p className="text-sm text-gray-600">{plan.city}</p>
									<div className="mt-4">
										<p>
											<strong>Travel Companion:</strong> {plan.travelCompanion}
										</p>
										<p>
											<strong>Budget:</strong> Rp {plan.budget}
										</p>
										<p>
											<strong>Theme:</strong> {plan.travelTheme}
										</p>
										<p>
											<strong>Dates:</strong>{' '}
											{new Date(plan.startDate).toLocaleDateString()} -{' '}
											{new Date(plan.endDate).toLocaleDateString()}
										</p>
									</div>
								</CardBody>
								<CardFooter className="flex flex-col items-start p-4">
									{/* Additional Footer content if needed */}
								</CardFooter>
							</Card>
						))}
					</div>
				)}
			</div>
		</DefaultLayout>
	);
};

export default Plan;
