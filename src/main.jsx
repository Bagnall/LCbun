import { StrictMode } from "react";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/globals.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
	<BrowserRouter>
			<ThemeProvider>
	  <App />
				</ThemeProvider>
		</BrowserRouter>
  </StrictMode>
);
