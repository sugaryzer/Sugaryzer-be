import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { userSchema } from '../utils/zodSchemas';

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = userSchema.parse(req.body);
    const newUser = await prisma.user.create({ data: validatedData });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
};
