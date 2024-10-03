import RegisterForm from "@/components/auth/register-form";

const Register = async () => {
	return (
		<div className="flex flex-col px-4 md:px-20 w-full items-center">
			<RegisterForm />
		</div>
	);
};

export default Register;