"use client";

import Link from "next/link";
import { useState } from "react";
import { Dot, LucideIcon, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

type Submenu = {
    href: string;
    label: string;
    active?: boolean;
};

interface CollapseMenuButtonProps {
    icon: LucideIcon;
    label: string;
    active: boolean;
    submenus: Submenu[];
    isOpen: boolean | undefined;
}

export function CollapseMenuButton({
    icon: Icon,
    label,
    active,
    submenus,
    isOpen
}: CollapseMenuButtonProps) {
    const pathname = usePathname();
    const isSubmenuActive = submenus.some((submenu) =>
        submenu.active === undefined ? submenu.href === pathname : submenu.active
    );
    const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

    return isOpen ? (
        <Collapsible
            open={isCollapsed}
            onOpenChange={setIsCollapsed}
            className="w-full"
        >
            <CollapsibleTrigger
                className="[&[data-state=open]>div>div>svg]:rotate-180 mb-0.5"
                asChild
            >
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start h-10 rounded-md gap-3 transition-all duration-200",
                        isSubmenuActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                >
                    <div className="w-full items-center flex justify-between">
                        <div className="flex items-center gap-3">
                            <Icon size={17} className="shrink-0" />
                            <Typography
                                variant="Medium_H5"
                                className={cn(
                                    "max-w-[150px] truncate transition-[opacity,transform] duration-300",
                                    isOpen
                                        ? "translate-x-0 opacity-100"
                                        : "-translate-x-96 opacity-0"
                                )}
                                as="span"
                            >
                                {label}
                            </Typography>
                        </div>
                        <div
                            className={cn(
                                "whitespace-nowrap transition-[opacity,transform] duration-300",
                                isOpen
                                    ? "translate-x-0 opacity-100"
                                    : "-translate-x-96 opacity-0"
                            )}
                        >
                            <ChevronDown
                                size={16}
                                className="transition-transform duration-200"
                            />
                        </div>
                    </div>
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                {submenus.map(({ href, label, active }, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        className={cn(
                            "w-full justify-start h-9 mb-0.5 pl-8 rounded-md gap-2 transition-all duration-200",
                            (active === undefined && pathname === href) || active
                                ? "bg-sidebar-primary/20 text-sidebar-primary-foreground hover:bg-sidebar-primary/30"
                                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                        asChild
                    >
                        <Link href={href}>
                            <Dot size={16} className="shrink-0" />
                            <Typography
                                variant="Regular_H5"
                                className={cn(
                                    "max-w-[170px] truncate transition-[opacity,transform] duration-300",
                                    isOpen
                                        ? "translate-x-0 opacity-100"
                                        : "-translate-x-96 opacity-0"
                                )}
                                as="span"
                            >
                                {label}
                            </Typography>
                        </Link>
                    </Button>
                ))}
            </CollapsibleContent>
        </Collapsible>
    ) : (
        <DropdownMenu>
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start h-10 mb-0.5 rounded-md gap-3 transition-all duration-200",
                                    isSubmenuActive
                                        ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                )}
                            >
                                <div className="w-full items-center flex justify-between">
                                    <div className="flex items-center gap-3">
                                        <Icon size={17} className="shrink-0" />
                                        <Typography
                                            variant="Medium_H5"
                                            className={cn(
                                                "max-w-[200px] truncate transition-opacity duration-300",
                                                isOpen === false ? "opacity-0 hidden" : "opacity-100"
                                            )}
                                            as="span"
                                        >
                                            {label}
                                        </Typography>
                                    </div>
                                </div>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="start" alignOffset={2}>
                        <Typography variant="Regular_P">{label}</Typography>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent side="right" sideOffset={25} align="start" className="bg-card border-border">
                <DropdownMenuLabel className="max-w-[190px] truncate">
                    <Typography variant="Medium_H5">{label}</Typography>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {submenus.map(({ href, label, active }, index) => (
                    <DropdownMenuItem key={index} asChild>
                        <Link
                            className={`cursor-pointer ${((active === undefined && pathname === href) || active) &&
                                "bg-primary/10 text-primary"
                                }`}
                            href={href}
                        >
                            <Typography variant="Medium_P" className="max-w-[180px] truncate">{label}</Typography>
                        </Link>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuArrow className="fill-border" />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
