import React, { useState } from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { UserAuth } from "../../context/AuthContext";

const InputField = ({selectedChatId}) => {

  const { user, sendChatMessage } = UserAuth();
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      
      const sendMessageAsync = async () => {
        await sendChatMessage(selectedChatId, user?.id, textFieldValue);
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
          ml: "320px",
          width: "177ch",
          height: "6vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          //   backgroundColor: "#40033C",
        },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        value={textFieldValue}
        onKeyDown={handleKeyDown}
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
