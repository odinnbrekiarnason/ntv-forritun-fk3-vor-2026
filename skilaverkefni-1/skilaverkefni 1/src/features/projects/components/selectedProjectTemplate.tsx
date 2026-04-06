import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import type { ProjectType } from "../schema/projectSchema";
import type { TaskType } from "@/features/tasks/schema/taskSchema";

export function SelectedProjectTemplate() {
  const project: ProjectType | null = {
    id: 1,
    projectName: "Project template",
    description: "Replace with selected project from store.",
    timeCreated: new Date(),
    taskIds: [],
    isFinished: false,
    timeFinished: null,
  };
  const tasks: TaskType[] = [];
  const onCreateTask = () => {};
  const onBack = () => {};

  if (!project) {
    return (
      <Card className="w-full border-dashed border-border/70 bg-muted/20">
        <CardHeader>
          <CardTitle>No selected project</CardTitle>
          <CardDescription>Select a project from the list to view details.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full border-border/70 bg-linear-to-br from-background to-muted/40 shadow-lg shadow-black/5">
      <CardHeader>
        <CardTitle>{project.projectName}</CardTitle>
        <CardDescription>{project.description || "No description yet."}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
          <Button type="button" variant="outline" onClick={onBack}>
            Back to projects
          </Button>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border/60 bg-card/70 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Created</p>
            <p className="text-sm font-medium">{project.timeCreated.toLocaleDateString()}</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-card/70 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Task count</p>
            <p className="text-sm font-medium">{tasks.length}</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-card/70 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Status</p>
            <p className="text-sm font-medium">{project.isFinished ? "Done" : "Active"}</p>
          </div>
        </div>
          {project.taskIds.length !== 0 && 
          <Button type="button" onClick={onCreateTask}>
            Create Task
          </Button>
          }
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">
            Tasks in this project 
          </h3> 
          {project.taskIds.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border/70 px-3 py-4 text-sm text-muted-foreground">
              <Button type="button" onClick={onCreateTask}>
                No tasks yet, Create your first task here!
              </Button>
            </p>
            
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li key={task.id} className="rounded-lg border border-border/60 bg-card/70 px-3 py-2">
                  <p className="font-medium">{task.taskName}</p>
                  <p className="text-sm text-muted-foreground">{task.taskContent}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
