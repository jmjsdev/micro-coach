import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Target, TrendingUp, Award, Users, Sparkles, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: 'Suivi Intelligent',
      description: 'Suivez vos habitudes quotidiennes avec des statistiques détaillées et visuelles'
    },
    {
      icon: TrendingUp,
      title: 'Progression Claire',
      description: 'Visualisez vos progrès avec des graphiques et calendriers interactifs'
    },
    {
      icon: Award,
      title: 'Récompenses',
      description: 'Débloquez des badges et montez de niveau en restant constant'
    },
    {
      icon: Users,
      title: 'Social',
      description: 'Partagez vos succès et motivez-vous avec vos amis (Premium)'
    },
  ];

  const benefits = [
    'Créez jusqu\'à 3 habitudes gratuitement',
    'Calendrier visuel style GitHub',
    'Statistiques et graphiques détaillés',
    'Système de points et niveaux',
    'Badges et achievements',
    'Interface moderne et intuitive',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Sparkles className="text-primary-600" size={32} />
            <span className="text-2xl font-bold gradient-text">Micro Coach</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Connexion
            </Button>
            <Button onClick={() => navigate('/register')}>
              Commencer
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Transformez vos{' '}
            <span className="gradient-text">habitudes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            L'application de micro-coaching qui vous aide à construire et maintenir
            de meilleures habitudes, jour après jour.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" onClick={() => navigate('/register')}>
              Commencer gratuitement
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
              Se connecter
            </Button>
          </div>
        </motion.div>

        {/* Hero Image/Demo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 glass rounded-2xl p-8 max-w-5xl mx-auto shadow-2xl"
        >
          <div className="aspect-video bg-gradient-to-br from-primary-100 to-purple-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Target className="text-primary-600 mx-auto mb-4" size={64} />
              <p className="text-gray-600">Interface moderne et intuitive</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-gray-600">
            Des fonctionnalités puissantes pour vous aider à réussir
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6 card-hover"
            >
              <feature.icon className="text-primary-600 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="container mx-auto px-4 py-20">
        <div className="glass rounded-2xl p-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold mb-4">
              Pourquoi Micro Coach ?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Check className="text-white" size={16} />
                </div>
                <span className="text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">
            Prêt à transformer vos habitudes ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers d'utilisateurs qui changent leur vie
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate('/register')}
          >
            Commencer maintenant - C'est gratuit !
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p>&copy; 2024 Micro Coach. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
