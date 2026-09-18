import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

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
        },
    });

    async function handleSignOut() {
        await signOut().catch(() => {});
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            disabled={isSigningOut}
        >
            {isSigningOut ? 'Saindo…' : 'Sair'}
        </Button>
    );
}
