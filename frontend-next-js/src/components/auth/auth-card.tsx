import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthCardProps {
	title?: string;
	description?: string;
	titleHiglight?: string;
	children: React.ReactNode;
}

const AuthCard = ({ title, description, titleHiglight, children }: AuthCardProps) => {
	return (
		<Card className="w-[38%] min-w-[320px] px-6">
			<CardHeader>
				<div className="flex flex-row">
					{title &&
						<CardTitle className="text-2xl font-normal tracking-normal">
							{title} {titleHiglight &&<span className="font-bold">{titleHiglight}</span>}
						</CardTitle>
					}
				</div>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default AuthCard;