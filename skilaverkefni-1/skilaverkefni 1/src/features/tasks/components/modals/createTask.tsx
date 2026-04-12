import { appstore } from "@/shared/appStore/appstore";
import { Button } from "@/shared/components/ui/button";
import { handleInputChange } from '@/shared/handlers/handleInputChange'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldError, FieldTitle } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import type { CreateTaskInput } from "../../types/createTaskType";
import { useState } from "react";
import type { CreateProjectInput } from "@/features/projects/types/CreateProjectType";

export function CreateTaskTemplate() {
  const { createTask, toggleCreateTaskPage, selectedProjectId, projects } = appstore()
  const selectedProjectName = projects.find((project) => project.id === selectedProjectId)

  const [taskInput, setTaskInput] = useState<CreateTaskInput & CreateProjectInput> ({
    projectName: '',
    description: '',
    taskName: '',
    taskContent: '',
  }); 

  const [touched, setTouched] = useState({
    taskName: false,
    taskContent: false,
  });

  const taskNameError =
    taskInput.taskName.trim().length < 3
      ? "Task name must be at least 3 characters."
      : "";

  const taskContentError =
    taskInput.taskContent.trim().length < 10
      ? "Task content must be at least 10 characters."
      : "";

  const hasErrors = Boolean(taskNameError || taskContentError);
  const disabled = hasErrors;

  const handleSaveTask = () => {
    setTouched({ taskName: true, taskContent: true });
    if (hasErrors) return;

    createTask(selectedProjectId, {
      taskName: taskInput.taskName.trim(),
      taskContent: taskInput.taskContent.trim(),
    });
  }; 

	return (
    <Field>
      <Card className="mx-auto w-full max-w-2xl border-border/70 bg-linear-to-br from-indigo-300 to-muted/40 shadow-lg shadow-black/5">
        <CardHeader>
          <CardTitle>Create task for project {selectedProjectName?.projectName}</CardTitle>
          <CardDescription>
            Fill in the fields below and connect this form to your createTask action.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Field>
            <FieldTitle>{taskInput.taskName.length <= 0 ? 'Task name' : taskInput.taskName}</FieldTitle>
            <FieldDescription>Short title that clearly explains the work.</FieldDescription>
            <FieldContent>
              <Input
                placeholder="Design login form"
                value={taskInput.taskName}
                onChange={(e) => handleInputChange("taskName", e.target.value, setTaskInput)}
                onBlur={() => setTouched((prev) => ({ ...prev, taskName: true }))}
                onInvalid={() => Boolean(touched.taskName && taskNameError)}
              />
              {touched.taskName && taskNameError && <FieldError>{taskNameError}</FieldError>}
            </FieldContent>
          </Field>

          <Field>
            <FieldTitle>Task content</FieldTitle>
            <FieldDescription>Describe acceptance criteria and key details.</FieldDescription>
            <FieldContent>
              <textarea
                className="min-h-28 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                placeholder="Implement validation and show error messages for invalid input."
                value={taskInput.taskContent}
                onChange={(e) => handleInputChange("taskContent", e.target.value, setTaskInput)}
                onBlur={() => setTouched((prev) => ({ ...prev, taskContent: true }))}
                aria-invalid={Boolean(touched.taskContent && taskContentError)}
              />
              {touched.taskContent && taskContentError && <FieldError>{taskContentError}</FieldError>}
            </FieldContent>
          </Field>
        </CardContent>
        <div className="space-x-3">
          <Button variant="outline" type="button" onClick={toggleCreateTaskPage}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSaveTask} disabled={disabled} >
            Save task
          </Button>
          </div>
      </Card>
    </Field>
	);
}