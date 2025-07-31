import Link from 'next/link'
import React from 'react'

const Notfound = () => {
  return (
    <div>
      <h2>Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link href="/">
          <button>Go to Home</button>
        </Link>
    </div>
  )
}

export default Notfound
