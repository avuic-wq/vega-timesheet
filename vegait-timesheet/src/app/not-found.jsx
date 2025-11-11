"use client";

import Link from "next/link";

export default function NotFound() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
			<div className="max-w-lg w-full text-center px-6 py-12">
				<h1 className="text-3xl font-bold mb-3">404 - Page not found</h1>
				<p className="text-grey-500 mb-8">
					Sorry — we couldn’t find what you were looking for.
				</p>

				<div className="flex gap-3 justify-center">
					<Link
						href="/"
						className="inline-flex items-center gap-2 rounded-lg px-4 py-3 bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
					>
						← Home
					</Link>
				</div>

				<p className="text-xs text-gray-400 mt-8">
					If you believe this is a bug, please contact the maintainers.
				</p>
			</div>
		</main>
	);
}
