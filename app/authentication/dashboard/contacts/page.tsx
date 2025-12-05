import { AppSidebar } from "@/components/app-sidebar"
import Image from "next/image"
import { facilities } from '@/lib/constant'; // We will use this data now
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator, 
} from "@/components/ui/breadcrumb"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"


export default async function ContactsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-[#CEDBEE]">
          <div className="flex items-center gap-2 px-4">
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/authentication/dashboard" className="text-black">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/contacts" className="text-black">
                    Contacts
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-[#EEF4ED]">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 p-3">
            {facilities.map((item, index) => (
              <Card 
                key={item.id || index} 
                className="flex flex-col w-full bg-[#556378] rounded-xl overflow-hidden border-none"
              >
                <div className="relative w-55 h-55 shrink-0 rounded-full overflow-hidden self-center">
                  <Image
                    src={item.imageSrc} 
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex flex-1 items-center justify-center p-1 text-white font-bold text-2xl text-center">
                  {item.title}
                </CardContent>
                <div className="flex flex-1 items-center justify-center text-white font-regular text-xl text-center underline">
                 {item.contactnum}
                </div>

              </Card>
            ))}
            
          </div>
        </div>

      </SidebarInset>
    </SidebarProvider>
  )
}