import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { appstore } from "@/shared/appStore/appstore";


export function AllProjectsTemplate() {
  const { projects, setProject, toggleCreateProjectPage, toggleStartPage} = appstore()
  const handleClick = (value: string) => {
    const id = parseInt(value)
    setProject(id)
  }

  return (
    <Card className="w-full border-border/70 bg-linear-to-br from-background via-background to-muted/30 shadow-lg shadow-black/5">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <div className="space-y-1">
            <CardTitle>All projects</CardTitle>
            <CardDescription>Select one project to see its tasks and details.</CardDescription>
          </div>
        </div>
        {projects.length !== 0 && 
        <Button variant={'ghost'} type="button" onClick={() => toggleCreateProjectPage()}>
            Create new project
        </Button>
        }
        <Button variant={'ghost'} type="button" onClick={() => toggleStartPage()}>
            Back to start
        </Button>
      </CardHeader>

      <CardContent>
        {projects.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border/70 px-3 py-4 text-sm text-muted-foreground">
            <Button variant={'ghost'} type="button" onClick={() => toggleCreateProjectPage()}>
              No projects yet. Click here to create your first project.
            </Button>
          </p>
        ) : (
          <ul className="space-y-2">
            {projects.map((project) => {
              return (
                <li key={project.id}>
                  <button
                    type="button"
                    value={project.id}
                    onClick={(e) => handleClick(e.currentTarget.value)}
                    className={[
                      "w-full rounded-lg border px-3 py-3 text-left transition",
                      project.id
                        ? "border-primary bg-primary/10"
                        : "border-border/60 bg-card/70 hover:border-primary/40 hover:bg-primary/5",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium">{project.projectName}</p>
                      <span className="text-xs text-muted-foreground">{project.taskIds.length} tasks</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{project.description || "No description"}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
