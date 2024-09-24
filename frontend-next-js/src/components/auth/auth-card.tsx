import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthCardProps {
	title?: string;
	description?: string;
	children: React.ReactNode;
}

const AuthCard = ({ title, children }: AuthCardProps) => {
	return (
		<Card className="mx-auto w-4/12 min-w-[350px]">
			<CardHeader>
				{title && <CardTitle className="text-2xl">{title}</CardTitle>}
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default AuthCard;