export default function DebugPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">Debug Information</h1>

      <div className="mt-4 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Test Links:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <a href="/regulations/singapore" className="text-blue-600">
                Singapore
              </a>
            </li>
            <li>
              <a href="/regulations/australia" className="text-blue-600">
                Australia
              </a>
            </li>
            <li>
              <a href="/regulations/china" className="text-blue-600">
                China
              </a>
            </li>
            <li>
              <a href="/regulations/japan" className="text-blue-600">
                Japan
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Current Time:</h2>
          <p>{new Date().toISOString()}</p>
        </div>
      </div>
    </div>
  )
}
