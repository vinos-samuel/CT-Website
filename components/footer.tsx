import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t border-teal-200 bg-teal-50 dark:bg-teal-900 dark:border-teal-800 py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Link href="/" className="flex items-center gap-2 font-bold text-teal-900 dark:text-teal-50">
            Contingent Workforce Hub
          </Link>
          <p className="text-sm text-teal-700 dark:text-teal-200 text-center md:text-left">
            Your central hub for contingent workforce management resources.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-teal-900 dark:text-teal-50">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/regulations/countries"
                    className="text-teal-700 dark:text-teal-200 hover:text-teal-900 dark:hover:text-white"
                  >
                    Regulations
                  </Link>
                </li>
                <li>
                  <Link
                    href="/best-practices"
                    className="text-teal-700 dark:text-teal-200 hover:text-teal-900 dark:hover:text-white"
                  >
                    Best Practices
                  </Link>
                </li>
                <li>
                  <Link
                    href="/templates"
                    className="text-teal-700 dark:text-teal-200 hover:text-teal-900 dark:hover:text-white"
                  >
                    Templates
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-teal-900 dark:text-teal-50">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-teal-700 dark:text-teal-200 hover:text-teal-900 dark:hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-teal-700 dark:text-teal-200 hover:text-teal-900 dark:hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-teal-700 dark:text-teal-200 hover:text-teal-900 dark:hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-6 border-t border-teal-200 dark:border-teal-800 pt-6">
        <div className="text-center text-xs text-teal-700 dark:text-teal-200 space-y-1">
          <p>© {new Date().getFullYear()} Contingent Workforce Hub. All rights reserved.</p>
          <p>Last updated: April 7, 2025</p>
          <p>Data sourced from government websites and reputable legal sources.</p>
        </div>
      </div>
    </footer>
  )
}
