import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { appstore } from "@/shared/appStore/appstore";
import { TaskCard } from "@/features/tasks/components/task";
import { InfoCard } from "../../../../shared/components/InfoCard";
import { EditProjectModal } from "../modals/editProject";
import { useState } from "react";
import { Separator } from "@/shared/components/ui/separator";

export function SelectedProjectPage() {
  const { deleteProject, toggleProjectComplete, toggleAllProjectsPage, toggleCreateTaskPage, selectedProjectId, projects, tasks } = appstore()

  const currentProject = projects.find((project) => project.id === selectedProjectId)

  const [edit, toggleEdit] = useState(false)

  if (!currentProject) {
    return null;
  }

  const onDelete = () => {
    const result = window.confirm('Are you sure you want to delete this project?')
    if(result) {
      deleteProject(currentProject.id)
    } 
  }

  return (
    //w-full rounded-lg border px-3 py-3 text-left transition border-primary bg-blue-200
    <Card className="mx-auto w-full border-border/70 bg-linear-to-br from-blue-500 to-muted/50 shadow-lg shadow-black/5 ">
      <CardHeader>
        <CardContent>
          <CardTitle>Project: {currentProject.projectName}</CardTitle>
            <CardDescription>
              {currentProject.description ? 'Description: ' + currentProject.description : "No description yet."}
            </CardDescription>
              <div className="space-x-4 justify-items-center">
                <Button type="button" className="bg-blue-800" onClick={() => toggleAllProjectsPage()}>Back To Projects</Button>
                <Button type="button" className="bg-blue-800" onClick={() => {toggleEdit(true)}}>Edit The Project</Button>
              </div>              
        </CardContent>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2">
          
          <InfoCard
            infoOnSquare="Task Count"
            bottomText={currentProject.taskIds.length}
            middleButton={true}
            textOnButton="Create New Task"
            onClick={toggleCreateTaskPage}
          />
          <InfoCard
            infoOnSquare="Status"
            bottomText={currentProject.isFinished ? 'Done' : 'Active'}
            middleButton={true}
            textOnButton="Toggle Activity"
            onClick={() => toggleProjectComplete(currentProject.id)}
          />
        </div>
        <div className="justify-center">
          <Button type="button" variant={'destructive'} onClick={() => {onDelete()}}>Delete Project?</Button>
        </div>
        <CardTitle className="">Tasks in this project</CardTitle>
        <Separator/>
        {currentProject.taskIds.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border/70 px-3 py-4 text-sm text-muted-foreground">
            <Button type="button" variant="ghost" onClick={toggleCreateTaskPage}>
              No tasks yet, click here to create your first task
            </Button>
          </p>
        ) : (
          <ul className="space-y-2">
            {tasks.filter((task) => currentProject.taskIds.includes(task.id)).map((task) => (
              <li key={task.id}>
                <TaskCard task={task} />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      {edit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs">
          <EditProjectModal onClose={() => toggleEdit(false)} />
        </div>)}
    </Card>
  )
}