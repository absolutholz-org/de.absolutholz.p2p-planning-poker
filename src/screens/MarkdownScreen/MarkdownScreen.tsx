import { LegalView } from '../../components/Legal';
import { AppLayout } from '../../components/Shared/AppLayout';

interface MarkdownScreenProps {
	type: 'impressum' | 'privacy' | 'accessibility';
}

/**
 * A generalized screen for rendering markdown content within the app layout.
 */
export function MarkdownScreen({ type }: MarkdownScreenProps) {
	return (
		<AppLayout>
			<LegalView type={type} />
		</AppLayout>
	);
}
