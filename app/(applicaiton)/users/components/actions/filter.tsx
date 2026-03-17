"use client"

import * as React from "react"
import { FilterIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Typography } from "@/components/typography"

export const FilterModal = () => {
  const [open, setOpen] = React.useState(false)

  // Internal state for the filter dropdowns
  const [role, setRole] = React.useState("all")
  const [status, setStatus] = React.useState("all")
  const [lastActive, setLastActive] = React.useState("all")

  const handleReset = () => {
    setRole("all")
    setStatus("all")
    setLastActive("all")
  }

  const handleApplyFilters = () => {
    setOpen(false)
    // Additional filter apply logic if needed here
  }

  return (
    <div className="flex flex-col items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-0 bg-slate-800/80 hover:bg-slate-700"
          >
            <FilterIcon className="h-5 w-5 text-white" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="rounded-xl border border-slate-800 bg-[#0F172A] px-4 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 py-4">
            <Typography variant="Bold_H6" className="text-white">
              Filters
            </Typography>
            <button
              onClick={handleReset}
              className="font-medium text-[#2DD4BF] hover:text-[#2dd4bf]/80"
            >
              <Typography variant="Regular_H7">Reset</Typography>
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-4 py-4">
            {/* Role Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-300">
                Role
              </label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="flex w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-900 p-3 text-white focus:ring-1 focus:ring-slate-700">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-900 text-white">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-300">
                Status
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="flex w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-900 p-3 text-white focus:ring-1 focus:ring-slate-700">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-900 text-white">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="deleted">Deleted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Last Active Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-300">
                Last active
              </label>
              <Select value={lastActive} onValueChange={setLastActive}>
                <SelectTrigger className="flex w-full items-center justify-between rounded-lg border border-slate-700 bg-slate-900 p-3 text-white focus:ring-1 focus:ring-slate-700">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent className="border-slate-700 bg-slate-900 text-white">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="last7days">Last 7 Days</SelectItem>
                  <SelectItem value="last30days">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-4 py-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-0 bg-slate-800 px-6 py-2 font-bold text-white hover:bg-slate-700 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="bg-[#2DD4BF] px-6 py-2 font-bold text-slate-950 hover:bg-[#2dd4bf]/90"
            >
              Apply filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
