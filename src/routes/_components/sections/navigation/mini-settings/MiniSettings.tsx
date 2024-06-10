import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/shadcn/ui/avatar";
import { Button } from "@/components/shadcn/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import { UserRound } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface MiniSettingsModalProps {
	triggerClassname?: string;
}

export function MiniSettingsModal({
	triggerClassname,
}: MiniSettingsModalProps) {
	const [open, setOpen] = useState(false);
	return (
		<DropdownMenu modal open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Avatar className={twMerge("size-9", triggerClassname)}>
					<AvatarFallback>
						<UserRound />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="w-56 " align="end" forceMount>
				<DropdownMenuSeparator />

				<DropdownMenuSeparator />
				{/* theme toggle */}
				<ThemeToggle />
				<DropdownMenuSeparator />
				{/* logout button */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
