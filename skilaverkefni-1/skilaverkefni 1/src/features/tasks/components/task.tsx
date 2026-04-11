import type { TaskType } from "@/features/tasks/schema/taskSchema";
import {Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

type TaskCardProps = {
	task: TaskType;
};

export function TaskCard({ task }: TaskCardProps) {
  const timeCreated = task.timeCreated.toLocaleString()
  const timeFinished = task.timeFinished ? task.timeFinished.toLocaleString() : null
  
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
					<p className="text-sm font-medium">{timeCreated}</p>
				</div>

				<div className="rounded-lg border border-border/60 bg-card/70 p-3">
					<p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Time finished</p>
					<p className="text-sm font-medium">{timeFinished ?? 'Not Finished'}</p>
				</div>
			</CardContent>
		</Card>
	);
}
