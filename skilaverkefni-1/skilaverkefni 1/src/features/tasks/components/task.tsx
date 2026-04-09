import type { TaskType } from "@/features/tasks/schema/taskSchema";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";

type TaskCardProps = {
	task: TaskType;
};

const formatDateTime = (value: Date | string | null | undefined) => {
	if (!value) return "Not finished";

	const date = value instanceof Date ? value : new Date(value);

	if (Number.isNaN(date.getTime())) return "Invalid date";

	return date.toLocaleString();
};

export function TaskCard({ task }: TaskCardProps) {
	return (
		<Card className="w-full border-border/70 bg-linear-to-br from-background to-muted/40 shadow-lg shadow-black/5">
			<CardHeader>
				<CardTitle>{task.taskName}</CardTitle>
				<CardDescription>{task.taskContent}</CardDescription>
			</CardHeader>

			<CardContent className="grid gap-3 sm:grid-cols-2">
				<div className="rounded-lg border border-border/60 bg-card/70 p-3">
					<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Task ID</p>
					<p className="text-sm font-medium">{task.id}</p>
				</div>

				<div className="rounded-lg border border-border/60 bg-card/70 p-3">
					<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Status</p>
					<p className="text-sm font-medium">{task.isFinished ? "Done" : "Active"}</p>
				</div>

				<div className="rounded-lg border border-border/60 bg-card/70 p-3">
					<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Created</p>
					<p className="text-sm font-medium">{formatDateTime(task.timeCreated)}</p>
				</div>

				<div className="rounded-lg border border-border/60 bg-card/70 p-3">
					<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Finished</p>
					<p className="text-sm font-medium">{formatDateTime(task.timeFinished)}</p>
				</div>
			</CardContent>
		</Card>
	);
}
