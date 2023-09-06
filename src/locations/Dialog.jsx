import { useEffect } from 'react';
import { useSDK } from '@contentful/react-apps-toolkit';
import { Modal, Text, Button, Stack } from '@contentful/f36-components';
import EntryEditorStatus from '../components/EntryEditorStatus/EntryEditorStatus';
import useUser from '../lib/hooks/useUser';
import useCMA from '../lib/hooks/useCMA';

/*interface InvocationParams {
  locked: boolean,
  lockedBy: object,
  isLoading: boolean,
  isError: boolean
}*/

const Dialog = () => {

	const sdk = useSDK();
	const { locked, entryId, editorId } = sdk.parameters.invocation;
  const { user: editor, isLoading, isError } = useUser(editorId);
  const {
    environment
  } = useCMA();

	useEffect(() => {

    if (!environment || !entryId) return;

    //todo: make this nicer with maybe a webhook or using iframe postMessage from the caller
    const poll = setInterval(() => {
      environment.getEntry(entryId).then((entry) => {
        if (entry.sys.publishedAt === entry.sys.updatedAt){
          clearInterval(poll);
          sdk.close();
        }
      });
    }, 5000);

    return () => {
      sdk.close();
      clearInterval(poll)
    };
		
	}, [entryId, environment, sdk]);

	return (
		<>
			<Modal.Header title='This entry has unpublished changes made by someone else' />
			<Modal.Content>
				<Stack flexDirection='column' spacing='spacingS' /*alignItems="start"*/>
					<EntryEditorStatus 
            locked={locked}
            editor={editor}
            isLoading={isLoading}
            isError={isError}
          />
					<Stack flexDirection='row' spacing='spacingS' /*alignItems="start"*/>
						<Text>Click the back-button of your browser or</Text>
						<Button variant='primary' onClick={() => sdk.close()}>
							edit anyway
						</Button>
					</Stack>
				</Stack>
			</Modal.Content>
			{/*<Modal.Controls>
        <TextLink
          icon={<ArrowBackwardIcon />}
          onClick={(e) => {
            window.history.back();
            e.preventDefault();
          }}
          alignIcon='start'
        >
          Zurück
        </TextLink>
        </Modal.Controls>*/}
		</>
	);
};

export default Dialog;
