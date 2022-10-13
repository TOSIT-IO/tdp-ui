import { useTdpClient } from 'src/hooks/useTdpClient'

function HomePage() {
  const { isServerRunning } = useTdpClient()

  return <pre>{JSON.stringify(isServerRunning, null, 2)}</pre>
}

export default HomePage
