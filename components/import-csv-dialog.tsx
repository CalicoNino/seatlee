"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, FileText } from "lucide-react";

interface ImportCSVDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (file: File, source: "theknot" | "custom") => void;
}

export function ImportCSVDialog({
  open,
  onOpenChange,
  onImport,
}: ImportCSVDialogProps) {
  const [source, setSource] = useState<"theknot" | "custom">("custom");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      onImport(selectedFile, source);
      setSelectedFile(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">
            Import Guest List
          </DialogTitle>
          <DialogDescription>
            Upload a CSV file with your guest information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-base font-medium">Import Source</Label>
            <RadioGroup
              value={source}
              onValueChange={(v) => setSource(v as "theknot" | "custom")}
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem value="theknot" id="theknot" />
                <Label htmlFor="theknot" className="cursor-pointer font-normal">
                  The Knot
                </Label>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom" className="cursor-pointer font-normal">
                  Custom CSV
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">CSV Format</Label>
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
              {source === "theknot" ? (
                <div className="space-y-2">
                  <p className="font-medium text-foreground">
                    The Knot format:
                  </p>
                  <code className="block rounded bg-background p-2 text-xs">
                    First Name, Last Name, Email, Party Size
                    <br />
                    John, Doe, john@example.com, 2
                  </code>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="font-medium text-foreground">Custom format:</p>
                  <code className="block rounded bg-background p-2 text-xs">
                    Name
                    <br />
                    John Doe
                    <br />
                    Jane Smith
                  </code>
                  <p className="text-xs text-muted-foreground">
                    Simple list with one name per line
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="file-upload" className="text-base font-medium">
              Select File
            </Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="cursor-pointer bg-transparent"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </Button>
              {selectedFile && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  {selectedFile.name}
                </div>
              )}
            </div>
            <input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={!selectedFile}
            className="cursor-pointer"
          >
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
