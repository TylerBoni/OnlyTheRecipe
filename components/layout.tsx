import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const name = 'Only The Recipe'
export const siteTitle = 'Only The Recipe'

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <Head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌯</text></svg>"></link>
        <meta
          name="description"
          content="Get just the recipe information"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className="flex justify-center items-center flex-col">
        {home ? (
          <>
            <h1 className="text-7xl pb-2 pr-4 hover:cursor-default">🌯</h1>
            <h1 className="text-4xl mb-8 hover:cursor-default">{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <div className="flex justify-center items-center flex-col hover:cursor-pointer">
                <text className="block text-7xl pr-2 hover:no-underline">🌯</text>
                <h2 className="text-2xl mt-4">
                  <text className="text-gray-900 hover:no-underline">{name}</text>
                </h2>
              </div>
            </Link>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className="mt-8 text-center">
          <Link href="/">
            <a className="text-blue-600 hover:underline">← Back to home</a>
          </Link>
          <div className="flex justify-center items-center pt-4">
            <a className="pr-4" href="https://www.buymeacoffee.com/tylerboni" target="_blank" rel="noopener noreferrer">
              <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
                alt="Buy Me A Coffee"
                className="w-32 h-auto" />
            </a>
            <a href="https://github.com/tylerboni/OnlyTheRecipe" target="_blank" rel="noopener noreferrer">
              <Image
                priority
                src="/images/github.png"
                width={32}
                height={32}
                alt="GitHub"
                className="hover:opacity-80"
              />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
