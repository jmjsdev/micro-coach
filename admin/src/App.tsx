import { Shield, Users, Target, Trophy, TrendingUp } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="text-primary-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">Micro Coach Admin</h1>
            </div>
            <div className="text-sm text-gray-600">
              Panel d'administration
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Utilisateurs</p>
                <p className="text-3xl font-bold text-gray-900">1,234</p>
              </div>
              <Users className="text-blue-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Habitudes</p>
                <p className="text-3xl font-bold text-gray-900">5,678</p>
              </div>
              <Target className="text-green-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Check-ins</p>
                <p className="text-3xl font-bold text-gray-900">45,123</p>
              </div>
              <TrendingUp className="text-purple-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Achievements</p>
                <p className="text-3xl font-bold text-gray-900">8,901</p>
              </div>
              <Trophy className="text-yellow-600" size={40} />
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Bienvenue sur le panel d'administration
          </h2>
          <p className="text-gray-600 mb-6">
            Ce panel d'administration vous permet de gérer et surveiller votre application Micro Coach.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Fonctionnalités disponibles</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Gestion des utilisateurs</li>
                <li>• Statistiques en temps réel</li>
                <li>• Modération du contenu</li>
                <li>• Gestion des abonnements Premium</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">À venir</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tableau de bord analytique</li>
                <li>• Export de données</li>
                <li>• Gestion des notifications</li>
                <li>• Rapports personnalisés</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> Cette interface d'administration est un MVP.
              Les fonctionnalités complètes seront ajoutées dans les prochaines versions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
