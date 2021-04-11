import client from 'graphql/client'
import { GetPageBySlugQuery, GetPagesQuery } from 'graphql/generated/graphql'
import { GET_PAGES, GET_PAGE_BY_SLUG } from 'graphql/queries'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import PageTemplate, { PageTemplateProps } from 'templates/Pages'

//aqui que eu estou rederizando a pagina
export default function Page({ heading, body}: PageTemplateProps){
  const router = useRouter()
  if(router.isFallback) return null


  return <PageTemplate heading={heading} body={body} />
}

//aqui eu passo os dados pelo request
export async function getStaticPaths() {
  const { pages } = await client.request<GetPagesQuery>(GET_PAGES, { first: 3 })

  //aqui eu verifico para cada slug
  const paths = pages.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

//aqui pelo camigo
export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { page } = await client.request<GetPageBySlugQuery>(GET_PAGE_BY_SLUG, {
    slug : `${  params?.slug}`
  })

  if(!page) return { notFound: true}

  return {
    props : {
      heading: page.heading,
      body: page.body.html
    }
  }
}



// export const getStaticProps = async () => {
//   const {pages} = await client.request(GET_PAGES)

//   console.log(pages)
//   return {
//     props : {}
//   }
// }

//getStaticPaths -> serve para gerar as url em build time / etc..
//getStaticProps -> serve para buscar dados da pagina (props) -> build time
//getServerSideProps -> serve para buscar dados da pagina (props) runime

//getInitialProps ->serve pra buscar dados da pagina runtime
//faz o hydrate


