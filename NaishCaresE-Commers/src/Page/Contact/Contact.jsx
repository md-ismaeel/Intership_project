import React from 'react'

export default function Contact() {
  return (
    <>
      <section className={`w-full min-h-screen`}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-2 border rounded h-32"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
