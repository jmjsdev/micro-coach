import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Mail, Lock, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { LoginSchema, type Login } from '@shared/types';
import { authApi } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { Button, Input, Card } from '../components/ui';

const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: Login) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(data);
      if (response.data.success && response.data.data) {
        setAuth(response.data.data.user, response.data.data.token);
        toast.success('Connexion réussie !');
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Sparkles className="text-primary-600" size={40} />
            <span className="text-3xl font-bold gradient-text">Micro Coach</span>
          </Link>
          <p className="mt-2 text-gray-600">Bon retour parmi nous !</p>
        </div>

        {/* Form */}
        <Card>
          <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="vous@exemple.com"
              icon={<Mail size={20} />}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              icon={<Lock size={20} />}
              error={errors.password?.message}
              {...register('password')}
            />

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
            >
              Se connecter
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-primary-600 font-semibold hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>

          {/* Demo Account */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900 font-medium mb-2">
              Compte de démonstration :
            </p>
            <p className="text-xs text-blue-700">
              Email: demo@microcoach.app<br />
              Mot de passe: password123
            </p>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
            ← Retour à l'accueil
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
