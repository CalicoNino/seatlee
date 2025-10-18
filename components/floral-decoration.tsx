"use client"

export function FloralDecoration() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-20">
      {/* Top left vine */}
      <svg className="absolute left-0 top-0 h-64 w-64 text-primary" viewBox="0 0 200 200">
        <path
          d="M 0,0 Q 30,30 50,60 T 80,120 T 100,180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="animate-vine"
        />
        <circle cx="30" cy="30" r="8" fill="currentColor" className="animate-float" style={{ animationDelay: "0s" }} />
        <circle
          cx="50"
          cy="60"
          r="6"
          fill="currentColor"
          className="animate-float"
          style={{ animationDelay: "0.5s" }}
        />
        <circle cx="80" cy="120" r="7" fill="currentColor" className="animate-float" style={{ animationDelay: "1s" }} />
      </svg>

      {/* Top right flowers */}
      <svg className="absolute right-0 top-0 h-48 w-48 text-accent" viewBox="0 0 150 150">
        <circle
          cx="75"
          cy="40"
          r="12"
          fill="currentColor"
          opacity="0.6"
          className="animate-float"
          style={{ animationDelay: "0.3s" }}
        />
        <circle
          cx="90"
          cy="50"
          r="10"
          fill="currentColor"
          opacity="0.5"
          className="animate-float"
          style={{ animationDelay: "0.6s" }}
        />
        <circle
          cx="60"
          cy="50"
          r="10"
          fill="currentColor"
          opacity="0.5"
          className="animate-float"
          style={{ animationDelay: "0.9s" }}
        />
        <circle
          cx="75"
          cy="60"
          r="8"
          fill="currentColor"
          opacity="0.7"
          className="animate-float"
          style={{ animationDelay: "1.2s" }}
        />
      </svg>

      {/* Bottom right vine */}
      <svg className="absolute bottom-0 right-0 h-64 w-64 rotate-180 text-primary" viewBox="0 0 200 200">
        <path
          d="M 0,0 Q 30,30 50,60 T 80,120 T 100,180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="animate-vine"
          style={{ animationDelay: "0.5s" }}
        />
        <circle
          cx="30"
          cy="30"
          r="8"
          fill="currentColor"
          className="animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <circle cx="50" cy="60" r="6" fill="currentColor" className="animate-float" style={{ animationDelay: "2s" }} />
      </svg>

      {/* Bottom left flowers */}
      <svg className="absolute bottom-0 left-0 h-48 w-48 text-accent" viewBox="0 0 150 150">
        <circle
          cx="40"
          cy="110"
          r="10"
          fill="currentColor"
          opacity="0.6"
          className="animate-float"
          style={{ animationDelay: "0.7s" }}
        />
        <circle
          cx="60"
          cy="120"
          r="12"
          fill="currentColor"
          opacity="0.5"
          className="animate-float"
          style={{ animationDelay: "1.4s" }}
        />
        <circle
          cx="80"
          cy="115"
          r="9"
          fill="currentColor"
          opacity="0.6"
          className="animate-float"
          style={{ animationDelay: "2.1s" }}
        />
      </svg>
    </div>
  )
}
