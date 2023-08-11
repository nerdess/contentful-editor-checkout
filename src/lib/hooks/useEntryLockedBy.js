import { useEffect, useState } from 'react';
import { useSDK } from '@contentful/react-apps-toolkit';
import useUser from './useUser';

const useEntryLockedBy = () => {

	const [lockedById, setLockedById] = useState(null);
	const sdk = useSDK();

	const {
		user: lockedBy,
		isLoading,
		isError
	  } = useUser(lockedById);

	useEffect(() => {
		sdk.entry.onSysChanged((sys) => {

			if ( sdk.user.sys.id !== sys.updatedBy.sys.id && sys.updatedAt !== sys.publishedAt) {
			  console.log('not me')
			  setLockedById(sys.updatedBy.sys.id);
			} else {
			  console.log('all good');
			  setLockedById(null);
			}
	
		  })
	}, [sdk]);

	return {
		lockedBy,
		isLoading,
		isError,
	};
};

export default useEntryLockedBy;
