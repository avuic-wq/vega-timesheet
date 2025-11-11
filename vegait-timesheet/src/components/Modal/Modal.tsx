"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
	isOpen: boolean;
	returnUrl: string;
	children: ReactNode;
}

const Modal = ({ isOpen, returnUrl, children }: Props) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				router.push(returnUrl);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, returnUrl, router.push]);

	useEffect(() => {
		if (!isOpen) return;

		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				router.push(returnUrl);
			}
		};

		document.addEventListener("keydown", handleEscKey);

		return () => {
			document.removeEventListener("keydown", handleEscKey);
		};
	}, [isOpen, returnUrl, router.push]);

	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black opacity-50 transition-opacity" />
			<div
				ref={modalRef}
				className="relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto z-10"
			>
				{children}
			</div>
		</div>,
		document.body,
	);
};

export default Modal;
