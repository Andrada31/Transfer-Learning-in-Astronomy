"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function NavbarMenu() {
  const [open, setOpen] = useState(true)

  return (

      <Sheet open={open} onOpenChange={setOpen}>

        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50">
            <Menu className="h-4 w-4"/>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-slate-950">
            <div className="flex flex-col h-full">
                <div className="flex-shrink-0 p-4">
                    <h2 className="text-2xl pt-15 ">EXPERIMENTAL RESULTS & ANALYTICS</h2>
                </div>
                <a variant="ghost" className="tab" href="/resnet">
                    ResNet
                </a>
                <a variant="ghost" className="tab" href="/efficientnet">
                    EfficientNet
                </a>
                <a variant="ghost" className="tab" href="vgg">
                    VGG
                </a>

                <a variant="ghost" className="tab" href="vgg">
                    VGG
                </a>

            </div>

        </SheetContent>

      </Sheet>
  )
}
