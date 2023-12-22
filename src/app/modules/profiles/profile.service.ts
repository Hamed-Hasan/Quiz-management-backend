// src/profile/profile.service.ts

import prisma from '../../../shared/prisma';
import { IProfile } from './profile.interface';

const getProfiles = async (): Promise<IProfile[] | null> => {
  const profiles = await prisma.profile.findMany({
    include: {
      user: true,
    },
  });
  return profiles || null;
};

const getProfile = async (userId: string): Promise<IProfile | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { profile: true },
  });
  return user?.profile || null;
};

const updateProfile = async (userId: string, payload: Partial<IProfile>) => {
  // Check for profile existence
  let existingProfile = await prisma.profile.findUnique({
    where: { userId },
  });

  // If profile doesn't exist, create a new one
  if (!existingProfile) {
    existingProfile = await prisma.profile.create({
      data: {
        userId,
        ...payload,
      },
    });
  } else {
    // Update the existing profile
    existingProfile = await prisma.profile.update({
      where: { userId },
      data: payload,
    });
  }

  return existingProfile;
};



const deleteProfile = async (userId: string): Promise<IProfile> => {
  return await prisma.profile.delete({
    where: { userId },
  });
};

export const ProfileService = {
  getProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
};
