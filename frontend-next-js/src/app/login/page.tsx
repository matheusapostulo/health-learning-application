import LoginForm from "@/components/auth/login-form";

const Login = async () => {
	return (
		<div className="flex flex-col w-full items-center mt-10">
			<LoginForm />
		</div>
	);
};

export default Login;