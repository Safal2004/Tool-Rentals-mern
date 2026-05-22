import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({
  value,
  onChange,
  placeholder = "",
  label = "Password",
  name = "password",
  error = false,
  helperText = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      variant="outlined"
      name={name}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      required
      label={label}
      placeholder={placeholder}
      fullWidth
      error={error}
      helperText={helperText}
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "#f3f4f6",
          backgroundColor: "rgba(15, 23, 42, 0.35)",
          borderRadius: "10px",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          "& fieldset": {
            borderColor: "rgba(255, 255, 255, 0.08)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(255, 255, 255, 0.2)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#3b82f6",
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.2)",
          },
          "& input": {
            padding: "13px 16px",
            fontSize: "0.95rem",
          },
        },
        "& .MuiInputLabel-root": {
          color: "rgba(156, 163, 175, 0.6)",
          fontSize: "0.9rem",
          transform: "translate(14px, 13px) scale(1)",
          "&.Mui-focused": {
            color: "#3b82f6",
          },
          "&.MuiInputLabel-shrink": {
            transform: "translate(14px, -9px) scale(0.75)",
            backgroundColor: "#0b0f19",
            padding: "0 6px",
            borderRadius: "4px",
            color: "#3b82f6",
          },
        },
        "& .MuiFormHelperText-root": {
          color: "#f87171",
          marginLeft: "4px",
          fontSize: "0.75rem",
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((p) => !p)}
              edge="end"
              sx={{ color: "rgba(156, 163, 175, 0.7)", marginRight: "-4px" }}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
