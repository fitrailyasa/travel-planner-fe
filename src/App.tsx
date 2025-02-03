import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import IndexPage from '@/pages/index';
import Register from '@/pages/auth/register';
import Login from '@/pages/auth/login';
import ProgressBar from '@/components/ProgressBar';
import CreatePlan from '@/pages/plan/create';
import Plan from '@/pages/plan';
import Page1 from '@/pages/page1';
import Page2 from '@/pages/page2';
import Page3 from '@/pages/page3';
import Page4 from '@/pages/page4';
import Page5 from '@/pages/page5';
import ProtectedRoute from '@/middleware/ProtectedRoute';
import PlanDetail from './pages/plan/detail';

function App() {
	const [step, setStep] = useState(0);
	const pagesWithStep = [
		'/plans/create',
		'/page1',
		'/page2',
		'/page3',
		'/page4',
		'/page5',
	];
	const decrementStep = () => {
		if (step > 1) {
			setStep(step - 1);
		}
	};

	return (
		<div className="w-full">
			{pagesWithStep.includes(window.location.pathname) && (
				<ProgressBar decrementStep={decrementStep} step={step} />
			)}

			<Routes>
				<Route element={<Register />} path="/register" />
				<Route element={<Login />} path="/login" />

				<Route element={<ProtectedRoute />}>
					<Route element={<IndexPage />} path="/" />
					<Route element={<Plan />} path="/plans" />
					<Route element={<PlanDetail />} path="/plans/:id" />
					<Route
						element={<CreatePlan setStep={setStep} />}
						path="/plans/create"
					/>
					<Route element={<Page1 setStep={setStep} />} path="/page1" />
					<Route element={<Page2 setStep={setStep} />} path="/page2" />
					<Route element={<Page3 setStep={setStep} />} path="/page3" />
					<Route element={<Page4 setStep={setStep} />} path="/page4" />
					<Route element={<Page5 />} path="/page5" />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
