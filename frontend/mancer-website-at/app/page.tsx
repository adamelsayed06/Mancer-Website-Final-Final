'use client'

import Image from "next/image"
import { Check, Lock } from "lucide-react"
import { useState } from "react"


export default function Home() {
  const [status, setStatus] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const name  = (form.elements.namedItem('name')  as HTMLInputElement).value
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const job   = (form.elements.namedItem('job')   as HTMLInputElement).value

    try {
      const res = await fetch(`${process.env.FLASK_API}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, job }),
      })
      if (res.ok) {
        setStatus('✅ You’re on the list!')
        form.reset()
      } else {
        const data = await res.json()
        setStatus(`❌ ${data.error || res.statusText}`)
      }
    } catch {
      setStatus('❌ Network error')
    }
  }

  return (
    <div className="min-h-screen bg-[#070b34] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center mb-16">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-2">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20V18H4V6Z" fill="#5765ff" />
                <path d="M12 6L4 12L12 18L20 12L12 6Z" fill="#5765ff" />
              </svg>
            </div>
            <span className="text-2xl font-bold">Mancer</span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-2">Smarter Construction Communication.</h1>
          <h2 className="text-4xl font-bold mb-8">No Headaches.</h2>
          <p className="text-lg mb-8">
            Let your subs text, email, or call like they already do. We'll turn it
            <br />
            into logs, timelines and invoices - automatically.
          </p>
          <div className="flex justify-center mb-8">
            <button className="bg-[#22357b] hover:bg-[#5765ff] text-white font-medium py-3 px-8 rounded-md transition-colors">
              Join The Waitlist
            </button>
          </div>
          <p className="text-sm">
            Get early updates and a chance to
            <br />
            shape <span className="font-bold">Constructive</span> before launch.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-2 gap-8 mb-24 max-w-6xl mx-auto">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">
              Built for the chaos
              <br />
              of the jobsite.
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="text-white mr-2 mt-1 shrink-0" size={18} />
                <span>
                  <strong>Text, WhatsApp and Email Support</strong>
                  <br />- no app needed
                </span>
              </li>
              <li className="flex items-start">
                <Check className="text-white mr-2 mt-1 shrink-0" size={18} />
                <span>
                  <strong>Auto-generated daily logs, RFIs,</strong>
                  <br />
                  and reports
                </span>
              </li>
              <li className="flex items-start">
                <Check className="text-white mr-2 mt-1 shrink-0" size={18} />
                <span>
                  <strong>AI-logged voice notes from the</strong>
                  <br />
                  field
                </span>
              </li>
              <li className="flex items-start">
                <Check className="text-white mr-2 mt-1 shrink-0" size={18} />
                <span>
                  <strong>Smart reminders for missing</strong>
                  <br />
                  updates
                </span>
              </li>
            </ul>
            <p className="mt-6 font-medium">
              Just send a message - we handle
              <br />
              the rest.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Construction worker with laptop"
                width={400}
                height={400}
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-2">See the difference.</h2>
          <p className="text-center mb-8">Same texts. Same subs. Way less chaos.</p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 border-r border-[#22357b]">
              <h3 className="text-xl font-bold mb-4">Without SyncBuild</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="text-white mr-2 mt-1 shrink-0" size={18} />
                  <span>GCs chase updates all day</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 mt-1 shrink-0" size={18} />
                  <span>Subs forgot to log work</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 mt-1 shrink-0" size={18} />
                  <span>
                    Payment disputes drain
                    <br />
                    time, and money
                  </span>
                </li>
              </ul>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">With SyncBuild</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="text-white mr-2 mt-1 shrink-0" size={18} />
                  <span>
                    All comms routed through an AI
                    <br />
                    email/phone per project
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 mt-1 shrink-0" size={18} />
                  <span>
                    Auto-tagged logs, timelines, and
                    <br />
                    work summaries
                  </span>
                </li>
                <li className="flex items-start">
                  <Check className="text-white mr-2 mt-1 shrink-0" size={18} />
                  <span>
                    Instant documentation for proof
                    <br />
                    and faster payment
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Waitlist Form */}
        <section className="max-w-md mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center mb-8">Join the Waitlist.</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm">
                Name <span className="text-xs text-gray-400">(Required)</span>
              </label>
              <input
                name="name"
                type="text"
                id="name"
                className="w-full p-3 bg-[#22357b] rounded-md focus:outline-none focus:ring-2 focus:ring-[#5765ff]"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-sm">
                Email Address <span className="text-xs text-gray-400">(Required)</span>
              </label>
              <input
                name="email"
                type="email"
                id="email"
                className="w-full p-3 bg-[#22357b] rounded-md focus:outline-none focus:ring-2 focus:ring-[#5765ff]"
                required
              />
            </div>
            <div>
              <label htmlFor="job" className="block mb-1 text-sm">
                Job <span className="text-xs text-gray-400">(Required)</span>
              </label>
              <input
                name="job"
                type="text"
                id="job"
                className="w-full p-3 bg-[#22357b] rounded-md focus:outline-none focus:ring-2 focus:ring-[#5765ff]"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#22357b] hover:bg-[#5765ff] text-white font-medium py-3 px-8 rounded-md transition-colors"
              >
                Submit!!!
              </button>
              <div className="flex items-center justify-center mt-4 text-sm">
                <Lock className="text-[#5765ff] mr-2" size={16} />
                <p>
                  We'll only use your info
                  <br />
                  to notify you when
                  <br />
                  <span className="font-bold">Constructive</span> is ready.
                </p>
              </div>
            </div>
          </form>
          {status && (
            <p className="mt-4 text-center font-medium">
              {status}
            </p>
          )}
        </section>

        {/* Footer */}
        <footer className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Contact Us:</h3>
          <a
            href="mailto:team@mancertech.com"
            className="text-[#ffffff] hover:text-[#5765ff] transition-colors"
          >
            team@mancertech.com
          </a>
        </footer>
      </div>
    </div>
  )
}
