import { Avatar, Card, CardContent } from "@mui/material";
import { BadgeCheck, Calendar, Mail, Phone, Shield, User } from "lucide-react";
import React from "react";

import { getPrettyDate } from "../constanst";
import { getMediaPath } from "../services/utils";

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <Icon className="mt-0.5 h-5 w-5 text-gray-500" />
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base text-gray-900">{value}</p>
    </div>
  </div>
);

const ProfileBox = ({ userData }) => {
  const {
    name,
    username,
    profilePicture,
    legalVerificationID,
    email,
    contactNumber,
    type,
    createdAt,
  } = userData;

  return (
    <Card className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      <CardContent className="mb-8">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Avatar
              src={getMediaPath(profilePicture)}
              alt={username}
              sx={{ width: 128, height: 128 }}
            />
            {legalVerificationID && (
              <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-1 shadow-md">
                <BadgeCheck className="h-6 w-6 text-blue-500" />
              </div>
            )}
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
          <p className="text-sm text-gray-500">@{username}</p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <InfoItem icon={User} label="Account Type" value={type?.toUpperCase()} />
          <InfoItem
            icon={Calendar}
            label="Member Since"
            value={getPrettyDate(createdAt)}
          />
          <InfoItem icon={Mail} label="Email" value={email} />
          <InfoItem
            icon={Phone}
            label="Contact"
            value={contactNumber || "Not provided"}
          />
          <InfoItem
            icon={Shield}
            label="Legal Verification ID"
            value={legalVerificationID || "Not provided"}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileBox;
