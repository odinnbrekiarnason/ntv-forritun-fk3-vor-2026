import bcrypt from 'bcrypt';
const envSalt = process.env.saltRounds;
const salt = parseInt(envSalt!);

if(!salt) {
  throw new Error("Missing salt rounds for bcrypt. Please set the saltRounds environment variable.");
}

export async function scrambler(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}