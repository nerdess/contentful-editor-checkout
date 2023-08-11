import { useEffect, useState } from 'react';
import { useSDK } from '@contentful/react-apps-toolkit';

const useUser = (id) => {

	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const sdk = useSDK();

	useEffect(() => {
		
        if (!id) {
            setUser(null);
            setIsLoading(false);
            return;
        };

        setIsLoading(true);

		sdk.space.getUsers().then(({items}) => {
            const user = items.filter((user) => user.sys.id === id);
            (user.length === 1) ? setUser(user[0]) : setIsError(true);
            setIsLoading(false);
		}).catch((error) => {
            setIsError(true);
            setIsLoading(false);
        });

		return () => {
			setIsLoading(false);
            setUser(null);
		};
	}, [sdk, id]);

	return {
		user,
		isLoading,
		isError,
	};
};

export default useUser;
