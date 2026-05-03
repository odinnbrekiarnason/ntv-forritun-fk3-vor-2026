import { Button } from '@/shared/components/ui/button';
import { Dialog, DialogTrigger } from '@/shared/components/ui/dialog';

function AddProject() {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button type="button">Add project</Button>
    </DialogTrigger>
    </Dialog>
  );
}


export default AddProject;

