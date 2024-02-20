"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ChapterActionsProps {
	disabled: boolean;
	courseId: string;
	chapterId: string;
	isPublished: boolean;
}

export const ChapterActions = ({
	disabled,
	courseId,
	chapterId,
	isPublished,
}: ChapterActionsProps) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const onDelete = async () => {
		try {
			setIsLoading(true);

			await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
			toast.success("Chapter deleted");
			router.refresh();
			router.push(`/teacher/courses/${courseId}`);
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex items-center gap-x-2">
			<Button
				onClick={() => {}}
				disabled={disabled || isLoading}
				variant={"outline"}
				size="sm">
				{isPublished ? "Unpublish" : "Publish"}
			</Button>
			<ConfirmModal onConfirm={onDelete}>
				<Button size="sm" disabled={isLoading}>
					<Trash className="h-4 w-4" />
				</Button>
			</ConfirmModal>
		</div>
	);
};