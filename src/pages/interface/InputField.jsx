import React, { useState } from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { sendChatMessage } from "../../_api/ChatApi";
import { UserAuth } from "../../context/AuthContext";

const InputField = ({ selectedChatId }) => {
	const { user } = UserAuth();
	const [textFieldValue, setTextFieldValue] = useState("");

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();

			const sendMessageAsync = async () => {
				if (selectedChatId) {
					await sendChatMessage(
						user,
						selectedChatId,
						textFieldValue,
						user.displayName
					);
				}
			};

			sendMessageAsync();
			setTextFieldValue("");
		}
	};

	return (
		<div display="flex">
			<Box
				component="form"
				sx={{
					"& > :not(style)": {
						m: 1,
						ml: "16vw",
						width: "auto",
						height: "6vh",
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-end",
					},
				}}
				noValidate
				autoComplete="off"
			>
				<TextField
					value={textFieldValue}
					onKeyDown={(e) => handleKeyDown(e)}
					onChange={(e) => setTextFieldValue(e.target.value)}
					sx={{
						borderColor: "#40033C",
						borderRadius: "5px",
						mb: 20,
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-end",
						input: { color: "white" },
					}}
					focused
				/>
			</Box>
		</div>
	);
};

export default InputField;
