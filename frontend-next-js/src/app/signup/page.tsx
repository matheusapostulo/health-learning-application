import RegisterForm from "@/components/auth/register-form";

const Register = async () => {
	return (
		<div className="flex flex-col w-full items-center mt-10 pb-6">
			<RegisterForm />
		</div>
	);
};

export default Register;