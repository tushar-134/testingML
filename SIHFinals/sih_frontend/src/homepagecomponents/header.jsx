export default function Header() {
  return (
    <header className="border-b border-border bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
            <span className="text-lg font-bold text-white">✨</span>
          </div>
          <div>
            <div className="font-bold text-gray-900">Career Setu</div>
            <div className="text-xs text-gray-500">PM internships</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-gray-700">
          <a href="#" className="flex items-center gap-2 hover:text-gray-900">
            <span className="text-lg">⛔</span>
            <span>Internships</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-gray-900">
            <span className="text-lg">🔖</span>
            <span>Saved</span>
          </a>
        </nav>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="text-right text-sm">
            <div className="font-medium text-gray-900">aniket dash etc</div>
            <div className="text-xs text-gray-500">aniketdash99@gmail.com</div>
          </div>
          <button className="text-sm font-medium text-gray-700 hover:text-gray-900">Logout</button>
        </div>
      </div>
    </header>
  )
}