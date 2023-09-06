import { Spinner, Badge, Stack } from '@contentful/f36-components';
import tokens from '@contentful/f36-tokens';
import UserProfile from '../UserProfile/UserProfile';

const MIN_HEIGHT = '6.25rem';

const EntryEditor = ({
	locked = false,
	isPublished = false,
	editor = {},
	isLoading = false,
	isError = false,
}) => {

	if (isLoading) {
		return (
			<Stack style={{ minHeight: MIN_HEIGHT }}>
				<Spinner variant='default' />
			</Stack>
		);
	}

	if (isError) {
		return (
			<Stack style={{ minHeight: MIN_HEIGHT }}>
				<Badge className='badge-uppercase' variant='warning'>
					Editor konnte nicht ermittelt werden
				</Badge>
			</Stack>
		);
	}

	if (!!editor) {
		return (
			<Stack style={{
                minHeight: MIN_HEIGHT,
                overflow: 'hidden'
            }}>
				<Stack
					alignItems='start'
					flexDirection='column'
					spacing='spacingS'
					style={{
						background: locked ? tokens.red100 : tokens.green100,
						padding: tokens.spacingS,
						borderRadius: tokens.borderRadiusMedium,
					}}
				>
					<Badge
						className='badge-uppercase'
						variant={locked ? 'negative' : 'positive'}
					>
						{isPublished ? 'Last editor' : 'Current editor'}
					</Badge>
					<UserProfile {...editor} />
				</Stack>
			</Stack>
		);
	}

	return null;
};

export default EntryEditor;
