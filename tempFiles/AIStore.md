...initialStoreState,

    setProject: (projectId) => {
      set({ selectedProjectId: projectId });
    },

    setTask: (taskId) => {
      set({ selectedTaskId: taskId });
    },

    createProject: (input) => {
      const newProject: ProjectType = {
        id: nextId(get().projects),
        projectName: input.projectName.trim(),
        description: input.description?.trim() ?? "",
        taskIds: [],
        timeCreated: new Date(),
      };

      set((state) => ({
        projects: [...state.projects, newProject],
        selectedProjectId: newProject.id,
      }));

      return newProject;
    },

    updateProject: (projectId, updates) => {
      let updatedProject: ProjectType | undefined;

      set((state) => {
        const projects = state.projects.map((project) => {
          if (project.id !== projectId) {
            return project;
          }

          updatedProject = {
            ...project,
            ...updates,
            projectName: updates.projectName?.trim() ?? project.projectName,
            description: updates.description?.trim() ?? project.description,
          };

          return updatedProject;
        });

        return { projects };
      });

      return updatedProject;
    },

    deleteProject: (projectId) => {
      set((state) => {
        const projectToDelete = state.projects.find((project) => project.id === projectId);
        const projectTaskIds = new Set(projectToDelete?.taskIds ?? []);

        return {
          projects: state.projects.filter((project) => project.id !== projectId),
          tasks: state.tasks.filter((task) => !projectTaskIds.has(String(task.id))),
          selectedProjectId:
            state.selectedProjectId === projectId ? null : state.selectedProjectId,
          selectedTaskId:
            state.selectedTaskId !== null && projectTaskIds.has(String(state.selectedTaskId))
              ? null
              : state.selectedTaskId,
        };
      });
    },

    createTask: (projectId, input) => {
      const project = get().projects.find((item) => item.id === projectId);

      if (!project) {
        return undefined;
      }

      const newTask: TaskType = {
        id: nextId(get().tasks),
        name: input.name.trim(),
        content: input.content.trim(),
        isFinished: false,
        timeCreated: new Date(),
        timeFinished: null,
      };

      set((state) => ({
        tasks: [...state.tasks, newTask],
        selectedTaskId: newTask.id,
        projects: state.projects.map((item) => {
          if (item.id !== projectId) {
            return item;
          }

          return {
            ...item,
            taskIds: [...item.taskIds, String(newTask.id)],
          };
        }),
      }));

      return newTask;
    },

    updateTask: (taskId, updates) => {
      let updatedTask: TaskType | undefined;

      set((state) => {
        const tasks = state.tasks.map((task) => {
          if (task.id !== taskId) {
            return task;
          }

          updatedTask = {
            ...task,
            ...updates,
            name: updates.name?.trim() ?? task.name,
            content: updates.content?.trim() ?? task.content,
          };

          return updatedTask;
        });

        return { tasks };
      });

      return updatedTask;
    },

    toggleTask: (taskId) => {
      let toggledTask: TaskType | undefined;

      set((state) => {
        const tasks = state.tasks.map((task) => {
          if (task.id !== taskId) {
            return task;
          }

          const isFinished = !task.isFinished;
          toggledTask = {
            ...task,
            isFinished,
            timeFinished: isFinished ? new Date() : null,
          };

          return toggledTask;
        });

        return { tasks };
      });

      return toggledTask;
    },

    deleteTask: (taskId) => {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
        projects: state.projects.map((project) => ({
          ...project,
          taskIds: project.taskIds.filter((id) => id !== String(taskId)),
        })),
        selectedTaskId: state.selectedTaskId === taskId ? null : state.selectedTaskId,
      }));
    },

    setTheme: (theme) => {
      applyTheme(theme);
      set({ theme });
    },
  };