export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="p-4 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Git Commit AI</div>
          <div className="flex gap-4">
            <a href="/pricing" className="hover:text-blue-400">Pricing</a>
            <a href="/auth/login" className="hover:text-blue-400">Login</a>
            <a href="/auth/register" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Start Free Trial</a>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Transform Your Git Commits with AI</h1>
        <p className="text-xl mb-8">Generate professional, consistent commit messages in seconds.</p>
        <a href="/auth/register" className="inline-block px-8 py-3 bg-blue-600 rounded-lg text-lg hover:bg-blue-700">
          Start 14-Day Free Trial
        </a>
      </div>
      
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Individual</h3>
            <p className="text-3xl font-bold mb-4">$9/month</p>
            <a href="/auth/register" className="block text-center bg-blue-600 py-2 rounded hover:bg-blue-700">
              Start Free Trial
            </a>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg border-2 border-blue-600">
            <h3 className="text-xl font-bold mb-4">Team</h3>
            <p className="text-3xl font-bold mb-4">$29/user/month</p>
            <a href="/auth/register" className="block text-center bg-blue-600 py-2 rounded hover:bg-blue-700">
              Start Free Trial
            </a>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Enterprise</h3>
            <p className="text-3xl font-bold mb-4">Custom</p>
            <a href="/contact" className="block text-center bg-gray-600 py-2 rounded hover:bg-gray-700">
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}