import { useAuthSession } from "@/lib/authjs/use-hooks"
import type { PageProps } from "rakkasjs"
export default function DashboardPage({}:PageProps) {
    const session = useAuthSession()
    console.log("session in dashboard page=========== ", session.data)
return (
<div className="w-full min-h-screen  h-full  flex flex-col items-center justify-center">
    Dashboard Page
</div>
)}
