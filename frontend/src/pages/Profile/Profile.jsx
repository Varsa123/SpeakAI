import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from "../../services/api";
import AnimatedPage from "../../components/common/AnimatedPage";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setProfile(data);
      setName(data.user.name);
      setAvatar(data.user.avatar || "");
    } catch (err) {
      console.log(err);
      alert("Failed to load profile.");
    }
  };
  const handleAvatarUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    setUploading(true);

    const res = await uploadAvatar(file);

    setAvatar(res.imageUrl);

  } catch (err) {
    console.log(err);
    alert("Image upload failed.");
  } finally {
    setUploading(false);
  }
};

  const saveProfile = async () => {
    try {
      setSaving(true);

      await updateProfile({
        name,
        avatar,
      });

      await loadProfile();

      setEditing(false);
    } catch (err) {
      console.log(err);
      alert("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) {
    return (
      <DashboardLayout>
        <AnimatedPage>
          <div className="flex h-[70vh] items-center justify-center">
            <h2 className="text-2xl text-white">Loading Profile...</h2>
          </div>
        </AnimatedPage>
      </DashboardLayout>
    );
  }

  const { user, stats } = profile;

  return (
    <DashboardLayout>
      <AnimatedPage>
      <h1 className="mb-8 text-4xl font-bold text-white">
        My Profile
      </h1>

      <div className="rounded-3xl bg-slate-900 p-8 shadow-xl">

        {/* Header */}

        <div className="flex flex-col gap-8 md:flex-row md:items-center">

          {/* Avatar */}

          <div className="flex flex-col items-center">

            <img
              src={
                avatar
                  ? avatar
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      name
                    )}&background=6366f1&color=fff&size=200`
              }
              alt="Profile"
              className="h-32 w-32 rounded-full border-4 border-indigo-500 object-cover"
            />

            {editing && (
  <div className="mt-4">

    <label className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">

      {uploading ? "Uploading..." : "Choose Photo"}

      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleAvatarUpload}
      />

    </label>

  </div>
)}
          </div>

          {/* Details */}

          <div className="flex-1">

            {editing ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg bg-slate-800 p-3 text-3xl font-bold text-white outline-none"
              />
            ) : (
              <h2 className="text-3xl font-bold text-white">
                {user.name}
              </h2>
            )}

            <p className="mt-3 text-lg text-slate-400">
              {user.email}
            </p>

            <p className="mt-2 text-slate-500">
              Member Since{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>

            <div className="mt-6 flex flex-wrap gap-4">

              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="rounded-xl bg-green-600 px-6 py-3 text-white transition hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>

                  <button
                    onClick={() => {
                      setEditing(false);
                      setName(user.name);
                      setAvatar(user.avatar || "");
                    }}
                    className="rounded-xl bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </>
              )}

            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <Card
            title="🎤 Sessions"
            value={stats.totalSessions}
          />

          <Card
            title="🔥 Streak"
            value={`${user.streak} Days`}
          />

          <Card
            title="⭐ XP"
            value={user.xp}
          />

          <Card
            title="🏆 Level"
            value={user.level}
          />

          <Card
            title="Grammar"
            value={`${stats.bestGrammar}%`}
          />

          <Card
            title="Average WPM"
            value={stats.averageWPM}
          />

          <Card
            title="Practice Time"
            value={`${Math.floor(
              stats.totalPracticeTime / 60
            )} min`}
          />

        </div>
        <div className="mt-12">

  <h2 className="mb-6 text-3xl font-bold text-white">
    🏅 Achievements
  </h2>

  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

    <Badge
      title="🥇 First Practice"
      unlocked={user.badges?.includes("🥇 First Practice")}
    />

    <Badge
      title="🔥 7-Day Streak"
      unlocked={user.badges?.includes("🔥 7-Day Streak")}
    />

    <Badge
      title="⭐ 100 XP"
      unlocked={user.badges?.includes("⭐ 100 XP")}
    />

    <Badge
      title="🎤 50 Sessions"
      unlocked={user.badges?.includes("🎤 50 Sessions")}
    />

    <Badge
      title="⏱ Consistent Speaker"
      unlocked={user.badges?.includes("⏱ Consistent Speaker")}
    />

    <Badge
      title="📚 Grammar Master"
      unlocked={user.badges?.includes("📚 Grammar Master")}
    />

    <Badge
      title="⚡ Fast Speaker"
      unlocked={user.badges?.includes("⚡ Fast Speaker")}
    />

    <Badge
      title="🚀 Level 5"
      unlocked={user.badges?.includes("🚀 Level 5")}
    />

    <Badge
      title="👑 SpeakAI Champion"
      unlocked={user.badges?.includes("👑 SpeakAI Champion")}
    />

  </div>

</div>
      </div>
      </AnimatedPage>
    </DashboardLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-2xl bg-slate-800 p-6 transition hover:scale-105">

      <h3 className="text-slate-400">
        {title}
      </h3>

      <p className="mt-3 text-3xl font-bold text-indigo-400">
        {value}
      </p>

    </div>
  );
}
function Badge({ title, unlocked }) {
  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 ${
        unlocked
          ? "border-yellow-400 bg-yellow-500/20 shadow-lg"
          : "border-slate-700 bg-slate-800 opacity-60"
      }`}
    >
      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      <p
        className={`mt-3 font-medium ${
          unlocked
            ? "text-yellow-300"
            : "text-slate-500"
        }`}
      >
        {unlocked ? "Unlocked 🎉" : "Locked 🔒"}
      </p>
    </div>
  );
}

export default Profile;