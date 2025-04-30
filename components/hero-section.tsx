import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-teal-900 to-teal-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                Contingent Workforce Management Hub
              </h1>
              <p className="max-w-[600px] text-slate-300 md:text-xl">
                Your guide to non employee or contingent workforce management. Includes latest contingent workforce
                regulations across countries, best practices and more. Designed for HR, procurement, operations and
                employment legal professionals.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/regulations/countries">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Explore Regulations
                </Button>
              </Link>
              <Link href="/best-practices">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Best Practices
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full h-full min-h-[300px] rounded-lg overflow-hidden bg-slate-700 p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700/50 to-slate-900/50"></div>
              <div className="relative z-10 flex flex-col h-full justify-center">
                <h3 className="text-xl font-bold text-white mb-4">AI Workforce Consultant</h3>
                <p className="text-slate-300 mb-6">
                  Get instant answers to your contingent workforce questions with our AI-powered chatbot.
                </p>
                <a
                  href="https://chatgpt.com/g/g-3Ao2PgYWi-non-employee-workforce-advisor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full md:w-auto" variant="secondary">
                    Ask a Question
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
