import {
	Box,
	Button,
	Card,
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useGetCentersQuery } from "../slices/centerSlice";
import { useGetUsersQuery } from "../slices/customerSlice";
import {
	useAddBookingMutation,
	useDeleteBookingMutation,
	useGetBookingsQuery,
	useUpdateBookingMutation,
} from "../slices/bookingSlice";
import { toast } from "react-toastify";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

// frontend/src/pages/Schedule.jsx
const Schedule = () => {
	const [central, setCentral] = useState("");
	const [alignment, setAlignment] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [date, setDate] = useState("17:10:2024");
	const [user, setUser] = useState("");
	const [cnt, setCnt] = useState("");
	const [time, setTime] = useState("");

	const [updating, setUpdating] = useState(false);
	const [updatingBooking, setUpdatingBooking] = useState(null);

	const { data: users } = useGetUsersQuery();
	const { data: centers } = useGetCentersQuery();
	const { data: bookings, refetch } = useGetBookingsQuery({
		date,
		kind: alignment,
		center: central,
	});

	console.log(bookings);

	const [addBooking] = useAddBookingMutation();
	const [deleteBooking] = useDeleteBookingMutation();
	const [updateBooking] = useUpdateBookingMutation();

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	useEffect(() => {
		if (!modalOpen) {
			setUser("");
			setTime("");
			setCnt(0);
			setUpdating(false);
		}
	}, [modalOpen]);

	const addHandler = async (flag) => {
		try {
			if (!flag) {
				const res = await updateBooking({
					oldCnt: updatingBooking.cnt,
					oldCenter: updatingBooking.center,
					oldKind: updatingBooking.kind,
					oldUser: updatingBooking.user,
					oldTime: updatingBooking.time,
					oldDate: updatingBooking.date,
					center: central,
					kind: alignment,
					date,
					user,
					cnt,
					time,
				}).unwrap();
				setModalOpen(false);
				setUpdating(false);
				setUpdatingBooking(null);
				toast.success(res.message);
				setUser("");
				setTime("");
				setCnt(0);
				refetch();
			} else {
				const res = await addBooking({
					center: central,
					kind: alignment,
					date,
					user,
					cnt,
					time,
				}).unwrap();
				setModalOpen(false);
				toast.success(res.message);
				setUser("");
				setTime("");
				setCnt(0);
				refetch();
			}
		} catch (error) {
			toast.error(error?.data?.message || error.message);
		}
	};

	const updateBookingHandler = (user) => {
		setTime(user.time);
		setUser(user.user);
		setCnt(user.cnt);
		setModalOpen(true);
		setUpdating(true);
		setUpdatingBooking(user);
	};

	const deleteBookingHandler = async (user) => {
		try {
			const res = await deleteBooking(user).unwrap();
			toast.success(res.message);
			refetch();
		} catch (error) {
			toast.error(error?.data?.message || error?.message);
		}
	};

	return (
		<Box>
			<Typography variant="h4" fontStyle="italic" fontWeight="bold">
				Schedule
			</Typography>
			<Box
				sx={{
					display: "flex",
					marginTop: 3,
					justifyContent: "space-between",
				}}
			>
				<ToggleButtonGroup
					color="primary"
					value={alignment}
					exclusive
					onChange={handleChange}
				>
					{centers &&
						centers.length > 0 &&
						centers
							.filter((item) => item.name === central)
							.map((court) => (
								<ToggleButton
									value={court.kind}
									key={court.kind}
								>
									{court.kind}
								</ToggleButton>
							))}
				</ToggleButtonGroup>
				<Box sx={{ display: "flex", paddingRight: 5, gap: 3 }}>
					<TextField
						id="outlined-basic"
						label="DD:MM:YYYY"
						variant="outlined"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					<FormControl sx={{ width: "200px" }}>
						<InputLabel id="demo-simple-select-label">
							Choose
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={central}
							label="Age"
							onChange={(e) => setCentral(e.target.value)}
						>
							{centers &&
								centers.length > 0 &&
								[
									...new Set(
										centers.map((item) => item.name)
									),
								].map((center) => (
									<MenuItem key={center} value={center}>
										{center}
									</MenuItem>
								))}
						</Select>
					</FormControl>
					<Button
						variant="contained"
						onClick={() => setModalOpen(true)}
						disabled={central == "" || alignment == ""}
					>
						Add Booking
					</Button>
					<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
						<Box
							sx={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								width: 400,
								bgcolor: "white",
								border: "1px solid #ddd",
								boxShadow: 3,
								borderRadius: 2,
								p: 4,
								color: "black",
							}}
						>
							<Typography
								id="modal-modal-title"
								variant="h6"
								component="h2"
								textAlign="center"
							>
								New Booking
							</Typography>
							<Divider sx={{ mx: 3, mt: 2 }} />
							<Box
								display="flex"
								gap={3}
								justifyContent="space-between"
								alignItems="center"
								mt={3}
							>
								<InputLabel
									sx={{ color: "black" }}
									id="select-label"
								>
									Name :
								</InputLabel>
								<Select
									sx={{ flex: 1 }}
									value={user}
									labelId="select-label"
									onChange={(e) => setUser(e.target.value)}
								>
									{users &&
										users.length > 0 &&
										users.map((user) => (
											<MenuItem
												key={user.name + user.age}
												value={user.name}
											>
												{user.name}
											</MenuItem>
										))}
								</Select>
							</Box>
							<Box
								display="flex"
								gap={3}
								justifyContent="space-between"
								alignItems="center"
								mt={3}
							>
								<InputLabel
									sx={{ color: "black" }}
									id="select-label"
								>
									Court :
								</InputLabel>
								<Select
									sx={{ flex: 1 }}
									value={cnt}
									labelId="select-label"
									onChange={(e) => setCnt(e.target.value)}
								>
									{centers &&
										centers.length > 0 &&
										centers
											.filter(
												(item) =>
													item.name === central &&
													item.kind === alignment
											)
											.map((center) =>
												Array.from(
													{ length: center.cnt },
													(_, i) => (
														<MenuItem
															key={`${center.id}-${i}`}
															value={
																"Court " +
																(i + 1)
															}
														>
															Court {i + 1}{" "}
														</MenuItem>
													)
												)
											)}
								</Select>
							</Box>
							<Box
								display="flex"
								gap={3}
								justifyContent="space-between"
								alignItems="center"
								mt={3}
							>
								<InputLabel
									sx={{ color: "black" }}
									id="time-select-label"
								>
									Time : &nbsp;
								</InputLabel>

								<Select
									sx={{ flex: 1 }}
									value={time}
									labelId="time-select-label"
									onChange={(e) => setTime(e.target.value)}
								>
									{[
										"7 - 8",
										"8 - 9",
										"9 - 10",
										"10 - 11",
										"11 - 12",
										"12 - 1",
									].map((time) => (
										<MenuItem key={time} value={time}>
											{time}
										</MenuItem>
									))}
								</Select>
								{updating ? (
									<Button
										variant="contained"
										onClick={() => addHandler(false)}
										disabled={
											user == "" ||
											cnt == "" ||
											time == ""
										}
										color="warning"
									>
										Modify
									</Button>
								) : (
									<Button
										variant="contained"
										onClick={() => addHandler(true)}
										disabled={
											user == "" ||
											cnt == "" ||
											time == ""
										}
									>
										Add
									</Button>
								)}
							</Box>
						</Box>
					</Modal>
				</Box>
			</Box>
			<Card
				sx={{
					padding: 4,
					marginTop: 4,
					boxShadow: "3px 3px 6px 6px #1976d220",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						gap: 4,
						marginBottom: 3,
						fontWeight: "bold",
					}}
				>
					<Box minWidth="70px" maxWidth="70px"></Box>
					{centers &&
						centers.length > 0 &&
						centers
							.filter(
								(item) =>
									item.name === central &&
									item.kind === alignment
							)
							.map((center) =>
								Array.from({ length: center.cnt }, (_, i) => (
									<Box
										key={`${center.id}-${i}`}
										value={"Court " + (i + 1)}
										sx={{ flex: 1 }}
									>
										Court {i + 1}{" "}
									</Box>
								))
							)}
				</Box>
				{[7, 8, 9, 10, 11, 12].map((t) => (
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							gap: 2,
							marginBottom: 2,
							height: "80px",
						}}
						key={t}
					>
						<Box minWidth="70px" maxWidth="70px">
							{t}.00 AM
						</Box>
						{centers &&
							centers.length > 0 &&
							centers
								.filter(
									(item) =>
										item.name === central &&
										item.kind === alignment
								)
								.map((center) =>
									Array.from(
										{ length: center.cnt },
										(_, i) => (
											<Box
												key={`${center.id}-${i}`}
												sx={{ flex: 1 }}
												width="100%"
												bgcolor={
													bookings &&
													bookings.find(
														(item) =>
															item.time.split(
																" "
															)[0] == t &&
															item.cnt.charAt(
																item.cnt
																	.length - 1
															) ==
																i + 1
													)
														? "lightcyan"
														: "transparent"
												}
												borderRadius={2}
												boxShadow={
													"3px 3px 6px 6px #1976d220"
												}
												display="flex"
												alignItems="center"
												justifyContent="center"
												border={"1px solid lightgray"}
											>
												{bookings &&
													bookings.find(
														(item) =>
															item.time.split(
																" "
															)[0] == t &&
															item.cnt.charAt(
																item.cnt
																	.length - 1
															) ==
																i + 1
													) && (
														<>
															<Button
																color="success"
																sx={{ ml: 2 }}
																onClick={() =>
																	updateBookingHandler(
																		bookings.find(
																			(
																				item
																			) =>
																				item.time.split(
																					" "
																				)[0] ==
																					t &&
																				item.cnt.charAt(
																					item
																						.cnt
																						.length -
																						1
																				) ==
																					i +
																						1
																		)
																	)
																}
															>
																<Edit />
															</Button>
															{
																bookings.find(
																	(item) =>
																		item.time.split(
																			" "
																		)[0] ==
																			t &&
																		item.cnt.charAt(
																			item
																				.cnt
																				.length -
																				1
																		) ==
																			i +
																				1
																).user
															}

															<Button
																color="warning"
																sx={{ ml: 2 }}
																onClick={() =>
																	deleteBookingHandler(
																		bookings.find(
																			(
																				item
																			) =>
																				item.time.split(
																					" "
																				)[0] ==
																					t &&
																				item.cnt.charAt(
																					item
																						.cnt
																						.length -
																						1
																				) ==
																					i +
																						1
																		)
																	)
																}
															>
																<Delete />
															</Button>
														</>
													)}
											</Box>
										)
									)
								)}
					</Box>
				))}
			</Card>
		</Box>
	);
};

export default Schedule;
