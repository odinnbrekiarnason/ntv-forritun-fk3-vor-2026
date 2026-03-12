import { useState } from "react";
import type { TaskType } from "./types";


export function todoForm() {
  const curDate = new Date
  const time = curDate.getTime();
  const [complete, isComplete] = useState(false)

  const [task, setTask] = useState<TaskType>({
    task: '',
  timeAdded: time,
  timeCompleted: complete ? time : 0,
  dateStamp: curDate,
  dateCompleted: complete ? curDate : undefined,
  isComplete: complete
  });

  
}