import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { createRouteMetadata } from '../../../lib/route-metadata';
import { toast } from 'sonner';
import { ResponseError } from '../../../api/.kubb/client';
import { useSignIn } from '../../../api/hooks/useSignIn';
import { SignInForm } from '../../../components/sign-in-form';
import { Accent, Heading, Text } from '../../../components/ui/typography';
import type { SignInValues } from '../../../schemas/sign-in';

export const Route = createFileRoute('/_auth/_sign-in/')({
    head: () =>
        createRouteMetadata({
            title: 'Entrar | AuthLab',
            description: 'Entre na sua conta AuthLab e acesse seu perfil e o mural de membros.',
        }),
    component: SignInPage,
});

function SignInPage() {
    const navigate = useNavigate();
    const { mutateAsync } = useSignIn();

    async function handleSignIn(values: SignInValues) {
        try {
            await mutateAsync({ body: values });
            toast.success('Bem-vindo de volta!');
            navigate({ to: '/app' });
        } catch (error) {
            if (error instanceof ResponseError && error.status === 401) {
                toast.error('E-mail ou senha inválidos.');
                return;
            }
            throw error;
        }
    }

    return (
        <section aria-labelledby="sign-in-heading" className="grid gap-6">
            <div className="grid gap-2">
                <Heading
                    as="h2"
                    id="sign-in-heading"
                    size="sm"
                    className="text-[28px] tracking-[-0.05em]"
                >
                    Bom te ver<Accent>.</Accent>
                </Heading>
                <Text size="sm" tone="muted" className="text-[13px]">
                    Entre com seu e-mail e senha.
                </Text>
            </div>
            <SignInForm onSubmit={handleSignIn} />
        </section>
    );
}
