'use server';
import { clerkClient } from '@clerk/nextjs/server';
import checkRole from '@/utils/helpers';
export async function setRole(formData: FormData) {

  if (!checkRole('admin')) {
    return { message: 'Not Authorized' };
  }

  try {
    const res = await (await clerkClient()).users.updateUser(formData.get('id') as string, {
      publicMetadata: { role: formData.get('role') },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}

export async function removeRole(formData: FormData) {
  try {
    const res = await (await clerkClient()).users.updateUser(formData.get('id') as string, {
      publicMetadata: { role: null },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}

