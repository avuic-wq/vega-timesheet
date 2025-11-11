"use client";

import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-grey-100">
			<h1 className="text-3xl font-bold mb-3">404 - Page not found</h1>
			<p className="text-grey-500 mb-8">
				Sorry — we couldn’t find what you were looking for.
			</p>

			<div className="flex gap-3 justify-center">
				<Link
					href="/"
					className="rounded-lg px-4 py-3 bg-black text-white hover:bg-primary hover:text-black transition"
				>
					← Home
				</Link>
			</div>

			<p className="text-xs text-gray-400 mt-8">
				If you believe this is a bug, please contact the maintainers.
			</p>
		</div>
	);
}
