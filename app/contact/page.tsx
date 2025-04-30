import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AtSign, Building, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Contact Us</h1>
          <p className="text-muted-foreground max-w-3xl">
            Have questions about contingent workforce management or interested in our freelancing consultancy services?
            Get in touch with our team of experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general">General Inquiry</TabsTrigger>
                <TabsTrigger value="freelancing">Freelancing Services</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>General Inquiry</CardTitle>
                    <CardDescription>
                      Have questions about our resources or need help with contingent workforce management?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Enter your last name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Enter your company name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Enter the subject of your inquiry" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Enter your message" rows={5} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Submit Inquiry</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="freelancing" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Freelancing Services Inquiry</CardTitle>
                    <CardDescription>
                      Interested in our freelancing consultancy services for contingent workforce management?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name-freelance">First name</Label>
                        <Input id="first-name-freelance" placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name-freelance">Last name</Label>
                        <Input id="last-name-freelance" placeholder="Enter your last name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-freelance">Email</Label>
                      <Input id="email-freelance" type="email" placeholder="Enter your email address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-freelance">Company</Label>
                      <Input id="company-freelance" placeholder="Enter your company name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone-freelance">Phone</Label>
                      <Input id="phone-freelance" placeholder="Enter your phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service-type">Service Type</Label>
                      <select
                        id="service-type"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select a service type</option>
                        <option value="consulting">Consulting Services</option>
                        <option value="program-setup">Program Setup</option>
                        <option value="compliance-audit">Compliance Audit</option>
                        <option value="training">Training & Workshops</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="project-details">Project Details</Label>
                      <Textarea id="project-details" placeholder="Describe your project or requirements" rows={5} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Request Consultation</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Reach out to us directly using the following contact information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <AtSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-sm text-muted-foreground">info@workforcehub.com</p>
                    <p className="text-sm text-muted-foreground">support@workforcehub.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9:00 AM - 5:00 PM EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Headquarters</h3>
                    <p className="text-sm text-muted-foreground">Workforce Hub, Inc.</p>
                    <p className="text-sm text-muted-foreground">123 Business Avenue, Suite 500</p>
                    <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Quick answers to common questions about our services.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">What services do you offer?</h3>
                  <p className="text-sm text-muted-foreground">
                    We provide comprehensive resources for contingent workforce management, including regulatory
                    information, best practices, templates, and freelancing consultancy services.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">How often is the regulatory information updated?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our regulatory information is updated on a monthly or bi-monthly basis to ensure you have access to
                    the most current information.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Can I request custom templates or resources?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, we offer custom template development services tailored to your specific business needs. Contact
                    us for more information.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">How does the AI consultant work?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI consultant draws on our extensive knowledge base to provide instant answers to your
                    contingent workforce management questions. It's available 24/7 and continuously learns from new
                    information.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
