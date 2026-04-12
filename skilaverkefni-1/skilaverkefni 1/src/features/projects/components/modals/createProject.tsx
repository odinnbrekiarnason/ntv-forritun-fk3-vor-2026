import { appstore } from "@/shared/appStore/appstore"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Field, FieldContent, FieldDescription, FieldTitle } from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import { useState } from "react"
import type { CreateProjectInput } from "../../types/CreateProjectType"
import { handleInputChange } from "@/shared/handlers/handleInputChange"
import type { CreateTaskInput } from "@/features/tasks/types/createTaskType"



export function CreateProjectPage() {
  const [projectInput, setProjectInput] = useState<CreateProjectInput & CreateTaskInput> ({
    projectName: '',
    description: "",
    taskContent: '',
    taskName: '',
  }); 
  const { createProject, toggleCreateProjectPage } = appstore()
  
  return (
    <Card className="mx-auto w-full max-w-2xl border-border/70 bg-linear-to-br from-indigo-300 to-muted/40 shadow-lg shadow-black/5">
      <CardHeader className="border-b border-border/60 pb-5">
        <div className="space-y-1.5">
          <CardTitle className="text-lg">{projectInput.projectName.length === 0 ? 'Project Title' : `${projectInput.projectName[0].toUpperCase()}${projectInput.projectName.slice(1)}`}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-5">
        <Field>
          <FieldTitle>Project name</FieldTitle>
          <FieldContent>
            <Input 
            autoFocus={true}
            placeholder="Input your Project name"
            value={projectInput.projectName} 
            onChange={(e) => handleInputChange('projectName', e.target.value, setProjectInput)}/>
          </FieldContent>
        </Field>

        <Field>
          <FieldTitle>Description</FieldTitle>
          <FieldDescription>
            Add the project description field here.
          </FieldDescription>
          <FieldContent>
            <textarea
              value={projectInput.description}
              data-slot="textarea"
              className="min-h-28 w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              placeholder="Project description"
              onChange={(e) => handleInputChange('description', e.target.value, setProjectInput)}
            />
          </FieldContent>
        </Field>
      </CardContent>
      <div className="space-x-3">
        <Button variant="outline" type="button" onClick={toggleCreateProjectPage}>
          Cancel
        </Button>
        <Button className="bg-blue-800" type="button" onClick={() => createProject(projectInput)}>
          Save project
        </Button>
      </div>
    </Card>
  )
}