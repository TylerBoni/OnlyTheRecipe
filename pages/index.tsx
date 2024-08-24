import Head from 'next/head'
import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

export type RecipesQueryParameters = {
  originalURL: string,
}

export default function Home() {
  const router = useRouter()
  const [inputValue, setInputValue] = useState("")

  const submitRecipe = () => {
    if (inputValue !== "") {
      const query: RecipesQueryParameters = { "originalURL": inputValue }
      router.push({ pathname: "/recipes", query })
    }
  }

  const keyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      submitRecipe()
    }
  }

  return (
    <Layout home>
      <Head>
        <title >{siteTitle}</title>
      </Head>
      <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-lg">
        <form className="w-full max-w-lg">
          <input
            id="recipeLinkInput"
            type="text"
            placeholder="Recipe URL"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e: React.FormEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)}
            onKeyDown={keyDown}
          />
        </form>
        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-blue-600 text-white flex items-center rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={submitRecipe}
        >
          Get The Recipe
        </button>
        <p className="mt-4 text-gray-600">No videos. No ads. No walls of text. Only the recipe.</p>
        <div className="flex flex-row items-center fixed bottom-4 left-1/2 transform -translate-x-1/2 space-x-4">
          <a href="https://www.buymeacoffee.com/tylerboni" target="_blank" rel="noopener noreferrer">
            <img
              src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
              alt="Buy Me A Coffee"
              className="w-32 h-auto"
            />
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
    </Layout>
  )
}

