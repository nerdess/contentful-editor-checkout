import useAutoResizer from '../lib/hooks/useAutoResizer';
import EntryEditorStatus from '../components/EntryEditorStatus/EntryEditorStatus';
import useEntryEditorStatus from '../lib/hooks/useEntryEditorStatus';
import './sidebar.scss'

const Sidebar = () => {

  	useAutoResizer();

	const entryEditorStatus = useEntryEditorStatus({
		showModal: true
	});

	return (
		<EntryEditorStatus 
			showModal={true} 
			{...entryEditorStatus}
		/>
	)

};

export default Sidebar;
