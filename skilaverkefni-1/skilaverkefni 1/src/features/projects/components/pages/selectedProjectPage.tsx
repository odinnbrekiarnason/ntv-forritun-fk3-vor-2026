import { Button } from "@/shared/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { appstore } from "@/shared/appStore/appstore";
import { TaskCard } from "@/features/tasks/components/task";

export function SelectedProjectPage() {
  const {toggleAllProjectsPage, toggleCreateTaskPage, selectedProjectId, projects, tasks} = appstore()

  const currentProject = projects.find((project) => project.id === selectedProjectId)

  if(!currentProject) {
    toggleAllProjectsPage
    return null;
  }

  return (
    <Card className="mx-auto w-full border-border/70 bg-linear-to-br from-background to-muted/40 shadow-lg shadow-black/5">
      <CardHeader>
        <CardTitle>Project: {currentProject.projectName}</CardTitle>
        <CardDescription>{currentProject.description || "No description yet."}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <CardAction>
          {currentProject.taskIds.length !== 0 &&
          <Button type="button" variant="outline" onClick={toggleCreateTaskPage}>
            Create new Task for this project
          </Button>
          }
          <Button type="button" variant="outline" onClick={toggleAllProjectsPage}>
            Go Back
          </Button>

        </CardAction>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border/60 bg-card/70 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Created</p>
            <p className="text-sm font-medium">{currentProject.timeCreated.toLocaleDateString()}</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-card/70 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Task count</p>
            <p className="text-sm font-medium">{currentProject.taskIds.length}</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-card/70 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Status</p>
            <p className="text-sm font-medium">{currentProject.isFinished ? "Done" : "Active"}</p>
          </div>
        </div>

        {currentProject.taskIds.length === 0 ? (
          <Button type="button" variant="outline" onClick={toggleCreateTaskPage}>
            No tasks yet, click here to create your first task
          </Button>
        ) : (
          <ul className="space-y-2 "  >
            {tasks.filter((task) => currentProject.taskIds.includes(task.id)).map((task) => (
                <li key={task.id}>
                  <TaskCard task={task} />
                </li>
              ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}