import { ThemeProvider } from "./context/ThemeContext.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/globals.css";

createRoot(document.getElementById("root")).render(

	<BrowserRouter basename="/projects/richard/lcbun">
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</BrowserRouter>

);
