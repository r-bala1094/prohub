import { hash, genSalt, compare } from 'bcryptjs';

/**
 *
 * @param password user entered password
 * @param salt manually saltRound
 * @returns
 */
export const generateHashedPassword = async (
  password: string,
  salt?: number | undefined | string
): Promise<
  | { salt: number | undefined | string | null; hashedPassword: string | null }
  | undefined
> => {
  try {
    if (!salt) {
      salt = await genSalt();
    }
    const hashedPassword = await hash(password, salt);

    return {
      salt: salt,
      hashedPassword: hashedPassword,
    };
  } catch (err) {
    return { salt: null, hashedPassword: null };
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await compare(password, hashedPassword);
  } catch (err) {
    return false;
  }
};
