"use client";

import Link from 'next/link'
 
export default function NotFound() {
  return (
    <>
      <div className="error-area ptb-175">
        <div className="container">
          <div className="row">
            <div className="error-content text-center">
              <h1>4<span>0</span>4</h1>
              <h3>Oops! page is not found</h3>
              <p>Sorry, but the page you are looking for does not exist.</p>
              
              <Link href="/" className="default-btn btn-rounded-0">
                Back To Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}