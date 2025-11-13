"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "@/src/components/Button/Button";
import Icon from "@/src/components/Icon";
import Text from "@/src/components/Text";

interface Props {
	children: ReactNode;
	title: string;
}

const Modal = ({ children, title }: Props) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				router.back();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [router.back]);

	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				router.back();
			}
		};

		document.addEventListener("keydown", handleEscKey);

		return () => {
			document.removeEventListener("keydown", handleEscKey);
		};
	}, [router.back]);

	useEffect(() => {
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black opacity-50 transition-opacity" />
			<div
				ref={modalRef}
				className="relative bg-white rounded-[16px] shadow-xl max-w-[400px] w-full max-h-[90vh] overflow-y-visible z-10 p-6
				           flex flex-col gap-8"
			>
				<div className="flex justify-between mb-4">
					<Text value={title} className="text-2xl" />
					<Button variant="custom" onClick={() => router.back()}>
						<Icon name="close" />
					</Button>
				</div>

				{children}
			</div>
		</div>,
		document.body,
	);
};

export default Modal;
