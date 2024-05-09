import { Check, Star } from "lucide-react"

interface UserFeedbackProps {
    rating: number,
    comment: string,
    name: string,
    image: string
}

const UserFeedback = ({rating, comment, name, image}: UserFeedbackProps) => {
  return (
    <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
        <div className="flex gap-0.5 mb-2">
            {Array(rating).fill(0).map((_, i) => (
                <Star key={i} className="h-5 w-5 text-green-500 fill-green-500" />
            ))}
        </div>
        <div className="text-lg leading-8">
            <p>{comment}</p>
        </div>
        <div className="flex gap-4 mt-2">
            <img src={image} alt="user" className="rounded-full h-12 w-12 object-cover"/>
            <div className="flex flex-col">
            <p className="font-semibold">{name}</p>
            <div className="flex gap-1.5 items-start text-zinc-600">
                <Check className="h-4 w-4 sroke-[3px] text-green-600"/>
                <p className="text-sm">Verified Purchase</p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default UserFeedback