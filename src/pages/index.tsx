import Layout from "@/containers/Layout";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>Mercle Assignment | Home</title>
			</Head>
			<div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
				<div className="text-5xl text-gray-900 font-medium">
					Hello👋! I am Harish
				</div>
				<div className="mt-5 text-xl text-gray-700">
					I have completed the given assignment {":)"}
				</div>
				<div>
					<Link href={"/graph"} passHref>
						<button className="mt-10 px-8 py-2 text-lg text-black border border-black rounded-lg hover:bg-black hover:text-white">
							Check it out
						</button>
					</Link>
				</div>
			</div>
		</Layout>
	);
}
