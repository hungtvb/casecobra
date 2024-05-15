'use client'
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useUploadThing } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import Dropzone, {FileRejection} from 'react-dropzone'

const Page = () => {
    const { toast } = useToast();
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<number>(65);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    
    const {startUpload, isUploading} = useUploadThing("imageUploader", {
      onClientUploadComplete: ([data]) => {
        const configId = data.serverData.configId;
        startTransition(() => {
          router.push(`/configure/design?id=${configId}`)
        })
      },
      onUploadProgress(p) {
        setUploadProgress(p);
      }
    });
    
    const onDropAccepted = (acceptedFile: File[]) => {
      startUpload(acceptedFile, {configId: undefined});
      setIsDragOver(false);
    }

    const onDropRejected = (rejectedFiles: FileRejection[]) => {
      const [files] = rejectedFiles;
      setIsDragOver(false);

      toast({
        title: `${files.file.type} type is not supported`,
        description: 'Please chose a PNG, JPG or JPEG image instead.',
        variant: 'destructive'
      })
    }

  return (
    <div className={cn("relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center", {
        "ring-blue-900/5 bg-blue-900/10": isDragOver
    })}>
        <div className="relative flex flex-1 flex-col items-center justify-center w-full">
          <Dropzone onDropAccepted={onDropAccepted} 
            onDropRejected={onDropRejected}
            maxFiles={1}
            accept={{
              "image/png": [".png"],
              "image/jpg": [".jpg"],
              "image/jpeg": [".jpeg"]
            }}
            onDragEnter={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}>
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps()} className="h-full w-full flex flex-1 flex-col items-center justify-center cursor-pointer">
                  <input type="hidden" {...getInputProps()}/>
                  {isDragOver ? 
                    <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2"/> : 
                    isUploading || isPending ? 
                      <Loader2 className="h-6 w-6 text-zinc-500 mb-2 animate-spin"/> : 
                      <Image className="h-6 w-6 text-zinc-500 mb-2"/>}
                  <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                    {isUploading ? 
                      <div className="flex flex-col items-center">
                        Uploading...
                        <Progress value={uploadProgress} className="h-2 w-40 mt-2 bg-gray-300" />
                      </div> : 
                      isPending ? 
                        <div className="flex flex-col items-center"><p>Redirecting, please wait!</p></div> : 
                        isDragOver ? 
                          <p><span className="font-semibold">Drop file {' '}</span>to upload</p> : 
                          <p><span className="font-semibold">Click to upoad{' '}</span>or drag and drop here</p>}
                  </div>
                  {isPending ? null : <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>}
                </div>
              )}
          </Dropzone>
        </div>
    </div>
  )
}

export default Page