import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Harsh Prakash
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Profile() {
	let { username } = useParams();
	const navigate = useNavigate();
	const [imageArray, setImageArray] = React.useState([]);
	const [open, setOpen] = React.useState(false);

	async function getData() {
		try {
			const response = await fetch(`/api/users/${username}`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
					Authorization: localStorage.jwttoken,
				},
				body: JSON.stringify({
					searchvalue: "",
				}),
			});

			const json = await response.json();
			setImageArray(json);
		} catch (err) {
			console.log({ error: err.message });
		}
	}

	React.useEffect(() => {
		console.log("Use effect ran");
		async function getData() {
			try {
				const response = await fetch(`/api/users/${username}`, {
					method: "POST",
					headers: {
						"Content-type": "application/json",
						Authorization: localStorage.jwttoken,
					},
					body: JSON.stringify({
						searchvalue: "",
					}),
				});

				const json = await response.json();
				setImageArray(json);
			} catch (err) {
				console.log({ error: err.message });
			}
		}
		getData();
	}, [username]);

	const loadImages = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const searchValue = data.get("searchvalue");
		const response = await fetch(`/api/users/${username}`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Authorization: localStorage.jwttoken,
			},
			body: JSON.stringify({
				searchvalue: searchValue,
			}),
		});

		const json = await response.json();
		console.log(imageArray);
		setImageArray(json);
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleLogout = () => {
		localStorage.clear();
		navigate("/login");
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log(event.data);
		const data = new FormData(event.currentTarget);
		data.append("username", localStorage.username);
		console.log(data);
		console.log({
			name: data.get("name"),
			img: data.get("img"),
			username: data.get("username"),
		});

		const response = await fetch("/api/upload/save", {
			method: "POST",
			headers: {
				Accept: "multipart/form-data",
				Authorization: localStorage.jwttoken,
			},
			body: data,
		});

		const json = await response.json();
		console.log(json);
		getData();
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<CssBaseline />
			<AppBar position="relative">
				<Toolbar>
					<Button variant="contained" color="error" onClick={handleLogout}>
						Log Out
					</Button>
				</Toolbar>
			</AppBar>
			<main>
				{/* Hero unit */}
				<Box
					sx={{
						bgcolor: "background.paper",
						pt: 8,
						pb: 6,
					}}
				>
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h2"
							align="center"
							color="text.primary"
							gutterBottom
						>
							Welcome to your Photo Vault, {localStorage.user}
						</Typography>
						<Stack
							sx={{ pt: 4 }}
							direction="row"
							spacing={2}
							justifyContent="center"
						>
							<Button variant="contained" onClick={handleOpen}>
								Upload
							</Button>
							<Dialog open={open} onClose={handleClose}>
								<DialogTitle>Upload</DialogTitle>
								<DialogContent>
									<DialogContentText>
										To upload an image please provide a name and choose which
										image to upload. Accepted formats: .jpeg, .jpg, .png
									</DialogContentText>
									<form onSubmit={handleSubmit} encType="multipart/form-data">
										<TextField
											autoFocus
											margin="dense"
											id="name"
											label="Name"
											name="name"
											type="text"
											fullWidth
											variant="standard"
										/>
										<input type="file" id="img" name="img" />
										<DialogActions>
											<Button onClick={handleClose}>Cancel</Button>
											<Button type="submit" onClick={handleClose}>
												Submit
											</Button>
										</DialogActions>
									</form>
								</DialogContent>
							</Dialog>
							<Button variant="outlined">Delete option coming soon...</Button>
						</Stack>
					</Container>
				</Box>

				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: "5vh" }}
				>
					<Paper
						component="form"
						onSubmit={loadImages}
						sx={{
							p: "2px 4px",
							display: "flex",
							alignItems: "center",
							width: 800,
						}}
					>
						<InputBase
							sx={{ ml: 1, flex: 1 }}
							placeholder="Search"
							inputProps={{ "aria-label": "search" }}
							name="searchvalue"
							id="searchvalue"
						/>
						<IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
							Go
						</IconButton>
						<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
					</Paper>
				</Grid>

				<Container sx={{ py: 8 }} maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={4}>
						{imageArray.map((image) => (
							<Grid item key={image._id} xs={12} sm={6} md={4}>
								<Card
									sx={{
										height: "100%",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<CardMedia
										component="div"
										sx={{
											// 16:9
											pt: "56.25%",
										}}
										image={image.filepath}
									/>
									<CardContent sx={{ flexGrow: 1 }}>
										<Typography gutterBottom variant="h5" component="h2">
											{image.name}
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</main>
			{/* Footer */}
			<Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
				<Copyright />
			</Box>
			{/* End footer */}
		</ThemeProvider>
	);
}
