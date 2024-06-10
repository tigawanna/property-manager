import type { LayoutProps } from "rakkasjs"
export default function DashboardLayout({children}: LayoutProps) {
return (
<div className="w-full h-full  flex flex-col items-center justify-center">
 {children}
</div>
)}
