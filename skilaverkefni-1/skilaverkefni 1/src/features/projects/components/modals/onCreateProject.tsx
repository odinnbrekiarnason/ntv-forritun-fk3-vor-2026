import { appstore } from "@/shared/appStore/appstore"
import { useStore } from "zustand"


export const onCreateProject = () => {
  return appstore((state) => state.createProjectPage = true)
}