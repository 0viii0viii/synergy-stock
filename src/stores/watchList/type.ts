type Stock = {
	name: string;
	code: string;
};

export type WatchListStore = {
	watchList: Stock[];
	setWatchList(watchList: Stock): void;
};
