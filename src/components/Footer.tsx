import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Footer = () => {
  return (
    <footer className="bg-white h-16 relative">
        <MaxWidthWrapper>
            <div className="border-t border-gray-200"></div>
            <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
                <div className="text-center md:text-left pb-2 md:pb-0">
                    <p className="text-sm text-muted-foreground">
                     &copy;{new Date().getFullYear()} All right reserved
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex space-x-8">
                        <Link className="text-sm text-muted-foreground hover:text-gray-800" href="#">Terms</Link>
                        <Link className="text-sm text-muted-foreground hover:text-gray-800" href="#">Contact us</Link>
                        <Link className="text-sm text-muted-foreground hover:text-gray-800" href="#">About us</Link>
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    </footer>
  )
}

export default Footer