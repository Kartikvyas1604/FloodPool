import { z } from "zod";

export const validateEmail = z.string().email();
export const validateUrl = z.string().url();
export const validateStakeAmount = z
  .number()
  .positive()
  .max(1000000, "Stake cannot exceed 1,000,000 USDC");
