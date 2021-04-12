import client from 'graphql/client'
import { GetPlaceBySlugQuery, GetPlacesQuery } from 'graphql/generated/graphql'
import { GET_PLACES, GET_PLACE_BY_SLUG } from 'graphql/queries'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import PlacesTemplate, { PlacesTemplateProps } from 'templates/Places'

//aqui que eu estou rederizando a pagina
export default function Place({ place }: PlacesTemplateProps) {
  const router = useRouter()
  if (router.isFallback) return null

  return <PlacesTemplate place={place} />
}

//aqui eu passo os dados pelo request
export async function getStaticPaths() {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES, {
    first: 3
  })

  //aqui eu verifico para cada slug
  const paths = places.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

//aqui pelo camigo
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { place } = await client.request<GetPlaceBySlugQuery>(
    GET_PLACE_BY_SLUG,
    { slug: `${params?.slug}` }
  )

  if (!place) return { notFound: true }

  return {
    props: {
      place
    }
  }
}
