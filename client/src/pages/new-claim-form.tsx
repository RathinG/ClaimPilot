import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function NewClaimForm() {
  const [formData, setFormData] = useState({
    policyNumber: "",
    vin: "",
    claimantName: "",
    incidentDate: "",
    incidentTime: "",
    incidentDescription: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setPhotos([...photos, ...newPhotos]);
      console.log("Photos uploaded:", newPhotos.length);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
    console.log("Photo removed at index:", index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData, "Photos:", photos.length);
    toast({
      title: "Claim Submitted",
      description: "AI agents are now processing your claim...",
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">New Claim</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Submit a new insurance claim for AI analysis
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Claim Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="policyNumber">Policy Number *</Label>
                <Input
                  id="policyNumber"
                  name="policyNumber"
                  placeholder="POL-12345"
                  value={formData.policyNumber}
                  onChange={handleInputChange}
                  required
                  data-testid="input-policy-number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vin">VIN</Label>
                <Input
                  id="vin"
                  name="vin"
                  placeholder="1HGCM82633A123456"
                  value={formData.vin}
                  onChange={handleInputChange}
                  data-testid="input-vin"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="claimantName">Claimant Name *</Label>
              <Input
                id="claimantName"
                name="claimantName"
                placeholder="John Smith"
                value={formData.claimantName}
                onChange={handleInputChange}
                required
                data-testid="input-claimant-name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="incidentDate">Incident Date *</Label>
                <Input
                  id="incidentDate"
                  name="incidentDate"
                  type="date"
                  value={formData.incidentDate}
                  onChange={handleInputChange}
                  required
                  data-testid="input-incident-date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="incidentTime">Incident Time *</Label>
                <Input
                  id="incidentTime"
                  name="incidentTime"
                  type="time"
                  value={formData.incidentTime}
                  onChange={handleInputChange}
                  required
                  data-testid="input-incident-time"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="incidentDescription">Incident Description *</Label>
              <Textarea
                id="incidentDescription"
                name="incidentDescription"
                placeholder="Describe what happened during the incident..."
                rows={4}
                value={formData.incidentDescription}
                onChange={handleInputChange}
                required
                data-testid="input-incident-description"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Damage Photos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-md p-8 text-center hover-elevate">
              <input
                type="file"
                id="photo-upload"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                data-testid="input-photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Upload Photos</p>
                  <p className="text-xs text-muted-foreground">
                    Click to browse or drag and drop
                  </p>
                </div>
              </label>
            </div>

            {photos.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-md overflow-hidden border border-border bg-muted group"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-xs text-muted-foreground truncate px-2">
                        {photo.name}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 p-1 rounded-md bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      data-testid={`button-remove-photo-${index}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1" data-testid="button-submit-claim">
            Submit Claim for AI Analysis
          </Button>
          <Button type="button" variant="outline" data-testid="button-cancel">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
