import { appstore } from "@/shared/appStore/appstore"
import { Button } from "@/shared/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Field, FieldContent, FieldDescription, FieldTitle } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { useStore } from "zustand"
import type { ProjectType } from "../schema/projectSchema"
import { useState } from "react"
import type { CreateProjectInput } from "../types/CreateProjectType"



export function CreateProject() {
  const [project, setValues] = useState<CreateProjectInput> ({
      projectName: '',
      description: "Replace with selected project from store."
    });

  const {createProject, createTaskPage } = appstore()
  const { toggleStartPage } = appstore()

  return (
    <Card className="relative w-full max-w-2xl overflow-hidden border-border/70 bg-linear-to-br from-background via-background to-muted/40 shadow-lg shadow-black/5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-r from-primary/12 via-transparent to-primary/6" />

      <CardHeader className="relative border-b border-border/60 pb-5">
        <div className="space-y-1.5">
          <CardTitle className="text-lg">Project title</CardTitle>
          <CardDescription>
            Add the project summary or supporting text here.
          </CardDescription>
        </div>

        <CardAction className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            Status
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Task count
          </span>
        </CardAction>
      </CardHeader>

      <CardContent className="relative space-y-5 pt-5">
        <Field>
          <FieldTitle >Project name</FieldTitle>
          <FieldDescription>
            Add your input wiring here.
          </FieldDescription>
          <FieldContent>
            <Input placeholder="Project name" value={project.projectName} onChange={() => {}}/>
          </FieldContent>
        </Field>

        <Field>
          <FieldTitle>Description</FieldTitle>
          <FieldDescription>
            Add the project description field here.
          </FieldDescription>
          <FieldContent>
            <textarea
              value={project.description}
              data-slot="textarea"
              className="min-h-28 w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              placeholder="Project description"
            />
          </FieldContent>
        </Field>

        <div className="grid gap-3 rounded-xl border border-border/60 bg-background/80 p-4 backdrop-blur-sm sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Created
            </p>
            <p className="text-sm font-medium text-foreground">Date placeholder</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Summary
            </p>
            <p className="text-sm font-medium text-foreground">
              Add your stats or metadata here.
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Footer note or helper text.
        </p>

        <div className="flex items-center gap-2">

          <Button variant="outline" type="button" onClick={toggleStartPage}>
            cancel
          </Button>

          <Button>
            Save project
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}