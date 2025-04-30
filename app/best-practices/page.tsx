import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BookOpen, Clock, FileText, Search, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for best practices
const categories = [
  {
    id: "hiring",
    name: "Hiring & Onboarding",
    description: "Best practices for hiring and onboarding contingent workers",
    articles: [
      {
        id: "effective-screening",
        title: "Effective Screening Techniques for Contingent Workers",
        excerpt: "Learn how to effectively screen and select the right contingent workers for your organization.",
        author: "Jane Smith",
        date: "December 5, 2023",
        readTime: "8 min read",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "onboarding-process",
        title: "Creating an Efficient Onboarding Process",
        excerpt:
          "Streamline your onboarding process to get contingent workers productive quickly while ensuring compliance.",
        author: "Michael Johnson",
        date: "November 22, 2023",
        readTime: "12 min read",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "remote-hiring",
        title: "Remote Hiring Strategies for Global Talent",
        excerpt:
          "Discover effective strategies for hiring and managing remote contingent workers across different countries.",
        author: "Sarah Williams",
        date: "November 10, 2023",
        readTime: "10 min read",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    id: "management",
    name: "Management & Retention",
    description: "Strategies for effectively managing and retaining contingent workers",
    articles: [
      {
        id: "performance-management",
        title: "Performance Management for Contingent Workers",
        excerpt:
          "Implement effective performance management systems for your contingent workforce without creating co-employment risks.",
        author: "David Chen",
        date: "December 1, 2023",
        readTime: "9 min read",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "engagement-strategies",
        title: "Engagement Strategies for a Blended Workforce",
        excerpt: "Learn how to keep your contingent workers engaged and aligned with your company culture and goals.",
        author: "Emily Rodriguez",
        date: "November 18, 2023",
        readTime: "7 min read",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "retention-techniques",
        title: "Retention Techniques for High-Value Contractors",
        excerpt:
          "Discover strategies to maintain relationships with your most valuable contingent workers for future engagements.",
        author: "Robert Kim",
        date: "October 25, 2023",
        readTime: "11 min read",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    id: "compliance",
    name: "Compliance & Risk Management",
    description: "Ensuring compliance and managing risks with contingent workforce",
    articles: [
      {
        id: "misclassification-risks",
        title: "Avoiding Worker Misclassification Risks",
        excerpt:
          "Understand the risks of worker misclassification and strategies to ensure proper classification across your workforce.",
        author: "Jennifer Lee",
        date: "December 3, 2023",
        readTime: "14 min read",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "global-compliance",
        title: "Global Compliance Strategies for Multinational Companies",
        excerpt:
          "Navigate the complex landscape of international regulations when managing a global contingent workforce.",
        author: "Thomas Wilson",
        date: "November 15, 2023",
        readTime: "15 min read",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "audit-readiness",
        title: "Maintaining Audit Readiness for Your Contingent Workforce Program",
        excerpt: "Develop processes and documentation practices that keep your program audit-ready at all times.",
        author: "Lisa Martinez",
        date: "October 30, 2023",
        readTime: "10 min read",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
]

export default function BestPracticesPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Non Employee Workforce Best Practices</h1>
          <p className="text-muted-foreground max-w-3xl">
            Discover expert insights, strategies, and best practices for managing your contingent workforce effectively.
            Our resources are developed by industry experts and updated regularly to reflect the latest trends and
            regulations.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search best practices..."
              className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              All Resources
            </Button>
            <Button size="sm">
              <BookOpen className="mr-2 h-4 w-4" />
              Latest Articles
            </Button>
          </div>
        </div>

        <Tabs defaultValue={categories[0].id} className="w-full">
          <div className="mb-8">
            <TabsList className="w-full max-w-3xl grid grid-cols-3 bg-slate-100 dark:bg-slate-800 rounded-lg p-1.5">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="px-3 py-2 text-sm font-medium h-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm rounded-md"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.articles.map((article) => (
                  <Card key={article.id} className="flex flex-col overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <User className="h-3 w-3" /> {article.author} • <Clock className="h-3 w-3" /> {article.readTime}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Link href={`/best-practices/${article.id}`} className="w-full">
                        <Button className="w-full">
                          Read Article <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 md:p-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Need Personalized Advice?</h2>
              <p className="text-muted-foreground">
                Our AI-powered consultant can provide tailored recommendations based on your specific contingent
                workforce challenges.
              </p>
              <Button size="lg" className="mt-2">
                Chat with Our AI Consultant
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm h-64">
                <Image
                  src="/placeholder.svg?height=256&width=384"
                  alt="AI Consultant"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
