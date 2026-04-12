import type { CreateProjectInput } from "@/features/projects/types/CreateProjectType";
import { appstore } from "@/shared/appStore/appstore";
import type { CreateTaskInput } from "../../types/createTaskType";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldError, FieldTitle } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { handleInputChange } from "@/shared/handlers/handleInputChange";
import { Button } from "@/shared/components/ui/button";

type EditTaskModalProps = {
  onClose: () => void;
};

export function EditTaskModal({ onClose }: EditTaskModalProps) {
  const { tasks, updateTask, selectedTaskId} = appstore();

  const currentTask = tasks.find((task) => task.id === selectedTaskId);

  const [taskInput, setTaskInput] = useState<CreateProjectInput & CreateTaskInput>({
    projectName: "",
    description: "",
    taskName: "",
    taskContent: "",
  });

  useEffect(() => {
    if (!currentTask) {
      return;
    }

    setTaskInput((prev) => ({
      ...prev,
      taskName: currentTask.taskName,
      taskContent: currentTask.taskContent,
    }));
  }, [currentTask]);

  const onSave = () => {
    updateTask(selectedTaskId, taskInput);
    onClose();
  };

  
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

  return (
    <Card className="relative mx-auto w-full max-w-2xl overflow-hidden border-border/70 bg-linear-to-br from-background via-background to-muted/40 shadow-lg shadow-black/5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-r from-primary/12 via-transparent to-primary/6" />

      <CardHeader className="relative border-b border-border/60 pb-5">
        <div className="space-y-1.5">
          <CardTitle className="text-lg">Editing Task...</CardTitle>
          <p className="text-sm text-muted-foreground">Adjust name and content.</p>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-5 pt-5">
        <Field>
          <FieldTitle>Change Task name</FieldTitle>
          <FieldContent>
            <Input
              autoFocus={true}
              placeholder="Task name"
              value={taskInput.taskName}
              onChange={(e) => handleInputChange("taskName", e.target.value, setTaskInput)}
              onBlur={() => setTouched((prev) => ({ ...prev, taskName: true }))}
              onInvalid={() => Boolean(touched.taskName && taskNameError)}
            />
            {touched.taskName && taskNameError && <FieldError>{taskNameError}</FieldError>}
          </FieldContent>
        </Field>

        <Field>
          <FieldTitle>Description</FieldTitle>
          <FieldDescription>Update the tasks details.</FieldDescription>
          <FieldContent>
            <textarea
              value={taskInput.taskContent}
              data-slot="textarea"
              className="min-h-28 w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              placeholder="Project description"
              onChange={(e) => handleInputChange("taskContent", e.target.value, setTaskInput)}
              onBlur={() => setTouched((prev) => ({ ...prev, taskContent: true }))}
              aria-invalid={Boolean(touched.taskContent && taskContentError)}
              />
              {touched.taskContent && taskContentError && <FieldError>{taskContentError}</FieldError>}
          </FieldContent>
        </Field>
      </CardContent>

      <CardFooter className="justify-end gap-2">
        <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
        <Button type="button" onClick={onSave} disabled={disabled}>Save changes</Button>
      </CardFooter>
    </Card>
  );
}