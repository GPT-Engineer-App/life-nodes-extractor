import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const mockProcessDocument = async (file) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (file) {
        resolve({
          personalInformation: {
            fullName: "John Doe",
            dateOfBirth: "1990-01-01",
            placeOfBirth: "New York, USA",
            gender: "Male",
            ethnicity: "Caucasian",
            nationality: "American",
          },
          familyAndRelationships: {
            parents: ["Jane Doe", "Richard Doe"],
            siblings: ["Anna Doe"],
            spouse: "Jane Smith",
            children: ["Emily Doe"],
          },
        });
      } else {
        reject("Failed to process document");
      }
    }, 2000);
  });
};

const LifeNodes = () => {
  console.log("LifeNodes component is being rendered");
  const [file, setFile] = useState(null);
  console.log("Initial file state:", file);
  const { mutate, data, isLoading, isError } = useMutation(mockProcessDocument, {
    onSuccess: () => {
      toast("Document processed successfully");
    },
    onError: () => {
      toast.error("Failed to process document");
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("File selected:", selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      console.log("Uploading file:", file);
      mutate(file);
    } else {
      toast.error("Please select a file to upload");
    }
    console.log("Upload button clicked");
  };

  console.log("Current file state:", file);
  console.log("Current mutation data:", data);
  console.log("Loading state:", isLoading);
  console.log("Error state:", isError);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
        </CardHeader>
        <CardContent>
          <Input type="file" onChange={handleFileChange} className="mb-4" />
          <Button onClick={handleUpload} disabled={isLoading}>
            {isLoading ? "Processing..." : "Upload"}
          </Button>
        </CardContent>
      </Card>
      {isError && <p className="text-red-500 mt-4">Failed to process document</p>}
      {data && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Extracted Life Nodes</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            <ul>
              {Object.entries(data.personalInformation).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
                  {value}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Family and Relationships</h3>
            <ul>
              {Object.entries(data.familyAndRelationships).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
                  {Array.isArray(value) ? value.join(", ") : value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LifeNodes;