import {
	Box,
	Button,
	Card,
	Divider,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import {
	useAddCenterMutation,
	useDeleteCenterMutation,
	useGetCentersQuery,
	useUpdateCenterMutation,
} from "../slices/centerSlice";
import { toast } from "react-toastify";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";

// frontend/src/pages/Dashboard.jsx
const Dashboard = () => {
	const [centerName, setCenterName] = useState("");
	const [sports, setSports] = useState("");
	const [court, setCourt] = useState(1);
	const [updating, setUpdating] = useState(false);
	const [updatingCenter, setUpdatingCenter] = useState(null);

	const { data: centers, isLoading, refetch } = useGetCentersQuery();
	const [addCenter] = useAddCenterMutation();
	const [deleteCenter] = useDeleteCenterMutation();
	const [updateCenter] = useUpdateCenterMutation();

	console.log(centers);

	const addCenterHandler = async () => {
		try {
			const res = await addCenter({
				name: centerName,
				kind: sports,
				cnt: court,
			}).unwrap();
			toast.success(res.message);
			setCenterName("");
			setSports("");
			setCourt(1);
			refetch();
		} catch (error) {
			toast.error(error?.data?.message || error?.error);
		}
	};

	const deleteCenterHandler = async (data) => {
		try {
			const res = await deleteCenter(data).unwrap();
			toast.success(res.message);
			refetch();
		} catch (error) {
			toast.error(error?.data?.message || error.message);
		}
	};

	const updatingCenterHandler = async (data) => {
		setUpdatingCenter(data);
		setUpdating(true);
		setCenterName(data.name);
		setSports(data.kind);
		setCourt(data.cnt);
	};

	const updateCenterHandler = async () => {
		try {
			const res = await updateCenter({
				oldName: updatingCenter.name,
				oldKind: updatingCenter.kind,
				name: centerName,
				kind: sports,
				cnt: court,
			}).unwrap();
			toast.success(res.message);
			setUpdating(false);
			setUpdatingCenter(null);
			setCenterName("");
			setSports("");
			setCourt(1);
			refetch();
		} catch (error) {
			toast.error(error?.data?.message || error?.error);
		}
	};

	return (
		<Box>
			<Typography variant="h4" fontStyle="italic" fontWeight="bold">
				Dashboard
			</Typography>
			<Box
				sx={{
					display: "flex",
					marginY: 3,
					gap: 3,
					justifyContent: "center",
				}}
			>
				<Typography variant="p" marginY="auto">
					{" "}
					Center Name :{" "}
				</Typography>
				<TextField
					id="outlined-basic"
					label="Center"
					variant="outlined"
					value={centerName}
					onChange={(e) => setCenterName(e.target.value)}
				/>
				<Typography variant="p" marginY="auto">
					{" "}
					Sports Kind :{" "}
				</Typography>
				<TextField
					id="outlined-basic"
					label="Sports"
					variant="outlined"
					value={sports}
					onChange={(e) => setSports(e.target.value)}
				/>
				<Typography variant="p" marginY="auto" marginLeft={4}>
					{" "}
					How many court :{" "}
				</Typography>
				<TextField
					id="outlined-number"
					label="Court Count"
					type="number"
					slotProps={{
						inputLabel: {
							shrink: true,
						},
					}}
					value={court}
					onChange={(e) => setCourt(e.target.value)}
				/>
				{updating ? (
					<Button
						variant="contained"
						onClick={updateCenterHandler}
						color="success"
					>
						Update Center
					</Button>
				) : (
					<Button variant="contained" onClick={addCenterHandler}>
						Add Center
					</Button>
				)}
			</Box>
			<Divider />
			<Box
				sx={{
					marginY: 4,
					display: "flex",
					flexDirection: "column",
					gap: 2,
					padding: 3,
				}}
			>
				<Typography
					variant="h5"
					textAlign="center"
					textTransform="uppercase"
				>
					Center List
				</Typography>
				{isLoading ? (
					<Box textAlign="center">Loading...</Box>
				) : centers && centers.length > 0 ? (
					centers.map((center) => (
						<Card
							key={center.name}
							sx={{
								marginX: "auto",
								padding: 3,
								display: "flex",
								gap: 4,
								width: "500px",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Box>{center.name}</Box>
							<Box>{center.kind}</Box>
							<Box
								sx={{
									display: "flex",
									gap: 1,
									alignItems: "center",
								}}
							>
								<Box>{center.cnt} Courts</Box>
								<Button
									color="error"
									onClick={() => deleteCenterHandler(center)}
								>
									<Delete />
								</Button>
								<Button
									color="success"
									onClick={() =>
										updatingCenterHandler(center)
									}
								>
									<Edit />
								</Button>
							</Box>
						</Card>
					))
				) : (
					<Box textAlign="center">There is no court</Box>
				)}
			</Box>
		</Box>
	);
};

export default Dashboard;
