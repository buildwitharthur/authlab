import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from './ui/button';
import { profileQueryKey } from '../api/hooks/useProfile';
import { useSignOut } from '../api/hooks/useSignOut';

export function SignOutButton() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutateAsync: signOut, isPending: isSigningOut } = useSignOut({
        mutation: {
            onSuccess: () => {
                queryClient.removeQueries({ queryKey: profileQueryKey() });
                navigate({ to: '/', replace: true });
            },
            onError: (error) =>
                toast.error(error.message || 'Não foi possível sair. Tente novamente.'),
        },
    });

    async function handleSignOut() {
        await signOut().catch(() => {});
    }

    return (
        <Button variant="ghost" size="sm" onClick={handleSignOut} disabled={isSigningOut}>
            {isSigningOut ? 'Saindo…' : 'Sair'}
        </Button>
    );
}
