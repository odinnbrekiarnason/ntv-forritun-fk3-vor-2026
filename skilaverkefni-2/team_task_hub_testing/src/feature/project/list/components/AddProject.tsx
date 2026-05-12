import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogTrigger } from '@/shared/components/ui/dialog';

function AddProject({ onClick }: { onClick: () => void }) {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button onClick={onClick} type="button">Add project</Button>
    </DialogTrigger>
    </Dialog>
  );
}


export default AddProject;

