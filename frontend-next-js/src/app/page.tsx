import { auth } from "../../auth";

export default async function Home() { 
  const session = await auth();

  return (
    <>
      <div className="flex flex-col justify-center space-y-2 break-words">
      <h1 className="pl-8 md:pl-28  text-2xl font-bold">Inicial</h1>
        <div className="h-64 w-5/6 self-center bg-yellow-200"></div>
        <div className="h-64 w-5/6 self-center bg-blue-500"></div>
        <div className="h-64 w-5/6 self-center bg-red-400"></div>
        <div className="h-64 w-5/6 self-center bg-yellow-200"></div>
        <div className="h-64 w-5/6 self-center bg-blue-500"></div>
        <div className="h-64 w-5/6 self-center bg-red-400"></div>
        <div className="h-64 w-5/6 self-center bg-yellow-200"></div>
        <div className="h-64 w-5/6 self-center bg-blue-500"></div>
        <div className="h-64 w-5/6 self-center bg-red-400"></div>
      </div>
    </>
  );
}
