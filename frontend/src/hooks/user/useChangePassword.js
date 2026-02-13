import { useState } from "react";
import { toast } from "react-toastify";

import { passwordPattern } from "../../constanst";
import api from "../../services/api";
import { getResponseMsg } from "../../services/utils";

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const changePassword = async (passwords) => {
    const { currentPassword, newPassword } = passwords;

    if (!currentPassword) {
      toast.warn("Enter current password");
      return false;
    }
    if (!newPassword) {
      toast.warn("Enter new password");
      return false;
    }
    if (!passwordPattern.test(newPassword)) {
      toast.warn(
        "New password: 8+ chars, number and special character required"
      );
      return false;
    }

    setLoading(true);
    try {
      await api.put("/user/profile/password", passwords);
      toast.success("Password updated successfully");
      return true;
    } catch (error) {
      toast.error(getResponseMsg(error) || "Failed to update password");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, changePassword };
};

export default useChangePassword;
