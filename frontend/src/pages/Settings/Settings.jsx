import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { changePassword } from "../../services/api";
import AnimatedPage from "../../components/common/AnimatedPage";

function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const savePassword = async () => {
    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      await changePassword({
        currentPassword,
        newPassword,
      });

      alert("Password changed successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to change password."
      );
    }
  };

  return (
    <DashboardLayout>
      <AnimatedPage>
        <h1 className="mb-8 text-4xl font-bold text-white">
          Settings
        </h1>

      <div className="rounded-3xl bg-slate-900 p-8">

        <h2 className="mb-6 text-2xl font-semibold text-white">
          Change Password
        </h2>

        <div className="space-y-4">

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            className="w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
          />

          <button
            onClick={savePassword}
            className="rounded-xl bg-indigo-600 px-8 py-3 text-white hover:bg-indigo-700"
          >
            Update Password
          </button>

        </div>

      </div>
      </AnimatedPage>
    </DashboardLayout>
  );
}

export default Settings;