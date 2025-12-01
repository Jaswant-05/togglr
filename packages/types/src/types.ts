import { z } from "zod";

// User Types
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password should have minimum length of 8" })
    .max(32, "Password is too long")
    .regex(/^(?=.*[A-Z]).{8,}$/, {
      message:
        "Should Contain at least one uppercase letter and have a minimum length of 8 characters.",
    }),
  createdAt: z.date(),
  updatedAt: z.date(),
  companyId: z.string().uuid()
});

export const userSignInSchema = userSchema.pick({
  email: true,
  password: true
});

export const userSignUpSchema = userSchema.pick({
  email: true,
  password: true
});

export const userInviteSchema = userSchema.pick({
  email: true,
  companyId: true
})

export type User = z.infer<typeof userSchema>;
export type UserSignIn = z.infer<typeof userSignInSchema>;
export type UserSignUp = z.infer<typeof userSignUpSchema>;
export type UserInvite = z.infer<typeof userInviteSchema>;

export const featureFlagSchema = z.object({
  id: z.string().uuid(),
  key: z.string(),
  enabled: z.boolean(),
  projectId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const createFeatureFlagScheam = featureFlagSchema.pick({
  key: true,
  projectId: true
})

export type FeatureFlag = z.infer<typeof featureFlagSchema>;
export type CreateFeatureFlag = z.infer<typeof createFeatureFlagScheam>

// Company Types
export const companySchema = z.object({
  id: z.string().uuid(),
  name: z.string()
    .min(1, "must be atleast of length 1")
    .max(64, "Cannot be bigger than 64 characters"),
  verified: z.boolean(),
  ownerId: z.string().uuid(),
  // TODO :add user relations later when required 
})

export const createCompanySchema = companySchema.pick({
  name: true,
})

export type Company = z.infer<typeof companySchema>;
export type CreateCompany = z.infer<typeof createCompanySchema>;

// Project Types

export const projectSchema = z.object({
  id: z.string().uuid(),
  name: z.string()
    .min(1, "must be atleast of length 1")
    .max(64, "Cannot be bigger than 64 characters"),
  companyId: z.string().uuid(),
  featureFlags: z.array(featureFlagSchema),
  createdAt:  z.date(),
  updatedAt: z.date()
})

export const createProjectSchema = projectSchema.pick({
  name: true,
  companyId: true
})

export type Project = z.infer<typeof projectSchema>;
export type CreateProject = z.infer<typeof createProjectSchema> 

//