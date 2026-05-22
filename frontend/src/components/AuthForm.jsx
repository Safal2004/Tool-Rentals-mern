import { Checkbox, FormControlLabel, TextField, Tooltip } from "@mui/material";
import { ShieldCheck, Users, Wrench } from "lucide-react";
import React from "react";
import { toast } from "react-toastify";
import PasswordInput from "./frags/PasswordInput";

const AuthForm = ({
  formData,
  setFormData,
  handleSubmit,
  name,
  altMsg,
  altPath,
  loading,
}) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSocialClick = (platform) => {
    toast.info(`${platform} authentication integration coming soon!`);
  };

  const handleForgotClick = () => {
    toast.info("Password reset link will be sent to your email.");
  };

  // Reusable custom styles for glassmorphic MUI TextFields
  const textInputStyle = {
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
  };

  const isRegister = name === "Register";

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] w-full flex-col overflow-hidden bg-[#0b0f19] bg-grid-pattern md:flex-row">
      {/* Subtle background glow to keep it high premium, not distracting */}
      <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-glow pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] translate-x-1/2 translate-y-1/2 rounded-full bg-radial-glow pointer-events-none z-0" />

      {/* Left section: Hero / Branding (Desktop Only) */}
      <div className="relative hidden w-1/2 flex-col justify-between border-r border-white/5 bg-[#080c14]/40 p-12 z-10 md:flex">
        {/* Top brand signature */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.15)]">
            <Wrench size={18} />
          </div>
          <span className="font-semibold tracking-wide text-white">Tool Rental</span>
        </div>

        {/* Center branding copy & feature elements */}
        <div className="my-auto flex flex-col gap-8 max-w-lg">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
              Rent Smart. <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Build Faster.
              </span>
            </h1>
            <p className="text-[1.05rem] leading-relaxed text-gray-400">
              Get instant access to top-tier, contractor-grade tools and heavy equipment. Scale your projects, cut down overhead costs, and build with absolute confidence.
            </p>
          </div>

          {/* SaaS-inspired floating cards (highly clean, elegant) */}
          <div className="flex flex-col gap-3.5">
            <div className="glass-panel glass-panel-hover flex items-center gap-4 rounded-xl p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Wrench size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">1,248+ Premium Tools Available</h4>
                <p className="text-xs text-gray-500">Fully inspected, charged, and ready to deploy</p>
              </div>
            </div>

            <div className="glass-panel glass-panel-hover flex items-center gap-4 rounded-xl p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">100% Insured & Inspected</h4>
                <p className="text-xs text-gray-500">Worry-free replacement guarantee on every rental</p>
              </div>
            </div>

            <div className="glass-panel glass-panel-hover flex items-center gap-4 rounded-xl p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Users size={18} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">5,000+ Pro Contractors</h4>
                <p className="text-xs text-gray-500">The trusted ecosystem for local building crews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-gray-600">
          © {new Date().getFullYear()} Tool Rental Platform. All rights reserved.
        </div>
      </div>

      {/* Right section: Auth Form Card (Mobile & Desktop) */}
      <div className="relative flex w-full items-center justify-center p-6 z-10 md:w-1/2 md:p-12 animate-auth-fade">
        <div className="glass-panel w-full max-w-[420px] rounded-2xl p-8 shadow-2xl animate-auth-slide">
          <div className="flex flex-col gap-2 text-center mb-7">
            <h2 className="text-2xl font-bold tracking-tight text-white">{name}</h2>
            <p className="text-sm text-gray-400">
              {isRegister
                ? "Create your builder account to get started"
                : "Welcome back! Enter your details to access your portal"}
            </p>
          </div>

          {/* Social Auth Section */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => handleSocialClick("Google")}
              type="button"
              className="flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 py-2.5 px-3 text-sm font-medium text-gray-200 hover:bg-white/[0.08] hover:border-white/10 active:scale-[0.98] transition-all duration-200"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              onClick={() => handleSocialClick("GitHub")}
              type="button"
              className="flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/5 py-2.5 px-3 text-sm font-medium text-gray-200 hover:bg-white/[0.08] hover:border-white/10 active:scale-[0.98] transition-all duration-200"
            >
              <svg className="mr-2 h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </button>
          </div>

          <div className="relative flex items-center justify-center my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative bg-[#0d1322] px-3 text-xs uppercase text-gray-500">
              or credentials
            </span>
          </div>

          {/* Form Action */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isRegister && typeof formData.firstName === "string" && (
              <>
                <div className="flex gap-3">
                  <div className="w-1/2">
                    <TextField
                      variant="outlined"
                      type="text"
                      name="firstName"
                      label="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      fullWidth
                      required
                      sx={textInputStyle}
                    />
                  </div>
                  <div className="w-1/2">
                    <TextField
                      variant="outlined"
                      type="text"
                      name="lastName"
                      label="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      fullWidth
                      sx={textInputStyle}
                    />
                  </div>
                </div>

                <Tooltip title="Ask admin for the passphrase" arrow>
                  <TextField
                    variant="outlined"
                    type="password"
                    name="passphrase"
                    label="Pass Phrase"
                    required
                    value={formData.passphrase}
                    onChange={handleChange}
                    fullWidth
                    sx={textInputStyle}
                  />
                </Tooltip>
              </>
            )}

            <TextField
              variant="outlined"
              type="email"
              name="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              sx={textInputStyle}
            />

            <PasswordInput
              onChange={handleChange}
              value={formData.password}
              label={isRegister ? "Create Password" : "Password"}
              placeholder={isRegister ? "8+ characters" : ""}
            />

            {/* Remember Me and Forgot Password bar */}
            {!isRegister && (
              <div className="flex items-center justify-between mt-1 mb-2 text-xs">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      defaultChecked
                      sx={{
                        color: "rgba(255, 255, 255, 0.2)",
                        "&.Mui-checked": {
                          color: "#3b82f6",
                        },
                      }}
                    />
                  }
                  label={
                    <span className="text-gray-400 text-xs font-normal">
                      Remember me
                    </span>
                  }
                  sx={{ marginLeft: "-4px" }}
                />
                <button
                  type="button"
                  onClick={handleForgotClick}
                  className="text-blue-500 hover:text-blue-400 font-medium transition-colors duration-150"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="relative mt-2 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/10 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Processing...</span>
                </div>
              ) : (
                <span>{name}</span>
              )}
            </button>
          </form>

          {/* Toggle option */}
          <p className="mt-6 text-center text-sm text-gray-500">
            {altMsg}{" "}
            <a
              href={`/${altPath}`}
              className="text-blue-500 hover:text-blue-400 font-semibold transition-colors duration-150 capitalize"
            >
              {altPath}!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
