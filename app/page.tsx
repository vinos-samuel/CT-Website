import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Globe, Users, Settings, BarChart, Laptop, FileCodeIcon as FileContract } from "lucide-react"
import HeroSection from "@/components/hero-section"
import FeaturedCountries from "@/components/featured-countries"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <FeaturedCountries />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Best Practices</h2>
              <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The leading resource for contingent workforce management
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Worker Classification</h3>
              <p className="text-center text-sm text-slate-500">
                Guidelines for properly classifying workers to ensure compliance with local regulations.
              </p>
              <Link href="/articles/worker-classification" className="text-primary hover:underline text-sm mt-2">
                Learn More
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Contracting Best Practices</h3>
              <p className="text-center text-sm text-slate-500">
                Key considerations for creating compliant contracts for contingent workers.
              </p>
              <Link href="/articles/worker-classification" className="text-primary hover:underline text-sm mt-2">
                Learn More
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Risk Management</h3>
              <p className="text-center text-sm text-slate-500">
                Strategies to identify and mitigate risks associated with contingent workforce.
              </p>
              <Link href="/articles/risk-management" className="text-primary hover:underline text-sm mt-2">
                Learn More
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Operations Management</h3>
              <p className="text-center text-sm text-slate-500">
                Best practices for managing day-to-day operations of your contingent workforce program.
              </p>
              <Link href="/articles/operations-management" className="text-primary hover:underline text-sm mt-2">
                Learn More
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Workforce Planning</h3>
              <p className="text-center text-sm text-slate-500">
                Strategic approaches to planning and forecasting your contingent workforce needs.
              </p>
              <Link href="/articles/workforce-planning" className="text-primary hover:underline text-sm mt-2">
                Learn More
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <Laptop className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Tools & Technology</h3>
              <p className="text-center text-sm text-slate-500">
                Technology solutions to streamline and optimize your contingent workforce management.
              </p>
              <Link href="/articles/tools-technology" className="text-primary hover:underline text-sm mt-2">
                Learn More
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
              <div className="rounded-full bg-primary/10 p-3">
                <FileContract className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">SOW</h3>
              <p className="text-center text-sm text-slate-500">
                Guidelines for creating effective Statements of Work for project-based engagements.
              </p>
              <Link href="/articles/sow" className="text-primary hover:underline text-sm mt-2">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How can we help you?</h2>
              <p className="max-w-[700px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"></p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/contact">
                <Button size="lg">Contact Us</Button>
              </Link>
              <Link href="/regulations">
                <Button size="lg">Explore Resources</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
