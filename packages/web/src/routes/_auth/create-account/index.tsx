import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { useCreateAccount } from '../../../api/hooks/useCreateAccount';
import { CreateAccountForm } from '../../../components/create-account-form';
import { Accent, Heading, Text } from '../../../components/ui/typography';
import type { CreateAccountBody } from '#/api/types/CreateAccount';

export const Route = createFileRoute('/_auth/create-account/')({
    head: () => ({ meta: [{ title: 'Criar conta | AuthLab' }] }),
    component: CreateAccountPage,
});

function CreateAccountPage() {
    const navigate = useNavigate();
    const { mutateAsync } = useCreateAccount({
        mutation: {
            onSuccess: () => {
                toast.success('Conta criada! Entre com seu e-mail e senha.');
                navigate({ to: '/' });
            },
        },
    });

    async function handleCreateAccount(values: CreateAccountBody) {
        await mutateAsync({ body: values });
    }

    return (
        <section
            aria-labelledby="create-account-heading"
            className="grid gap-6 animate-fade-in-up motion-reduce:animate-none"
        >
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
