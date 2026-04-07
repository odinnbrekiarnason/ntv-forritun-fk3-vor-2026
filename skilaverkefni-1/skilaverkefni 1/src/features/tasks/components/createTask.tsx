import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldTitle } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";

export function CreateTaskTemplate() {
	const onSubmit = () => {};
	const onCancel = () => {};
	const disabled = false;

	return (
    <Field>
      <Card className="w-full max-w-2xl border-border/70 bg-linear-to-br from-background via-background to-muted/40 shadow-lg shadow-black/5">
        <CardHeader>
          <CardTitle>Create task</CardTitle>
          <CardDescription>
            Fill in the fields below and connect this form to your createTask action.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Field>
            <FieldTitle>Task name</FieldTitle>
            <FieldDescription>Short title that clearly explains the work.</FieldDescription>
            <FieldContent>
              <Input placeholder="Design login form" />
            </FieldContent>
          </Field>

          <Field>
            <FieldTitle>Task content</FieldTitle>
            <FieldDescription>Describe acceptance criteria and key details.</FieldDescription>
            <FieldContent>
              <textarea
                className="min-h-28 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm leading-6 outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                placeholder="Implement validation and show error messages for invalid input."
              />
            </FieldContent>
          </Field>
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={onSubmit} disabled={disabled}>
            Save task
          </Button>
        </CardFooter>
      </Card>
    </Field>
	);
}