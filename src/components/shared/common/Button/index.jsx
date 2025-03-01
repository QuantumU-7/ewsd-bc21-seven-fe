import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

const LoadingButton = ({ label, isLoading }) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full my-2 bg-button-primary text-white"
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : label}
    </Button>
  );
};

export default LoadingButton;
