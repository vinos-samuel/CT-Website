"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  FileText,
  Globe,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Settings,
  Activity,
} from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  countries: number
  regions: number
  regulations: number
  articles: number
  pendingReviews: number
  recentActivity: Array<{
    id: string
    action: string
    resource: string
    user: string
    timestamp: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    countries: 0,
    regions: 0,
    regulations: 0,
    articles: 0,
    pendingReviews: 0,
    recentActivity: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load dashboard statistics
    const loadStats = async () => {
      try {
        // In a real implementation, these would be API calls
        setStats({
          countries: 12,
          regions: 45,
          regulations: 234,
          articles: 67,
          pendingReviews: 8,
          recentActivity: [
            {
              id: "1",
              action: "Updated regulation",
              resource: "Singapore Employment Act",
              user: "Admin User",
              timestamp: "2 hours ago",
            },
            {
              id: "2",
              action: "Created article",
              resource: "Risk Management Best Practices",
              user: "Editor User",
              timestamp: "4 hours ago",
            },
            {
              id: "3",
              action: "Added country",
              resource: "Malaysia",
              user: "Admin User",
              timestamp: "1 day ago",
            },
          ],
        })
      } catch (error) {
        console.error("Failed to load dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your CT HUB content and regulations</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/regulations/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Regulation
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/articles/new">
              <FileText className="h-4 w-4 mr-2" />
              New Article
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <Globe className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.countries}</div>
            <p className="text-xs text-gray-600">Active jurisdictions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regulations</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.regulations}</div>
            <p className="text-xs text-gray-600">Total regulations tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.articles}</div>
            <p className="text-xs text-gray-600">Published content</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReviews}</div>
            <p className="text-xs text-gray-600">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="quick-actions">Quick Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Content Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Content Management
                </CardTitle>
                <CardDescription>Manage articles, regulations, and resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/admin/regulations">
                    <Globe className="h-4 w-4 mr-2" />
                    Manage Regulations
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/admin/articles">
                    <FileText className="h-4 w-4 mr-2" />
                    Manage Articles
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/admin/infographics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Manage Infographics
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/admin/templates">
                    <FileText className="h-4 w-4 mr-2" />
                    Manage Templates
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Status
                </CardTitle>
                <CardDescription>Current system health and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Backup</span>
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />2 hours ago
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest changes and updates across the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg border">
                    <div className="flex-shrink-0">
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.resource}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-xs text-gray-500">{activity.user}</p>
                      <p className="text-xs text-gray-400">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quick-actions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/admin/countries/new">Add Country</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/articles/new">Create Article</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/infographics/new">Add Infographic</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/templates/new">Add Template</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bulk Operations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  Import Regulations
                </Button>
                <Button variant="outline" className="w-full">
                  Export Data
                </Button>
                <Button variant="outline" className="w-full">
                  Backup System
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">System Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/admin/users">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
                <Button variant="outline" className="w-full">
                  <Activity className="h-4 w-4 mr-2" />
                  View Audit Log
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
