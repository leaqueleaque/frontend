export const getServerSideProps = async () => {
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  // const repo = await res.json()
  const repo = {stargazers_count: 'hello'}
  return { props: { repo } }
}

export default function Page({ repo }) {
  return repo.stargazers_count
}