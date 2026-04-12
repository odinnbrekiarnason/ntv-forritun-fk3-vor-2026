import { InfoCard } from "@/shared/components/InfoCard";
import type { TaskType } from "@/features/tasks/schema/taskSchema";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { appstore } from "@/shared/appStore/appstore";
import { useState } from "react";
import { EditTaskModal } from "./modals/editTask";

type TaskCardProps = {
  task: TaskType;
};

export function TaskCard({ task }: TaskCardProps) {
  const { toggleTaskComplete, deleteTask, tasks } = appstore()
  const [edit, toggleEdit] = useState(false)
  
  const currentTask = tasks.find((i) => i.id === task.id)

  if (!currentTask) {
    return null;
  }

  const onDelete = () => {
    const result = window.confirm('Are you sure you want to delete this Task?')
    if(result) {
      deleteTask(currentTask.id)
    } 
  }

  const timeCreated = currentTask.timeCreated.toLocaleString()
  const timeFinished = currentTask.timeFinished ? currentTask.timeFinished.toLocaleString() : null

  return (
    <Card className="w-full border-border/70 bg-linear-to-br from-background to-muted/40 shadow-lg shadow-black/5 bg-blue-500">
      <CardHeader>
        <CardContent>
          <CardTitle>{task.taskName}</CardTitle>
          <CardDescription>{task.taskContent}</CardDescription>
          <Button type="button" className="bg-blue-700 text-white" onClick={() => { toggleEdit(true) }}>Edit Task</Button>
        </CardContent>
      </CardHeader>
      <CardContent className="grid gap-2 sm:grid-cols-2">
        <InfoCard
          infoOnSquare="Created"
          bottomText={timeCreated}
        />
        <InfoCard
          infoOnSquare="Time Finished"
          bottomText={timeFinished ?? 'Not Finished'}
        />
      </CardContent>
      <div className="justify-center space-y-4">
        <CardContent className="grid gap-2 sm:grid-cols-3">
          <div />
          <InfoCard
            infoOnSquare="Status"
            middleButton={true}
            textOnButton="Toggle Status"
            bottomText={task.isFinished ? "Done" : "Active"}
            onClick={() => toggleTaskComplete(currentTask.id)}
          />
        </CardContent>
        <Button type="button" variant='destructive' onClick={() => { onDelete() }}>Delete Task?</Button>
      </div>
      {edit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs">
          <EditTaskModal onClose={() => toggleEdit(false)} />
        </div>)}
    </Card>
  );
}
