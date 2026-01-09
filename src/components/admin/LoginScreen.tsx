import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/lib/api/client';
import ErrorFeedback from './ErrorFeedback';
import { AuthUser, login } from '@/lib/api/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { LoginForm, LoginSchema } from '@/lib/zodSchemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function LoginScreen() {
  const router = useRouter();
  const qc = useQueryClient();

  const [showPwd, setShowPwd] = useState(false);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: loginSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(LoginSchema) });

  const loginMutation = useMutation<AuthUser, ApiError, LoginForm>({
    mutationFn: (data: LoginForm) => login(data),
    onSuccess: async (user) => {
      toast.success(`Welcome ${user.name} !`);
      await qc.invalidateQueries({ queryKey: ['currentUser'] });
      router.push('/dashboard');
    },
    onError: (err) => {
      if (err.status === 401) return toast.error('Invalid credentials');
      toast.error(err.message || 'Login failed');
    },
  });
  return (
    <div className="md:bg-element/60 flex flex-col justify-center px-8 py-12 md:rounded-xl md:shadow-2xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-lg leading-9 font-extrabold tracking-tight uppercase">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form
          onSubmit={handleLoginSubmit((data) => loginMutation.mutate(data))}
          className="space-y-4"
          noValidate
        >
          {/* EMAIL INPUT */}
          <div>
            <label htmlFor="email" className="text-neutral block text-sm leading-6 font-medium">
              Email address
            </label>
            <div className="mt-1">
              <input
                {...registerLogin('email')}
                id="email"
                type="email"
                required
                autoComplete="email"
                aria-invalid={!!loginErrors.email}
                aria-describedby={loginErrors.email ? 'login-email-err' : undefined}
                className="border-neutral block w-full rounded-md border px-3 py-1.5 shadow-sm ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
            <ErrorFeedback errors={loginErrors.email} />
          </div>

          {/* PASSWORD INPUT */}
          <div>
            <label htmlFor="password" className="text-neutral block text-sm leading-6 font-medium">
              Password
            </label>
            <div className="relative mt-1">
              <input
                {...registerLogin('password')}
                id="password"
                type={showPwd ? 'text' : 'password'}
                minLength={8}
                required
                autoComplete="current-password"
                aria-invalid={!!loginErrors.password}
                aria-describedby={loginErrors.password ? 'login-pwd-err' : undefined}
                className="border-neutral block w-full rounded-md border py-1.5 pr-16 pl-3 shadow-sm ring-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="text-neutral absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded px-2 py-1 text-sm"
              >
                {showPwd ? <EyeSlash size={24} /> : <Eye size={24} />}
              </button>
            </div>
            <ErrorFeedback errors={loginErrors.password} />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loginSubmitting || loginMutation.isPending}
              aria-disabled={loginSubmitting || loginMutation.isPending}
              aria-busy={loginMutation.isPending}
              className="bg-accent hover:bg-accent/80 flex w-full cursor-pointer justify-center rounded-md px-3 py-1.5 text-sm leading-6 font-semibold text-white shadow-sm"
            >
              {loginMutation.isPending ? 'Loading...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
