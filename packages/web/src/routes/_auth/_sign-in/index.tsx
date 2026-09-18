import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { createRouteMetadata } from '../../../lib/route-metadata';
import { toast } from 'sonner';

import { useSignIn } from '../../../api/hooks/useSignIn';
import { SignInForm } from '../../../components/sign-in-form';
import { Accent, Heading, Text } from '../../../components/ui/typography';
import type { SignInBody } from '#/api/types/SignIn';

export const Route = createFileRoute('/_auth/_sign-in/')({
    head: () =>
        createRouteMetadata({
            title: 'Entrar | AuthLab',
            description:
                'Entre na sua conta AuthLab e acesse seu perfil e o mural de membros.',
        }),
    component: SignInPage,
});

function SignInPage() {
    const navigate = useNavigate();

    const { mutateAsync } = useSignIn({
        mutation: {
            onSuccess: () => navigate({ to: '/app' }),
            onError: (error) => toast.error(error.data.message),
        },
    });

    async function handleSignIn(values: SignInBody) {
        await mutateAsync({ body: values });
    }

    return (
        <section
            aria-labelledby="sign-in-heading"
            className="grid gap-6 animate-fade-in-up motion-reduce:animate-none"
        >
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
