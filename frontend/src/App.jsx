import { Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// frontend/src/App.jsx
const App = () => {
	const [sidebarWidth, setSidebarWidth] = useState("320px");

	return (
		<Box sx={{ display: "flex", height: "100vh", position: "relative" }}>
			<Sidebar width={sidebarWidth} onClose={() => setSidebarWidth(0)} />
			<Box width="100%" paddingLeft={sidebarWidth} overflow="auto">
				<Box sx={{ paddingY: 3, paddingX: 5 }}>
					<Outlet />
				</Box>
			</Box>
			<ToastContainer />
		</Box>
	);
};

export default App;
