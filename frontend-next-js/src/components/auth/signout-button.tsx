import { signOut } from "../../../auth"
import { Button } from "../ui/button"


export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({redirectTo: "/login?reload=1"})
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form>
  )
}