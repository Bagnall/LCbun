import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import UnitPage from "./pages/UnitPage.jsx";
import SyllabusPage from "./pages/SyllabusPage.jsx";
import CreditsPage from "./pages/CreditsPage.jsx";

export default class App extends React.Component {
	render() {
		return (
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/unit/:unitId" element={<UnitPage />} />
				<Route path="/syllabus" element={<SyllabusPage />} />
				<Route path="/credits" element={<CreditsPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		);
	}
}
