export default function StaticHome() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold dark:text-white">Git Commit AI</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="/pricing" className="text-gray-700 dark:text-gray-300">Pricing</a>
            <a href="/auth/login" className="text-gray-700 dark:text-gray-300">Login</a>
          </div>
        </div>
      </nav>
      
      <div className="pt-20 px-4">
        <div className="max-w-6xl mx-auto text-center py-20">
          <h1 className="text-5xl font-bold mb-6 dark:text-white">
            Transform Your Git Commits with AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Generate professional commit messages in seconds
          </p>
          
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8 dark:text-white">Simple Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Individual</h3>
                <p className="text-3xl font-bold mb-4 dark:text-white">$9/month</p>
                <a href="/auth/register" className="block bg-blue-600 text-white py-2 px-4 rounded">
                  Start Free Trial
                </a>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow border-2 border-blue-600">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Team</h3>
                <p className="text-3xl font-bold mb-4 dark:text-white">$29/user</p>
                <a href="/auth/register" className="block bg-blue-600 text-white py-2 px-4 rounded">
                  Start Free Trial
                </a>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Enterprise</h3>
                <p className="text-3xl font-bold mb-4 dark:text-white">Custom</p>
                <a href="/contact" className="block bg-gray-600 text-white py-2 px-4 rounded">
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}