export interface Connection<T> {
	edges?: Edge<T>[];
	nodes?: T[];
	pageInfo?: PageInfo;
	totalCount?: number;
}

export interface ConnectionParams<T> {
	after?: string;
	before?: string;
	first?: PaginationAmount;
	last?: PaginationAmount;
	order_by?: Sort<T>;
	where?: Filter;
}

export interface Edge<T> {
	cursor?: string;
	node?: T;
}

export interface PageInfo {
	endCursor: string;
	startCursor: string;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export interface PaginationAmount {}

export type Sort<T> = {
	[field in keyof T]?: SortOperationKind;
};

export enum SortOperationKind {
	ASC = 'ASC',
	DESC = 'DESC'
}

export type Filter = any;
