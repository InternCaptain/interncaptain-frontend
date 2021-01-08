import React from 'react';
import { Button } from '@material-ui/core';

export interface CVFormSubmitProperties {
	onClick: () => void;
}

const CVFormSubmit: React.FC<CVFormSubmitProperties> = (properties) => {
	const { onClick } = properties;

	return (
		<Button onClick={onClick} color="primary" variant="contained">
			Submit
		</Button>
	);
};

export default CVFormSubmit;
