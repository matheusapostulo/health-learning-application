import RegisterForm from "@/components/auth/register-form";

const Login = async () => {
	return (
		<div className="flex flex-col w-full items-center mt-10">
			<RegisterForm />
		</div>
	);
};

export default Login;