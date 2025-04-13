"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { closureDateService } from "@/services/closureDateService"
import { toast } from "sonner"
import { useState, useMemo } from "react"
import LoadingButton from "../shared/common/Button"

const formSchema = z.object({
    submission_date: z.date({
        required_error: "Submission end date is required",
    }),
    final_closure_date: z.date({
        required_error: "Final closure date is required",
    })
})

export default function AdminSettings() {
    const [loading, setLoading] = useState(false);
    
    // Calculate the next academic year (2025-2026)
    const nextAcademicYear = useMemo(() => {
        const now = new Date();
        const currentYear = now.getFullYear();
        // Use next academic year (currentYear+1 to currentYear+2)
        const startYear = currentYear;
        const endYear = startYear + 1;
        return `${startYear}-${endYear}`;
    }, []);
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    })

    async function onSubmit(values) {
        // Format dates to match API expectations
        const payload = {
            submission_date: format(values.submission_date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
            final_closure_date: format(values.final_closure_date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
        };
        
        try {
            setLoading(true);
            await closureDateService(payload);
            toast.success("Closure dates updated successfully");
            
            // Reset form fields
            form.reset();
        } catch (error) {
            toast.error(error.response.data.detail || "Failed to save closure dates!");
        } finally {
            setLoading(false);
            
        }
    }

    return (
        <>
            <div className="p-6 max-w-xl">
                <h1 className="text-2xl font-semibold mb-6">Settings</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormItem>
                            <FormLabel>Current Academic Year</FormLabel>
                            <FormControl>
                                <Input disabled value={nextAcademicYear} />
                            </FormControl>
                        </FormItem>

                        <FormField
                            control={form.control}
                            name="submission_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Submission End Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "MM/dd/yyyy")
                                                    ) : (
                                                        <span>MM/DD/YYYY</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                                className="[&_.selected]:text-white"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <p className="text-sm text-muted-foreground">
                                        New ideas creation will be disabled after this date.
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="final_closure_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Final Closure Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                    disabled={!form.watch("submission_date")}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "MM/dd/yyyy")
                                                    ) : (
                                                        <span>
                                                            {form.watch("submission_date") 
                                                                ? "MM/DD/YYYY"
                                                                : "Select Submission End Date first"}
                                                        </span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                                disabled={(date) => {
                                                    const submissionDate = form.watch("submission_date");
                                                    return date < submissionDate;
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <p className="text-sm text-muted-foreground">
                                        Likes & Comments will be disabled after this date.
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end pt-4">
                            <div className="w-[7vw]">
                                <LoadingButton label="Save Changes" type="submit" isLoading={loading} />
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    )
}