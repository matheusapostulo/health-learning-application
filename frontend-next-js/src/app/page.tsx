import { auth } from "../../auth";

export default async function Home() { 
  const session = await auth();

  return (
    <>
      <div className="flex flex-col justify-center break-words">
        <p className="text-black-200 text-lg">{JSON.stringify(session)}</p>
      </div>
    </>
  );
}
