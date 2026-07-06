"use client";

import { useEffect, useState } from "react";
import {
  getProfile,
  uploadProfilePhoto,
} from "@/lib/actions/profile";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handlePhotoUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      await uploadProfilePhoto(file);

      alert("Profile photo updated successfully!");

      await loadProfile();

    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setUploading(false);
    }
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h2 className="text-white text-xl">Loading...</h2>
      </div>
    );
  }

  const photoUrl = profile.profile_photo
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/employee-profile/${profile.profile_photo}`
    : null;

  return (
    <div className="max-w-5xl mx-auto">

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-white mb-8">
          My Profile
        </h1>

        <div className="flex flex-col items-center">

          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-600"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-blue-600 flex items-center justify-center text-5xl font-bold text-white">
              {profile.full_name.charAt(0).toUpperCase()}
            </div>
          )}

          <label className="mt-5 cursor-pointer bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white">

            {uploading ? "Uploading..." : "Upload Photo"}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />

          </label>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div>
            <label className="text-slate-400 text-sm">
              Full Name
            </label>

            <input
              readOnly
              value={profile.full_name}
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />
          </div>

          <div>
            <label className="text-slate-400 text-sm">
              Email
            </label>

            <input
              readOnly
              value={profile.email}
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />
          </div>

          <div>
            <label className="text-slate-400 text-sm">
              Department
            </label>

            <input
              readOnly
              value={profile.department}
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />
          </div>

          <div>
            <label className="text-slate-400 text-sm">
              Designation
            </label>

            <input
              readOnly
              value={profile.designation}
              className="mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />
          </div>

        </div>

      </div>

    </div>
  );
}