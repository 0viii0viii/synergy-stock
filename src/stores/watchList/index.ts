import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { WatchListStore } from '@/stores/watchList/type.ts';

export const useWatchListStore = create(
	persist<WatchListStore>(
		(set, get) => ({
			watchList: [],
			setWatchList: (watchList) => {
				if (get().watchList.some((stock) => stock.code === watchList.code)) return alert('이미 추가된 종목입니다.');
				set((state) => ({ ...state, watchList: [...state.watchList, watchList] }));
			},
		}),
		{
			name: 'watchList',
		}
	)
);
