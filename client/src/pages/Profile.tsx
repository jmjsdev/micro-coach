import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Award, Star } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Card, Badge, ProgressBar } from '../components/ui';

const Profile = () => {
  const user = useAuthStore((state) => state.user);

  const levelProgress = user?.totalPoints ? (user.totalPoints % 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
        <p className="text-gray-600 mt-1">Gérez vos informations personnelles</p>
      </motion.div>

      {/* Profile Card */}
      <Card>
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <Mail size={16} className="text-gray-400" />
              <span className="text-gray-600">{user?.email}</span>
            </div>
            <div className="flex items-center space-x-3 mt-4">
              <Badge variant={user?.isPremium ? 'warning' : 'gray'}>
                {user?.isPremium ? '👑 Premium' : '🆓 Gratuit'}
              </Badge>
              <Badge variant="primary">
                <Star size={14} className="mr-1" />
                Niveau {user?.level}
              </Badge>
              <Badge variant="success">
                <Award size={14} className="mr-1" />
                {user?.totalPoints} points
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Progression vers le niveau {(user?.level || 1) + 1}
          </h3>
          <ProgressBar
            value={levelProgress}
            max={100}
            showLabel={false}
          />
          <p className="text-sm text-gray-600 mt-2">
            {100 - levelProgress} points restants
          </p>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-1">
              {user?.level}
            </div>
            <div className="text-sm text-gray-600">Niveau actuel</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-1">
              {user?.totalPoints}
            </div>
            <div className="text-sm text-gray-600">Points totaux</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-1">
              {user?.isPremium ? '♾️' : '3'}
            </div>
            <div className="text-sm text-gray-600">Habitudes max</div>
          </div>
        </Card>
      </div>

      {/* Premium Card */}
      {!user?.isPremium && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-gradient-to-r from-primary-600 to-purple-600 text-white">
            <div className="text-center py-6">
              <h3 className="text-2xl font-bold mb-2">
                Passez à Premium 👑
              </h3>
              <p className="text-primary-100 mb-6">
                Débloquez toutes les fonctionnalités et créez des habitudes illimitées
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-2xl font-bold">4,99€</div>
                  <div className="text-sm text-primary-100">par mois</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-2xl font-bold">49,99€</div>
                  <div className="text-sm text-primary-100">par an</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Account Settings */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Paramètres du compte
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Notifications</p>
              <p className="text-sm text-gray-600">Recevoir des rappels pour vos habitudes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Rappels email</p>
              <p className="text-sm text-gray-600">Recevoir des emails de rappel</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
