import { useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { appstore } from "@/shared/appStore/appstore";
import { TaskCard } from "@/features/tasks/components/task";

export function SelectedProjectPage() {
  const {toggleStartPage} = appstore()
  const putOnStartPage = appstore((state) => state.startPage = true)
  const currentProject = appstore((state) => {return state.projects.find((project) => project.id === state.selectedProjectId)})
  const tasks = appstore((state) => state.tasks.filter((task) => currentProject?.taskIds.includes(task.id)))

  useEffect(() => {
    if (!currentProject) {
      putOnStartPage
    }
  }, [currentProject, toggleStartPage])

  if(!currentProject) {
    return null;
  }

  return (
    <Card className="w-full border-border/70 bg-linear-to-br from-background to-muted/40 shadow-lg shadow-black/5">
      <CardHeader>
        <CardTitle>{currentProject.projectName}</CardTitle>
        <CardDescription>{currentProject.description || "No description yet."}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
          <Button type="button" variant="outline" onClick={toggleStartPage}>
            Back to start
          </Button>
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
          <ol className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id}>
                <TaskCard task={task} />
              </li>
            ))}
          </ol>
      </CardContent>
    </Card>
  );
}
