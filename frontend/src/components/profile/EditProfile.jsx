import {
  Avatar,
  Button,
  Card,
  CardContent,
  Input,
  InputLabel,
} from "@mui/material";
import { Check, Pencil, X } from "lucide-react";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";

import useEditProfile from "../../hooks/user/useEditProfile";
import { getMediaPath } from "../../services/utils";

const FormField = ({ label, children, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    <InputLabel className="text-sm font-medium text-gray-500">{label}</InputLabel>
    {children}
  </div>
);

const EditProfile = ({ userData, onUpdate, setIsEditing }) => {
  const [formData, setFormData] = useState({
    username: userData.username || "",
    contactNumber: userData.contactNumber || "",
    name: userData.name || "",
    legalVerificationID: userData.legalVerificationID || "",
    profilePicture: null,
  });

  const [imagePreview, setImagePreview] = useState(
    getMediaPath(userData.profilePicture)
  );

  const disableVerIn = !!userData.legalVerificationID;
  const { loading, editProfile } = useEditProfile();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const retval = await editProfile(formData);
    if (retval) onUpdate(retval);
  };

  return (
    <Card className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <Avatar
                src={imagePreview}
                alt={userData.username}
                sx={{ width: 128, height: 128 }}
              />
              <label
                htmlFor="profile-upload"
                className="absolute -bottom-1 -right-1 cursor-pointer rounded-full bg-white p-2 shadow-md hover:bg-gray-50"
              >
                <Pencil className="h-4 w-4 text-gray-600" />
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-4">
            <FormField label="Your Name">
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full"
                minLength={5}
                placeholder="Full name"
              />
            </FormField>
            <FormField label="Username">
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full"
                minLength={5}
                placeholder="Username"
              />
            </FormField>
            <FormField label="Contact Number">
              <PhoneInput
                name="contactNumber"
                value={formData.contactNumber}
                onChange={(_, __, ___, formattedValue) =>
                  setFormData((prev) => ({ ...prev, contactNumber: formattedValue }))
                }
                containerClass="w-full"
                inputClass="w-full"
              />
            </FormField>
            <FormField label="Legal Verification ID">
              <Input
                name="legalVerificationID"
                value={formData.legalVerificationID}
                onChange={handleChange}
                disabled={disableVerIn}
                placeholder="Verification ID"
              />
            </FormField>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outlined"
              onClick={() => setIsEditing(false)}
              disabled={loading}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button type="submit" disabled={loading} variant="contained">
              <Check className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditProfile;
