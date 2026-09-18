import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from './ui/button';
import { FormField } from './ui/form-field';
import { signInBodySchema } from '#/api/zod/signInSchema';
import type { SignInBody } from '#/api/types/SignIn';

interface SignInFormProps {
    onSubmit: (values: SignInBody) => void | Promise<void>;
}

export function SignInForm({ onSubmit }: SignInFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInBody>({
        resolver: zodResolver(signInBodySchema),
        defaultValues: { email: '', password: '' },
    });

    async function submit(values: SignInBody) {
        await onSubmit(values);
    }

    return (
        <form
            noValidate
            aria-label="Entrar na sua conta"
            aria-busy={isSubmitting}
            onSubmit={handleSubmit(submit)}
            className="grid gap-4.5"
        >
            <FormField
                label="E-mail"
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                autoCapitalize="none"
                spellCheck={false}
                required
                disabled={isSubmitting}
                error={errors.email?.message}
                {...register('email')}
            />
            <FormField
                label="Senha"
                type="password"
                autoComplete="current-password"
                placeholder="Sua senha"
                required
                disabled={isSubmitting}
                error={errors.password?.message}
                {...register('password')}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Entrando…' : 'Entrar'}
            </Button>
        </form>
    );
}
