export default function Header() {
  return (
    <header className="p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-center">
        <svg
          width="120"
          height="40"
          viewBox="0 0 120 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-black"
        >
          <rect width="120" height="40" fill="white" />
          <path d="M20 10H100V30H20V10Z" fill="white" />
          <text x="60" y="25" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="black" textAnchor="middle">
            PALF IA
          </text>
        </svg>
      </div>
    </header>
  )
}
