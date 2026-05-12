import Tasks from '@/feature/project/tasks';
import ProjectList from '@/feature/project/list/components/ProjectList';
import { Button } from '@/shared/components/ui/button';
import { useGlobalContext } from '@/shared/context';
import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const { activeProject, clearActiveProject } = useGlobalContext();
  //const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 p-6">
      <header className="flex flex-row justify-between items-center">
        {activeProject && (
          <Button
            variant="ghost"
            size="icon"
            className="w-fit p-2"
            onClick={() => clearActiveProject()}
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl font-semibold">
            Team Task Hub
          </h1>
        </div>
      </header>
      {activeProject ? <Tasks /> : <ProjectList />}
    </div>
  );
}
