import { redirect } from "next/navigation"

export default function RegulationsPage() {
  // Redirect to the countries page
  redirect("/regulations/countries")

  // This code won't execute due to the redirect
  return null
}
