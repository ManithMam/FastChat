import React, { useState } from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";

const InputField = () => {
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(textFieldValue);
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
