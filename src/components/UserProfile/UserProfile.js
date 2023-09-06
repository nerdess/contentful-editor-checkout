import { Stack, TextLink, Paragraph } from '@contentful/f36-components';
import { Avatar } from '@contentful/f36-avatar';
import tokens from '@contentful/f36-tokens';

const UserProfile = ({
	firstName = '',
	lastName = '',
	avatarUrl = '',
	email = '',
}) => {

	return (
		<Stack alignItems='center' flexDirection='row' spacing='spacingXs'>
			{avatarUrl && (
				<Avatar
					src='https://images.ctfassets.net/iq4lnigp6fgt/2EEEk92Kiz6KxREsjBLPAN/810d5a21650d91abad12e95da4cd3beb/2021-06_Everyone_is_Welcome_here_1_.png?fit=fill&f=top_left&w=100&h=100'
					variant='user'
				/>
			)}
			<Stack
				flexDirection='column'
				spacing='none'
				alignContent='start'
				alignItems='start'
			>
				{(firstName || lastName) && (
					<Paragraph 
						style={{
							fontSize: tokens.fontSizeS,
							margin: 0,
							maxWidth: 250
						}}
						isTruncated
					>
						{firstName} {lastName}
					</Paragraph>
				)}
				{email && (
					<TextLink
						href={`mailto:${email}`}
						target='_blank'
						rel='noopener noreferrer'
						style={{
							fontSize: tokens.fontSizeS,
							margin: 0,
							maxWidth: 250,
							textOverflow: 'ellipsis',
							overflow: 'hidden',
							display: 'inline-block'
						}}
					>
						{email}
					</TextLink>
				)}
			</Stack>
		</Stack>
	);
};

export default UserProfile;
