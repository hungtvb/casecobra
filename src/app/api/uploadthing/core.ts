import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import {z} from 'zod'
import sharp from 'sharp'
import { db } from "@/db";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1} })
    .input(z.object({configId: z.string().optional()}))
    .middleware(async ({ input }) => {
        const {getUser} = getKindeServerSession();
        const user = await getUser();

        if (!user || !user.id) throw new UploadThingError("Unauthorized");
        return { userId: user.id, configId: input.configId};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const configId = metadata.configId;
      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();

      const imageMetadata = await sharp(buffer).metadata();

      if(!configId) {
        const configuration = await db.configuration.create({
            data: {
                width: imageMetadata.width || 500,
                height: imageMetadata.height || 500,
                imageUrl: file.url
            }
        })

        return {configId: configuration.id}
      } else {
        const updatedConfiguration = await db.configuration.update({
            where: {
                id: configId
            },
            data: {
                croppedImageUrl: file.url
            }
        })

        return {configId: updatedConfiguration.id} 
      }
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;