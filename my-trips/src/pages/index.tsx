import dynamic from 'next/dynamic'

const Map = dynamic(() => import('components/Map'), { ssr: false })

const placeTwo = {
  id: '2',
  name: 'Reykjavik',
  slug: 'reykjavik',
  location: {
    latitude: 64.5,
    longitude: -20
  }
}

export default function Home() {
  return <Map places={[placeTwo]} />
}
