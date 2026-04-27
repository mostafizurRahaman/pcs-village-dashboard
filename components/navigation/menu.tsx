"use client";

import { useState } from "react";
import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getMenuList } from "@/data/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "@/components/navigation/collapse-menu-button";
import { Typography } from "@/components/typography";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider
} from "@/components/ui/tooltip";
import { LogoutModal } from "@/components/navigation/logout-modal";
import { useAuth } from "@/hooks/use-auth";

interface MenuProps {
    isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
    const pathname = usePathname();
    const menuList = getMenuList(pathname);
    const [logoutOpen, setLogoutOpen] = useState(false);
    const {  logout } = useAuth()

    return (
        <>
            <ScrollArea className="[&>div>div[style]]:!block flex-1">
                <nav className="h-full w-full">
                    <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-0.5 px-1">
                        {menuList.map(({ groupLabel, menus }, index) => (
                            <li className={cn("w-full", groupLabel ? "pt-4" : "")} key={index}>
                                {(isOpen && groupLabel) || isOpen === undefined ? (
                                    <div className="px-2 pb-1.5 max-w-[248px] truncate">
                                        <Typography
                                            variant="Regular_H7"
                                            className="text-muted-foreground uppercase tracking-widest text-[10px]"
                                        >
                                            {groupLabel}
                                        </Typography>
                                    </div>
                                ) : !isOpen && isOpen !== undefined && groupLabel ? (
                                    <TooltipProvider>
                                        <Tooltip delayDuration={100}>
                                            <TooltipTrigger className="w-full">
                                                <div className="w-full flex justify-center items-center py-1">
                                                    <Ellipsis className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent side="right">
                                                <Typography variant="Regular_H5">{groupLabel}</Typography>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ) : (
                                    <div className="pb-2"></div>
                                )}
                                {menus.map(
                                    ({ href, label, icon: Icon, active, submenus }, index) =>
                                        !submenus || submenus.length === 0 ? (
                                            <div className="w-full" key={index}>
                                                <TooltipProvider disableHoverableContent>
                                                    <Tooltip delayDuration={100}>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                className={cn(
                                                                    "w-full justify-start h-10 mb-0.5 rounded-md transition-all duration-200 gap-3",
                                                                    (active === undefined && pathname.startsWith(href)) || active
                                                                        ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
                                                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                                                )}
                                                                asChild
                                                            >
                                                                <Link href={href}>
                                                                    <Icon
                                                                        size={17}
                                                                        className={cn(
                                                                            "shrink-0",
                                                                            isOpen === false ? "" : ""
                                                                        )}
                                                                    />
                                                                    <Typography
                                                                        variant="Medium_H5"
                                                                        className={cn(
                                                                            "max-w-[200px] truncate transition-[opacity,transform] duration-300",
                                                                            isOpen === false
                                                                                ? "-translate-x-96 opacity-0 hidden"
                                                                                : "translate-x-0 opacity-100"
                                                                        )}
                                                                        as="span"
                                                                    >
                                                                        {label}
                                                                    </Typography>
                                                                </Link>
                                                            </Button>
                                                        </TooltipTrigger>
                                                        {isOpen === false && (
                                                            <TooltipContent side="right">
                                                                <Typography variant="Regular_H5">{label}</Typography>
                                                            </TooltipContent>
                                                        )}
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        ) : (
                                            <div className="w-full" key={index}>
                                                <CollapseMenuButton
                                                    icon={Icon}
                                                    label={label}
                                                    active={
                                                        active === undefined
                                                            ? pathname.startsWith(href)
                                                            : active
                                                    }
                                                    submenus={submenus}
                                                    isOpen={isOpen}
                                                />
                                            </div>
                                        )
                                )}
                            </li>
                        ))}

                        {/* ── Sign out button ─────────────────────────────────────── */}
                        <li className="w-full grow flex items-end pb-2">
                            <TooltipProvider disableHoverableContent>
                                <Tooltip delayDuration={100}>
                                    <TooltipTrigger asChild>
                                        <Button
                                            id="btn-sign-out"
                                            onClick={() => setLogoutOpen(true)}
                                            variant="ghost"
                                            className="w-full justify-start h-10 mt-2 gap-3 text-muted-foreground hover:bg-sidebar-accent hover:text-destructive transition-all duration-200 rounded-md"
                                        >
                                            <LogOut size={17} className="shrink-0" />
                                            <Typography
                                                variant="Medium_H5"
                                                className={cn(
                                                    "whitespace-nowrap transition-[opacity] duration-300",
                                                    isOpen === false ? "opacity-0 hidden" : "opacity-100"
                                                )}
                                                as="span"
                                            >
                                                Sign out
                                            </Typography>
                                        </Button>
                                    </TooltipTrigger>
                                    {isOpen === false && (
                                        <TooltipContent side="right">
                                            <Typography variant="Regular_H5">Sign out</Typography>
                                        </TooltipContent>
                                    )}
                                </Tooltip>
                            </TooltipProvider>
                        </li>
                    </ul>
                </nav>
            </ScrollArea>

            {/* ── Logout confirmation modal ─────────────────────────────── */}
            <LogoutModal
                open={logoutOpen}
                onOpenChange={setLogoutOpen}
                onConfirm={() => logout()}
            />
        </>
    );
}
