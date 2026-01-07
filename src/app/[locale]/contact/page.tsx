'use client';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSendContactMessage } from '@/hooks/useContacts';
import ErrorFeedback from '@/components/admin/ErrorFeedback';
import { ContactMessageFormValues, contactMessageSchema } from '@/lib/validators/zodContact';

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  const sendMutation = useSendContactMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactMessageFormValues>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    },
    mode: 'onSubmit',
  });

  const disabled = isSubmitting || sendMutation.isPending;

  async function onSubmit(values: ContactMessageFormValues) {
    try {
      await sendMutation.mutateAsync(values);
      reset();
      toast.success(t('successToast'));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(t('errorToast'));
      console.error('Failed to send contact message:', message);
    }
  }

  return (
    <div className="from-background to-element min-h-page relative bg-gradient-to-b">
      <div className="relative lg:absolute lg:inset-0 lg:left-1/2">
        <Image
          alt=""
          src="/images/contact-plate.jpg"
          fill
          className="h-64 w-full object-cover sm:h-80 lg:absolute lg:h-full"
        />
      </div>

      <div className="py-8 md:pt-0 md:pb-0 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2">
        <div className="min-h-page flex flex-col justify-center px-6 lg:px-8">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <h1 className="text-3xl">{t('title')}</h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">{t('description')}</p>

            <form className="mt-8" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-foreground block text-sm leading-6 font-semibold"
                  >
                    {t('firstname')}
                  </label>
                  <div className="mt-1">
                    <input
                      id="firstName"
                      autoComplete="given-name"
                      className="text-foreground border-accent block w-full rounded-md border px-3.5 py-2 shadow-sm placeholder:text-gray-600 sm:text-sm sm:leading-6"
                      {...register('firstName')}
                      disabled={disabled}
                      aria-invalid={!!errors.firstName}
                    />
                    <ErrorFeedback errors={errors.firstName} />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="text-foreground block text-sm leading-6 font-semibold"
                  >
                    {t('lastname')}
                  </label>
                  <div className="mt-1">
                    <input
                      id="lastName"
                      autoComplete="family-name"
                      className="text-foreground border-accent block w-full rounded-md border px-3.5 py-2 shadow-sm placeholder:text-gray-600 sm:text-sm sm:leading-6"
                      {...register('lastName')}
                      disabled={disabled}
                      aria-invalid={!!errors.lastName}
                    />
                    <ErrorFeedback errors={errors.lastName} />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-foreground block text-sm leading-6 font-semibold"
                  >
                    {t('email')}
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="text-foreground border-accent block w-full rounded-md border px-3.5 py-2 shadow-sm placeholder:text-gray-600 sm:text-sm sm:leading-6"
                      {...register('email')}
                      disabled={disabled}
                      aria-invalid={!!errors.email}
                    />
                    <ErrorFeedback errors={errors.email} />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="text-foreground block text-sm leading-6 font-semibold"
                  >
                    {t('subject')}
                  </label>
                  <div className="mt-1">
                    <input
                      id="subject"
                      type="text"
                      className="text-foreground border-accent block w-full rounded-md border px-3.5 py-2 shadow-sm placeholder:text-gray-600 sm:text-sm sm:leading-6"
                      {...register('subject')}
                      disabled={disabled}
                      aria-invalid={!!errors.subject}
                    />
                    <ErrorFeedback errors={errors.subject} />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <div className="flex justify-between text-sm leading-6">
                    <label
                      htmlFor="message"
                      className="text-foreground block text-sm leading-6 font-semibold"
                    >
                      {t('message')}
                    </label>
                    <p id="message-description" className="text-foreground/80">
                      {t('max')}
                    </p>
                  </div>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      rows={4}
                      aria-describedby="message-description"
                      className="text-foreground border-accent block w-full rounded-md border px-3.5 py-2 shadow-sm placeholder:text-gray-600 sm:text-sm sm:leading-6"
                      {...register('message')}
                      disabled={disabled}
                      aria-invalid={!!errors.message}
                    />
                    <ErrorFeedback errors={errors.message} />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={disabled}
                  className="from-accent to-drk-accent hover:from-drk-accent hover:to-accent rounded-full bg-gradient-to-br px-4 py-2 text-center text-sm font-semibold text-white duration-150 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sendMutation.isPending ? `${t('send')}...` : t('send')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
