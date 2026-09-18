import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { FormField } from './ui/form-field';
import type { CreateAccountBody } from '#/api/types/CreateAccount';
import { createAccountBodySchema } from '#/api/zod/createAccountSchema';

interface CreateAccountFormProps {
    onSubmit: (values: CreateAccountBody) => void | Promise<void>;
}

export function CreateAccountForm({ onSubmit }: CreateAccountFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateAccountBody>({
        resolver: zodResolver(createAccountBodySchema),
        defaultValues: { name: '', email: '', password: '', showOnWall: true },
    });

    async function submit(values: CreateAccountBody) {
        await onSubmit(values);
    }

    return (
        <form
            noValidate
            aria-label="Criar sua conta"
            aria-busy={isSubmitting}
            onSubmit={handleSubmit(submit)}
            className="grid gap-4.5"
        >
            <FormField
                label="Nome"
                type="text"
                autoComplete="name"
                placeholder="Arthur Reis"
                required
                disabled={isSubmitting}
                error={errors.name?.message}
                {...register('name')}
            />
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
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
                minLength={8}
                required
                disabled={isSubmitting}
                error={errors.password?.message}
                {...register('password')}
            />
            <Checkbox
                label="Quero aparecer no mural"
                description="Mostraremos apenas seu nome, iniciais e data de entrada."
                disabled={isSubmitting}
                {...register('showOnWall')}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Criando conta…' : 'Criar conta'}
            </Button>
        </form>
    );
}
