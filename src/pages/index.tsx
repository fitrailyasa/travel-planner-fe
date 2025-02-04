import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, Image } from '@heroui/react';

import DefaultLayout from '@/layouts/default';
import AddDestination from './AddDestination';
interface Destination {
	id: string;
	placeName: string;
	description: string;
	address: string;
	categoryId: number;
}

interface Category {
	id: number;
	name: string;
	imageUrl: string;
}

export default function IndexPage() {
	const [destinations, setDestinations] = useState<Destination[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [destinationId, setDestinationId] = useState<string | null>(null);

	useEffect(() => {
		const fetchDestinations = async () => {
			try {
				const token = localStorage.getItem('access_token');

				if (!token) {
					throw new Error('Token tidak ditemukan');
				}

				const response = await fetch(
					`${import.meta.env.VITE_APP_URL}/destinations`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) throw new Error('Failed to fetch destinations');

				const result = await response.json();

				if (!Array.isArray(result.data)) {
					throw new Error('Data yang diterima bukan array!');
				}

				setDestinations(result.data);
			} catch (error) {
				setError(error instanceof Error ? error.message : 'An error occurred');
			}
		};

		const fetchCategories = async () => {
			try {
				const token = localStorage.getItem('access_token');

				if (!token) {
					throw new Error('Token tidak ditemukan');
				}

				const response = await fetch(
					`${import.meta.env.VITE_APP_URL}/categories`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				if (!response.ok) throw new Error('Failed to fetch categories');

				const result = await response.json();

				setCategories(result.data);
			} catch (error) {
				setError(error instanceof Error ? error.message : 'An error occurred');
			}
		};

		const fetchData = async () => {
			await Promise.all([fetchDestinations(), fetchCategories()]);
			setLoading(false);
		};

		fetchData();
	}, []);

	const handleAddToPlan = (planId: string) => {
		setDestinationId(planId);
	};

	const handleClose = () => {
		setDestinationId(null);
	};

	return (
		<DefaultLayout>
			{destinationId && (
				<AddDestination
					destinationId={destinationId}
					handleClose={handleClose}
				/>
			)}
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<Button
					as="a"
					className="text-white"
					color="success"
					href="/plans/create"
				>
					Create Plan <span className="font-bold text-2xl mb-1.5">+</span>
				</Button>
				<Button as="a" color="primary" href="/plans">
					See All Plan
				</Button>
				<h1 className="text-2xl font-bold">Destinations</h1>

				{loading && <p>Loading destinations...</p>}
				{error && <p className="text-red-500">{error}</p>}

				{!loading && !error && (
					<div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{destinations.map((destination) => {
							const category = categories.find(
								(cat) => cat.id === destination.categoryId
							);

							return (
								<Card key={destination.placeName} isPressable shadow="sm">
									<CardBody className="overflow-hidden p-0">
										<Image
											alt={destination.placeName}
											className="w-full object-cover h-[180px]"
											radius="lg"
											shadow="sm"
											src={
												category?.imageUrl || 'https://via.placeholder.com/300'
											}
											width="100%"
										/>
									</CardBody>
									<CardFooter className="flex flex-col items-start p-4">
										<h2 className="text-lg text-start font-semibold">
											{destination.placeName}
										</h2>
										<p className="text-sm text-start text-gray-600">
											{destination.description}
										</p>
										<p className="text-sm text-start text-gray-500">
											{destination.address}
										</p>
										<p className="text-sm text-blue-600">
											Category: {category ? category.name : 'Unknown'}
										</p>
										<Button
											color="secondary"
											onPress={() => handleAddToPlan(destination.id)}
										>
											Add to Plan
										</Button>
									</CardFooter>
								</Card>
							);
						})}
					</div>
				)}
			</section>
		</DefaultLayout>
	);
}
