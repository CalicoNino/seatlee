"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Chrome, Github, Mail } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (provider: string) => void;
}

export function LoginModal({ open, onOpenChange, onLogin }: LoginModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            Sign in to Seatlee
          </DialogTitle>
          <DialogDescription>
            Choose your preferred sign-in method to sync your seating charts
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 cursor-pointer hover:bg-accent transition-colors bg-transparent"
            onClick={() => onLogin("google")}
          >
            <Chrome className="h-5 w-5" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 cursor-pointer hover:bg-accent transition-colors bg-transparent"
            onClick={() => onLogin("github")}
          >
            <Github className="h-5 w-5" />
            Continue with GitHub
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-3 cursor-pointer hover:bg-accent transition-colors bg-transparent"
            onClick={() => onLogin("email")}
          >
            <Mail className="h-5 w-5" />
            Continue with Email
          </Button>
        </div>
        <p className="text-xs text-center text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </DialogContent>
    </Dialog>
  );
}
