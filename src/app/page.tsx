import Link from 'next/link'

export default function App() {
  return (
    <>
      <h1>Login page</h1>
      <Link href="/dashboard" className="text-blue-800 underline">
        To the dashboard
      </Link>
    </>
  )
}
