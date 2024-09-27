import { auth } from "../../auth";

export default async function Home() { 
  const session = await auth();

  return (
    <>
      <div className="flex flex-col justify-center break-words">
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
        <p>Test Scroll</p>
      </div>
    </>
  );
}
