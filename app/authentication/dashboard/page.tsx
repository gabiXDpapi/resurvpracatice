import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button";
import Image from "next/image"
import { createClient } from "@/utils/supabase/server";
import { FacilityCard } from "../../../components/FacilityCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator, 
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
type Facility ={
  id: string;
  title: string;
  imageSrc: string;
  desc: string; 
  contactnum: string;
  localnum: string;
}

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: facilities, error } = await supabase
    .from('facilities')
    .select('*');

  if (error) {
    console.error("Error fetching facilities:", error);
  }

  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-[#CEDBEE]">
          <div className="flex items-center gap-2 px-4">

            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb >
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/authentication/dashboard" className= "text-black">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-[#EEF4ED]">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 rows-3 p-3 ">
            {facilities?.map((facility) => (
              <FacilityCard
                key={facility.id}
                id={facility.id}
                title={facility.title}
                imageSrc={facility.image_url} // CHANGED: match the DB column name
              />
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
