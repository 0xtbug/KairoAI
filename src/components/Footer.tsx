import React from "react"

export const Footer: React.FC = () => {
  return (
    <p className="text-gray-500 text-center text-xs mt-6">
      Version 1.0 | by{" "}
      <a
        href="http://github.com/0xtbug"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#00bf63] hover:text-[#0ae87f] transition-colors">
        0xtbug
      </a>
    </p>
  )
}
