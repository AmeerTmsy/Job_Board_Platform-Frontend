import { useContext, useState } from "react";
import { AuthRoleContext } from "./AuthRoleContext";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Users,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authenticatUser, unAuthenticatUser } from "@/redux/slices/userSlice";

export default function AuthForm({ signup = false }) {
  const dispatch = useDispatch();
  const roleContext = useContext(AuthRoleContext);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { userType: "employee" } });
  const password = watch("password");
  const onSubmit = async ({ ...values }) => {
    const { confirmPassword, ...data } = values;
    if (signup && confirmPassword !== data.password) return;
    setServerError("");
    try {
      const { userType, ...credentials } = data;
      const endpoint = signup
        ? userType === "employer"
          ? "employers"
          : "users"
        : userType === "employer"
        ? "employer/auth/login"
        : "user/auth/login";
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/${endpoint}`,
        signup ? data : credentials,
        { withCredentials: true },
      );
      if (!signup) dispatch(authenticatUser(response?.data?.data));
      window.location.assign("/");
    } catch (error) {
      if (!signup) dispatch(unAuthenticatUser());
      setServerError(
        error?.response?.data?.message ||
          "We couldn’t connect. Please try again.",
      );
    }
  };
  const field = (name, label, type = "text", options = {}) => (
    <div className="auth-field">
      <label htmlFor={`auth-${name}`}>{label}</label>
      <input
        id={`auth-${name}`}
        type={type}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `error-${name}` : undefined}
        {...register(name, { required: `${label} is required.`, ...options })}
        autoComplete={
          {
            name: "name",
            email: "email",
            profession: "organization-title",
            confirmPassword: "new-password",
          }[name]
        }
        placeholder={label === "Email address" ? "you@example.com" : label}
      />
      {errors[name] && (
        <span className="field-error" id={`error-${name}`} role="alert">
          {errors[name].message}
        </span>
      )}
    </div>
  );
  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset className="role-picker">
        <legend>{signup ? "I’m here to" : "Log in as"}</legend>
        <div className="role-options">
          <label>
            <input type="radio" value="employee" {...register("userType", { onChange: event => roleContext?.setRole(event.target.value) })} />
            <BriefcaseBusiness size={18} />
            <span>Find a job</span>
          </label>
          <label>
            <input type="radio" value="employer" {...register("userType", { onChange: event => roleContext?.setRole(event.target.value) })} />
            <Users size={18} />
            <span>Hire talent</span>
          </label>
        </div>
      </fieldset>
      {signup && (
        <>
          {field("name", "Full name", "text", {
            maxLength: { value: 25, message: "Use 25 characters or fewer." },
          })}
          <div className="auth-field-row">
            {field("profession", "Profession")}
            {field("experienced", "Years of experience", "number", {
              min: { value: 0, message: "Enter zero or more years." },
            })}
          </div>
          <div className="auth-field">
            <label htmlFor="auth-bio">A little about you</label>
            <textarea
              id="auth-bio"
              rows={3}
              placeholder="Your experience, interests, and what comes next…"
              aria-invalid={Boolean(errors.bio)}
              aria-describedby={errors.bio ? "error-bio" : undefined}
              {...register("bio", {
                required: "Tell us a little about yourself.",
              })}
            />
            {errors.bio && (
              <span className="field-error" id="error-bio" role="alert">
                {errors.bio.message}
              </span>
            )}
          </div>
        </>
      )}
      {field("email", "Email address", "email", {
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Enter a valid email address.",
        },
      })}
      <div className="auth-field">
        <label htmlFor="auth-password">Password</label>
        <div className="password-input">
          <input
            id="auth-password"
            type={showPassword ? "text" : "password"}
            autoComplete={signup ? "new-password" : "current-password"}
            placeholder={signup ? "Create a password" : "Enter your password"}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "error-password" : undefined}
            {...register("password", {
              required: "Password is required.",
              minLength: { value: 4, message: "Use at least 4 characters." },
            })}
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <span className="field-error" id="error-password" role="alert">
            {errors.password.message}
          </span>
        )}
      </div>
      {signup &&
        field(
          "confirmPassword",
          "Confirm password",
          showPassword ? "text" : "password",
          {
            validate: (value) => value === password || "Passwords don’t match.",
          },
        )}
      {serverError && (
        <div className="auth-error" role="alert">
          {serverError}
        </div>
      )}
      <button
        className="primary-link auth-submit"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Please wait…
          </>
        ) : (
          <>
            {signup ? "Create your account" : "Log in"}
            <ArrowRight size={18} />
          </>
        )}
      </button>
      <p className="auth-switch">
        {signup ? "Already part of Hired?" : "New around here?"}{" "}
        <Link to={signup ? "/login" : "/sign_up"}>
          {signup ? "Log in" : "Create an account"} <ArrowUpRightIcon />
        </Link>
      </p>
    </form>
  );
}
function ArrowUpRightIcon() {
  return <span aria-hidden="true">↗</span>;
}
AuthForm.propTypes = { signup: PropTypes.bool };
