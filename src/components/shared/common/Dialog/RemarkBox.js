import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
export function RemarkBox({
  title,
  description,
  onConfirm,
  onCancel,
  isOpen,
  setIsOpen,
  remark,
  setRemark,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Textarea placeholder="Enter your remark" value={remark} onChange={(e) => setRemark(e.target.value)} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Close
          </Button>
          <Button type="button" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
