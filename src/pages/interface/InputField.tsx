import React, { useState } from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { sendChatMessage } from "../../_api/ChatApi";
import { UserAuth } from "../../context/AuthContext";

export interface InputFieldProps {
	selectedChatId: string | null;
}

const InputField = ({ selectedChatId }: InputFieldProps) => {

	const {user} = UserAuth();
	const [textFieldValue, setTextFieldValue] = useState("");

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();

			const sendMessageAsync = async () => {
				if(selectedChatId) {
					await sendChatMessage(user, selectedChatId, textFieldValue);
				}
			}

			sendMessageAsync();
			setTextFieldValue("");
		}
	};

	return (
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
					// backgroundColor: "#40033C",
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
					backgroundColor: "#40033C",
					borderColor: "#40033C",
					borderRadius: "5px",
					mb: 20,

					input: { color: "white" },
				}}
				focused
			/>
		</Box>
	);
};

export default InputField;
