import EngagementMessagesOverTime from "@/components/EngagementMessagesOverTime";
import Layout from "@/containers/Layout";
import Head from "next/head";
import Link from "next/link";

export default function Graph() {
	return (
		<Layout>
			<Head>
				<title>Graph | Mercle Assignment</title>
			</Head>
			<div className="relative px-5 w-full h-full min-h-screen flex flex-col justify-center items-center">
				<EngagementMessagesOverTime />
				<div className="mt-10 text-sm text-gray-600 underline underline-offset-2 w-full h-12 flex justify-center items-center hover:text-black">
					<Link href={"/"}>Go back</Link>
				</div>
			</div>
		</Layout>
	);
}
