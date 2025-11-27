import React from 'react';
import { CheckCircle, Users, Image as ImageIcon, UserPlus } from 'lucide-react';
import type { InstagramProfile } from '@/types/instagram';
import { formatNumber } from '@/lib/utils';

interface ProfileHeaderProps {
  profile: InstagramProfile;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 opacity-10" />

      <div className="card relative">
        <div className="flex flex-col items-center text-center">
          {/* Profile Picture with animated ring */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full animate-pulse blur-sm" />
            <div className="relative">
              <img
                src={profile.profilePicUrl || 'https://via.placeholder.com/150'}
                alt={profile.fullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl relative z-10"
              />
              {profile.isVerified && (
                <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-1.5 shadow-lg z-20 animate-bounce">
                  <CheckCircle className="text-white" size={20} />
                </div>
              )}
            </div>
          </div>

          {/* Name and username */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {profile.fullName || profile.username}
            </h1>
            <p className="text-xl text-gray-500">@{profile.username}</p>
          </div>

          {/* Stats Grid - Modern Card Style - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl mb-6">
            {/* Seguidores */}
            <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-purple-100">
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 bg-purple-500 rounded-lg opacity-10 group-hover:opacity-20 transition-opacity">
                <Users size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {formatNumber(profile.followers)}
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-600">Seguidores</div>
              <div className="mt-1 sm:mt-2 text-xs text-purple-600 font-semibold">
                {profile.followers.toLocaleString()}
              </div>
            </div>

            {/* Siguiendo */}
            <div className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-blue-100">
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 bg-blue-500 rounded-lg opacity-10 group-hover:opacity-20 transition-opacity">
                <UserPlus size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {formatNumber(profile.following)}
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-600">Siguiendo</div>
              <div className="mt-1 sm:mt-2 text-xs text-blue-600 font-semibold">
                {profile.following.toLocaleString()} personas
              </div>
            </div>

            {/* Posts */}
            <div className="group relative bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-orange-100">
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 bg-orange-500 rounded-lg opacity-10 group-hover:opacity-20 transition-opacity">
                <ImageIcon size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {formatNumber(profile.posts)}
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-600">Publicaciones</div>
              <div className="mt-1 sm:mt-2 text-xs text-orange-600 font-semibold">
                {profile.posts.toLocaleString()} posts
              </div>
            </div>
          </div>

          {/* Biography */}
          {profile.biography && (
            <div className="bg-gray-50 rounded-xl p-6 max-w-3xl border border-gray-200">
              <p className="text-gray-700 leading-relaxed">{profile.biography}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
