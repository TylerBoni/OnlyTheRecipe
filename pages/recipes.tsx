import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { RecipesQueryParameters } from '.'
import Layout from '../components/layout'
import { defaultRecipeData, GetOrCreateRecipeEntry } from './api/recipes'
import Link from 'next/link'

const domainNotSupported = (url: string) => {
    return (
        <Layout>
            <Head>
                <title>Recipe Not Supported</title>
            </Head>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
                <Link href={url} target="_blank" className="text-blue-600 underline">Original URL</Link>
                <h1 className="text-2xl font-bold mt-4">Uh-oh! 🔧</h1>
                <p className="mt-2 text-gray-700">
                    Unfortunately, we couldn't parse this recipe. Please open an issue
                    <Link href="https://github.com/tylerboni/OnlyTheRecipe/issues/new" target="_blank" className="text-blue-600 underline"> here </Link>
                    (make sure to include the recipe URL!) and someone will try and add support for this recipe!
                </p>
            </div>
        </Layout>
    )
}

export default function Recipe() {
    const router = useRouter()
    const [data, setData] = useState(defaultRecipeData)
    const [isLoading, setLoading] = useState(false)

    const { originalURL } = router.query as RecipesQueryParameters;

    useEffect(() => {
        if (!originalURL) {
            setLoading(true)
            return
        }

        const reqBody: GetOrCreateRecipeEntry = {
            url: originalURL,
        }

        const fetchData = async () => {
            setLoading(true)
            await fetch('../api/recipes', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBody)
            })
                .then((res) => res.json())
                .then((data) => {
                    setData(data)
                    setLoading(false)
                })
        }
        fetchData()
    }, [setData, originalURL])

    const { ingredients, directions, title, domainIsSupported } = data

    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>
    if (!domainIsSupported) return domainNotSupported(originalURL)

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg ">
                {data.photoUrl && <img src={data.photoUrl} alt={title} className="w-full h-64 object-cover rounded-lg mb-4" />}
                <h1 className="text-3xl font-bold mb-4">{title}</h1>
                {/* <Link href={originalURL} target="_blank" className="text-blue-600 underline mb-6 block">Original Recipe</Link> */}
                <p className="text-gray-700 mb-6">{data.description}</p>

                <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                {ingredients.map((section, idx) => (
                    <div key={`${section.sectionName}-${idx}`} className="mb-6">
                        <h3 className="text-xl font-medium text-gray-800 mb-2">{section.sectionName}</h3>
                        <ul className="list-disc list-inside">
                            {section.ingredients?.map((val, i) => (
                                <li key={`${val}-${i}`} className="text-gray-700">{val}</li>
                            ))}
                        </ul>
                    </div>
                ))}

                <h2 className="text-2xl font-semibold mb-4">Directions</h2>
                <ol className="list-decimal list-inside space-y-10">
                    {directions.map((direction, idx) => (
                        <li key={`${direction}-${idx}`} className="text-gray-700 ">{direction}</li>
                    ))}
                </ol>
            </div>
        </Layout>
    )
}

