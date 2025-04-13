import { Info, X } from "lucide-react"

export default function NotificationAlert({ 
    show, 
    onClose, 
    title, 
    message, 
    icon = "ⓘ",
    variant = "warning" // can be warning, success, error, info
}) {
    if (!show) return null;

    const variants = {
        warning: {
            container: "bg-[#fff7e6] border-[#FFB222]",
            icon: "text-[#d48806]"
        },
        success: {
            container: "bg-green-50 border-green-200",
            icon: "text-green-600"
        },
        error: {
            container: "bg-red-50 border-red-200",
            icon: "text-red-600"
        },
        info: {
            container: "bg-blue-50 border-blue-200",
            icon: "text-blue-600"
        }
    }

    return (
        <section className="w-full">
            <div className={`mb-5 z-50 p-2 border  border-l-4 rounded-md flex justify-between items-center ${variants[variant].container}`}>
                <div className="flex items-center gap-2">
                    {/* <span className={variants[variant].icon}>{icon}</span> */}
                    <Info size={20} className={variants[variant].icon} />
                    <div>
                        {title && <div className="font-medium text-[14px]">{title}</div>}
                        {message && <div className="text-[14px]">{message}</div>}
                    </div>
                </div>
                {onClose && (
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
        </section>
    )
}