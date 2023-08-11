import React, { useState } from 'react';
import {
	Spinner,
	Badge,
	Stack,
} from '@contentful/f36-components';
import { useSDK } from '@contentful/react-apps-toolkit';
import UserProfile from '../components/UserProfile/UserProfile';
import useCMA from '../lib/hooks/useCMA';
import useAutoResizer from '../lib/hooks/useAutoResizer';
import tokens from '@contentful/f36-tokens';
import useEntryLockedBy from '../lib/hooks/useEntryLockedBy';
import './sidebar.scss'

const Sidebar = () => {

	//const sdk = useSDK();
  //const { isLoading: isLoadingCMA, space, environment } = useCMA();
  useAutoResizer();

	const {
		lockedBy,
		isLoading: isLoadingLockedBy,
		isError: isErrorLockedBy,
	} = useEntryLockedBy();


	if (/*isLoadingCMA ||*/ isLoadingLockedBy) {
		return <Spinner variant='default' />;
	}

  if (isErrorLockedBy) {
    return (
      <Badge 
        className="badge-uppercase"
        variant="warning" 
      >
        Bearbeitungsstatus konnte nicht ermittelt werden
      </Badge>
    )
  }


	return (
		<Stack style={{minHeight: 100}}>
			{!lockedBy && (
				<Badge className="badge-uppercase" variant="positive">
          Nein
				</Badge>
			)}

			{!!lockedBy && (
				<Stack
					alignItems='start'
					flexDirection='column'
					spacing='spacingS'
					style={{
						background: tokens.red100,
						padding: tokens.spacingS,
						borderRadius: tokens.borderRadiusMedium,
					}}
				>
					<Badge className="badge-uppercase" variant="negative">
						Ja, aktuell in Bearbeitung von
					</Badge>
					<UserProfile {...lockedBy} />
				</Stack>
			)}
		</Stack>
	);
};

export default Sidebar;
