import React from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";

const InputField = () => {
	return (
		<Box
			component="form"
			sx={{
				"& > :not(style)": {
					m: 1,
					ml: "320px",
					width: "177ch",
					height: "6vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "flex-end",
				},
			}}
			noValidate
			autoComplete="off"
		>
			<TextField sx={{ mb: 20 }} color="primary" focused />
		</Box>
	);
};

export default InputField;
