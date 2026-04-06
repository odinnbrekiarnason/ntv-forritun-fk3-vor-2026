import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import type { ProjectType } from "../schema/projectSchema";

export function AllProjectsTemplate() {
  const projects: ProjectType[] = [
    {
      id: 1,
      projectName: "Project template",
      description: "Replace with real projects from store.",
      timeCreated: new Date(),
      taskIds: [1, 2],
      isFinished: false,
      timeFinished: null,
    },
  ];
  const selectedProjectId = 0;
  const onSelectProject = (_projectId: number) => {};
  const onCreateProject = () => {};

  return (
    <Card className="w-full border-border/70 bg-linear-to-br from-background via-background to-muted/30 shadow-lg shadow-black/5">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle>All projects</CardTitle>
            <CardDescription>Select one project to see its tasks and details.</CardDescription>
          </div>
          <Button type="button" onClick={onCreateProject}>
            New project
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {projects.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border/70 px-3 py-4 text-sm text-muted-foreground">
            No projects yet. Start by creating your first project.
          </p>
        ) : (
          <ul className="space-y-2">
            {projects.map((project) => {
              const selected = selectedProjectId === project.id;
              return (
                <li key={project.id}>
                  <button
                    type="button"
                    onClick={() => onSelectProject?.(project.id)}
                    className={[
                      "w-full rounded-lg border px-3 py-3 text-left transition",
                      selected
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
