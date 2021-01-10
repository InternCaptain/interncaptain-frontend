export function capitalizeFirstLetter(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

type Mapper<T, S> = (t: T) => S;

export const updateItemInList = <T, S>(id: Mapper<T, S>) => (list: T[]) => (newValue: T) => {
	return list.map((item) => {
		return id(item) === id(newValue) ? newValue : item;
	});
};
