"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const closeSheet = () => {
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-4">
                <Link href="/" className="flex items-center gap-2 font-bold" onClick={closeSheet}>
                  Contingent Workforce Hub
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="hover:text-primary" onClick={closeSheet}>
                    Home
                  </Link>
                  <Link href="/regulations/countries" className="hover:text-primary" onClick={closeSheet}>
                    Regulations
                  </Link>
                  <Link href="/best-practices" className="hover:text-primary" onClick={closeSheet}>
                    Non Employee Workforce Best Practices
                  </Link>
                  <Link href="/templates" className="hover:text-primary" onClick={closeSheet}>
                    Templates
                  </Link>
                  <Link href="/contact" className="hover:text-primary" onClick={closeSheet}>
                    Contact
                  </Link>
                </nav>
                <div className="flex flex-col gap-2">
                  <Link href="/admin/login" onClick={closeSheet}>
                    <Button className="w-full">Admin Login</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-bold">
            Contingent Workforce Hub
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/regulations/countries" className="text-sm font-medium hover:text-primary">
            Regulations
          </Link>
          <Link href="/best-practices" className="text-sm font-medium hover:text-primary">
            Best Practices
          </Link>
          <Link href="/templates" className="text-sm font-medium hover:text-primary">
            Templates
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Link href="/admin/login" className="hidden md:block">
            <Button variant="outline">Admin Login</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
