import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { ResponseError } from '../../../api/.kubb/client';
import { useCreateAccount } from '../../../api/hooks/useCreateAccount';
import { CreateAccountForm } from '../../../components/create-account-form';
import { Accent, Heading, Text } from '../../../components/ui/typography';
import { createRouteMetadata } from '../../../lib/route-metadata';
import type { CreateAccountValues } from '../../../schemas/create-account';

export const Route = createFileRoute('/_auth/create-account/')({
    head: () =>
        createRouteMetadata({
            title: 'Criar conta | AuthLab',
            description:
                'Crie sua conta no AuthLab, receba as boas-vindas e escolha fazer parte do mural.',
        }),
    component: CreateAccountPage,
});

function CreateAccountPage() {
    const navigate = useNavigate();
    const { mutateAsync } = useCreateAccount();

    async function handleCreateAccount(values: CreateAccountValues) {
        try {
            await mutateAsync({ body: values });
            toast.success('Conta criada! Entre com seu e-mail e senha.');
            navigate({ to: '/' });
        } catch (error) {
            if (error instanceof ResponseError && error.status === 409) {
                toast.error('Este e-mail já está cadastrado. Tente entrar.');
                return;
            }
            throw error;
        }
    }

    return (
        <section aria-labelledby="create-account-heading" className="grid gap-6">
            <div className="grid gap-2">
                <Heading
                    as="h2"
                    id="create-account-heading"
                    size="sm"
                    className="text-[28px] tracking-[-0.05em]"
                >
                    Crie sua conta<Accent>.</Accent>
                </Heading>
                <Text size="sm" tone="muted" className="text-[13px]">
                    Leva menos de um minuto.
                </Text>
            </div>
            <CreateAccountForm onSubmit={handleCreateAccount} />
        </section>
    );
}
