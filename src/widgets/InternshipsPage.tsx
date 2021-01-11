import React from 'react';
import { Box } from '@material-ui/core';
import InternshipList from './InternshipList';
import SearchCompany from './Search/SearchCompany';
import SearchPosition from './Search/SearchPosition';

const InternshipPage = () => {
	return (
		<>
			<Box style={{ display: 'flex' }}>
				<SearchCompany />
				<div style={{ width: '20px'}}/>
				<SearchPosition />
			</Box>
			<InternshipList />
		</>
	);
};

export default InternshipPage;
