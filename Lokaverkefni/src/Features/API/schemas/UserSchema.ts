import z from 'zod';

export const UserInputSchema = z
	.object({
		clerk_uid: z.string().nonempty('clerk_uid Required'),
		username: z.string().nonempty('username Required'),
		email: z.string().nonempty('email is required').includes('@', 'email must contain @'),
		shop_role: z.string(),
		firstName: z.string().min(1, 'firstName Required').optional(),
		firstname: z.string().min(1, 'firstname Required').optional(),
	})
	.refine((data) => Boolean(data.firstName ?? data.firstname), {
		message: 'firstName or firstname is required',
		path: ['firstName'],
	});

export const UserPostSchema = z.object({
	user: UserInputSchema,
});

export type UserInput = z.infer<typeof UserInputSchema>;
export type UserPostBody = z.infer<typeof UserPostSchema>;
