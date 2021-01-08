import React from 'react';

export const getCompanyName = (companyId, companies) => {
	return companies.find((company) => company.id === companyId);
};
