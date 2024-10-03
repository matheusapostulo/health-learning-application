import LoginForm from "@/components/auth/login-form";

const Login = async () => {
	return (
		<div className="flex flex-col px-4 md:px-20 w-full items-center">
			<LoginForm />
		</div>
	);
};

export default Login;