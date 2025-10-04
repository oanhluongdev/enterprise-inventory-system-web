import { z } from "zod";
import { SignInSchema } from "./schema";

export type SignInInputType = z.infer<typeof SignInSchema>;
