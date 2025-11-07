import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { InstagramProfile } from '@/types/instagram';

interface ProfileHeaderProps {
  profile: InstagramProfile;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <div className="card flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="relative">
        <img
          src={profile.profilePicUrl || 'https://via.placeholder.com/150'}
          alt={profile.fullName}
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />
        {profile.isVerified && (
          <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
            <CheckCircle className="text-white" size={24} />
          </div>
        )}
      </div>

      <div className="flex-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
          <h1 className="text-3xl font-bold">{profile.fullName || profile.username}</h1>
        </div>
        <p className="text-xl text-gray-600 mb-4">@{profile.username}</p>

        <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {profile.followers.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Seguidores</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {profile.following.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Siguiendo</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {profile.posts.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Publicaciones</div>
          </div>
        </div>

        {profile.biography && (
          <p className="text-gray-700 max-w-2xl">{profile.biography}</p>
        )}
      </div>
    </div>
  );
};
