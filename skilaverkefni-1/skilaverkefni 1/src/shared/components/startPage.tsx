
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Separator } from "@/shared/components/ui/separator"
import { ClipboardList, FolderKanban, Sparkles } from "lucide-react"
import { appstore } from "../appStore/appstore"



export function StartPage() {
  const {projectCounter, taskCounter, toggleCreateProjectPage, toggleAllProjectsPage} = appstore()

  return (
    <main className="flex min-h-[80svh] w-full items-center justify-center p-4 sm:p-8">
      <Card className="relative w-full max-w-3xl overflow-hidden border-border/70 bg-linear-to-br from-background via-background to-muted/30 shadow-xl shadow-black/5">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

        <CardHeader className="relative space-y-4 pb-5">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Welcome back
          </div>

          <div className="space-y-2 text-left">
            <CardTitle className="text-3xl tracking-tight sm:text-4xl">
              Welcome to team task hub!
            </CardTitle>
            <CardDescription className="max-w-xl text-sm leading-6 sm:text-base">
              Create a project or continue where you left off. Keep tasks organized, track progress, and stay focused.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border/60 bg-card/70 p-4 text-left">
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <FolderKanban className="h-4 w-4" />
                Current number of Projects: {projectCounter}
              </p>
              <p className="text-2xl font-semibold text-foreground"></p>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/70 p-4 text-left">
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <ClipboardList className="h-4 w-4" />
                Current number of Tasks: {taskCounter}
              </p>
              <p className="text-2xl font-semibold text-foreground"></p>
            </div>
          </div>

          <Separator />

          <p className="text-left text-sm text-muted-foreground">
            Tip: keep project names short and clear, then split the work into small tasks.
          </p>
        </CardContent>

        <CardFooter className="relative flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button className="w-full sm:w-auto" type="button" onClick={toggleCreateProjectPage}>
            Create new project
          </Button>
          <Button className="w-full sm:w-auto" type="button" variant="outline" onClick={toggleAllProjectsPage}>
            Browse projects
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}