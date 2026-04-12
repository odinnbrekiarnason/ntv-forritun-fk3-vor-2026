import { useEffect, useState } from "react";
import { appstore } from "@/shared/appStore/appstore";
import { handleInputChange } from "@/shared/handlers/handleInputChange";
import type { CreateTaskInput } from "@/features/tasks/types/createTaskType";
import type { CreateProjectInput } from "../../types/CreateProjectType";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldTitle } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

type EditProjectModalProps = {
  onClose: () => void;
};

export function EditProjectModal({ onClose }: EditProjectModalProps) {
  const { selectedProjectId, projects, updateProject } = appstore();

  const currentProject = projects.find((project) => project.id === selectedProjectId);

  const [projectInput, setProjectInput] = useState<CreateProjectInput & CreateTaskInput>({
    projectName: "",
    description: "",
    taskName: "",
    taskContent: "",
  });

  useEffect(() => {
    if (!currentProject) {
      return;
    }

    setProjectInput((prev) => ({
      ...prev,
      projectName: currentProject.projectName,
      description: currentProject.description ?? "",
    }));
  }, [currentProject]);

  if (!currentProject) {
    return null;
  }

  const onSave = () => {
    updateProject(selectedProjectId, projectInput);
    onClose();
  };

  return (
    <Card className="relative mx-auto w-full max-w-2xl overflow-hidden border-border/70 bg-linear-to-br from-background via-background to-muted/40 shadow-lg shadow-black/5">
      <CardHeader className="border-b border-border/60 pb-5">
        <div className="space-y-1.5">
          <CardTitle className="text-lg">Editing Project...</CardTitle>
          <p className="text-sm text-muted-foreground">Adjust name and description, then connect save to updateProject.</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-5">
        <Field>
          <FieldTitle>Change Project name</FieldTitle>
          <FieldContent>
            <Input
              autoFocus={true}
              placeholder="Project name"
              value={projectInput.projectName}
              onChange={(e) => handleInputChange("projectName", e.target.value, setProjectInput)}
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldTitle>Description</FieldTitle>
          <FieldDescription>Update the project details.</FieldDescription>
          <FieldContent>
            <textarea
              value={projectInput.description}
              data-slot="textarea"
              className="min-h-28 w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              placeholder="Project description"
              onChange={(e) => handleInputChange("description", e.target.value, setProjectInput)}
            />
          </FieldContent>
        </Field>
      </CardContent>

      <div className="flex justify-end gap-2 px-6 pb-6">
        <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
        <Button className="bg-blue-800" type="button" onClick={onSave}>Save changes</Button>
      </div>
    </Card>
  );
}