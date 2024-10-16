import {
	Box,
	Button,
	Card,
	Divider,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import {
	useAddUserMutation,
	useDeleteUserMutation,
	useGetUsersQuery,
} from "../slices/customerSlice";
import Delete from "@mui/icons-material/Delete";

// frontend/src/pages/Customer.jsx
const Customer = () => {
	const [name, setName] = useState("");
	const [age, setAge] = useState(17);

	const { data: users, isLoading, refetch } = useGetUsersQuery();
	const [addCustomer] = useAddUserMutation();
	const [deleteCustomer] = useDeleteUserMutation();

	const addCustomerHandler = async () => {
		try {
			const res = await addCustomer({ name, age }).unwrap();
			refetch();
			toast.success(res.message);
			setName("");
			setAge(17);
		} catch (error) {
			toast.error(error?.data?.message || error?.message);
		}
	};

	const deleteUserHandler = async (user) => {
		try {
			const res = await deleteCustomer(user).unwrap();
			refetch();
			toast.success(res.message);
		} catch (error) {
			toast.error(error?.data?.message || error?.message);
		}
	};

	return (
		<Box>
			<Typography variant="h4" fontStyle="italic" fontWeight="bold">
				Customer
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
					New Customer :{" "}
				</Typography>
				<TextField
					id="outlined-basic"
					label="Name"
					variant="outlined"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Typography variant="p" marginY="auto" marginLeft={4}>
					{" "}
					How old is he/she :{" "}
				</Typography>
				<TextField
					id="outlined-number"
					label="Age"
					type="number"
					slotProps={{
						inputLabel: {
							shrink: true,
						},
					}}
					value={age}
					onChange={(e) => setAge(e.target.value)}
				/>
				<Button variant="contained" onClick={addCustomerHandler}>
					Add Customer
				</Button>
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
					Our Customers
				</Typography>
				{isLoading ? (
					<Box textAlign="center">Loading...</Box>
				) : !users || users.length == 0 ? (
					<Box textAlign="center">There is no customer yet</Box>
				) : (
					users.map((user) => (
						<Card
							key={user.name}
							sx={{
								marginX: "auto",
								padding: 3,
								display: "flex",
								gap: 4,
								width: "300px",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Box>{user.name}</Box>
							<Box
								sx={{
									display: "flex",
									gap: 2,
									alignItems: "center",
								}}
							>
								<Box>{user.age}</Box>
								<Button
									color="error"
									onClick={() => deleteUserHandler(user)}
								>
									<Delete />
								</Button>
							</Box>
						</Card>
					))
				)}
				{/* <Card
					sx={{
						marginX: "auto",
						padding: 3,
						display: "flex",
						gap: 4,
						width: "300px",
						justifyContent: "space-between",
					}}
				>
					<Box>Rajpar</Box>
					<Box>20</Box>
				</Card>
				<Card
					sx={{
						marginX: "auto",
						padding: 3,
						display: "flex",
						gap: 4,
						width: "300px",
						justifyContent: "space-between",
					}}
				>
					<Box>Muhammad</Box>
					<Box>22</Box>
				</Card> */}
			</Box>
		</Box>
	);
};

export default Customer;
