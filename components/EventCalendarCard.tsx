"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar" 
import { facilities } from '@/lib/constant'; 
import { PlusIcon } from "lucide-react"
import { formatDateRange } from "little-date"
import { sampleEvents, type CalendarEvent } from "@/lib/events"
import {
  Card,
  CardFooter,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface EventCalendarCardProps {
  events: CalendarEvent[]; 
}

export function EventCalendarCard({ events}: EventCalendarCardProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date()
  )
const [currentMonth, setCurrentMonth] = React.useState<Date>(
    new Date() 
  )
const [selectedFacility, setSelectedFacility] = React.useState<string>("")

const bookedDates = React.useMemo(() => {
    if (!selectedFacility) return [];
    const relevantEvents = events.filter((e) => e.id === selectedFacility);


    return relevantEvents.map((event) => ({
      from: new Date(event.from),
      to: new Date(event.to),
    }));
  }, [events, selectedFacility]);

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.from);
    
    const isSameMonth=
      eventDate.getMonth() === currentMonth.getMonth() &&
      eventDate.getFullYear() === currentMonth.getFullYear();
    const isSameFacility = selectedFacility ? event.id === selectedFacility : true;
    return isSameMonth && isSameFacility;
  });
  

  return (
    <Card className="flex flex-col w-full max-w-5xl mx-auto mt-2 p-4 gap-6 bg-[#dce5f2] border border-slate-400 rounded-xl shadow-sm overflow-hidden items-stretch justify-center">
      <Select onValueChange={setSelectedFacility} value={selectedFacility}>
        <SelectTrigger className="w-[190px] bg-[#EEF4ED] border border-[#556378]">
          <SelectValue placeholder="Select an Event Space" />
        </SelectTrigger>
        <SelectContent className="bg-[#EEF4ED]">
          <SelectGroup>
            {facilities.map((facility, index) => (
              <SelectItem key={index} value={facility.title}>
                {facility.title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={bookedDates}
        modifiers={{ booked: bookedDates }}
        month={currentMonth} 
        onMonthChange={setCurrentMonth}
        modifiersClassNames={{
          booked:
            "bg-red-100 text-red-400 line-through decoration-red-400 cursor-not-allowed opacity-100 [&>button]:hover:bg-red-100 [&>button]:hover:text-red-400 [&>button]:cursor-not-allowed",
        }}
        className=" rounded-lg border bg-[#EEF4ED] text-[#556378] p-3 w-full h-full [&_td]:pointer-events-none"
      />

      <CardFooter className="flex flex-col items-start gap-3 border-t px-4 !pt-4">
        <div className="flex w-full items-center justify-between px-1">
          <div className="text-sm text-[#556378] font-medium ">
            {currentMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
        
        {/* 3. Using the PROPS here instead of a hardcoded array */}
        <div className="flex w-full flex-col gap-2 text-[#556378]">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
                <div
                key={index}
                className=" bg-[#EEF4ED] after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
                >
                <div className="font-medium">{event.title}</div>
                <div className="text-muted-foreground text-xs">
                    {formatDateRange(new Date(event.from), new Date(event.to))}
                </div>
                </div>
            ))
          ) : (
             <p className="text-xs italic text-gray-500 pl-2">No events this month</p>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}