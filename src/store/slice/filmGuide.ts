import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie, SortingNavLinks } from '../../types';

const initialState: {
  items: Movie[];
  lastViewedItems: Movie[];
  navItems: SortingNavLinks[],
} = {
  items: [],
  lastViewedItems: [],
  navItems: [
    { name: 'Popular', link: 'popular' },
    { name: 'Now Playing', link: 'now_playing'},
    { name: 'Top Rated', link: 'top_rated' },
    { name: 'Upcoming', link: 'upcoming' },
    { name: 'Last Viewed', link: 'last_viewed' }
  ]
};

const filmGuideSlice = createSlice({
  name: 'filmGuide',
  initialState,
  reducers: {
    changeItems(state, action: PayloadAction<Movie[]>) {
      state.items = action.payload
    },
    addItemsLastViewed(state, action: PayloadAction<Movie>) {
      const newItem = action.payload;
      const { lastViewedItems } = state;
      const existingIndex = lastViewedItems.findIndex(item => item.id === newItem.id);
      if (existingIndex === -1) {
        if (lastViewedItems.length < 20) {
          state.lastViewedItems.push(newItem);
        } else {
          state.lastViewedItems.shift();
          state.lastViewedItems.push(newItem);
        }
      } else {
        lastViewedItems.splice(existingIndex, 1);
        state.lastViewedItems = [...lastViewedItems, newItem];
      }
    }
    
  },
});

export const filmGuideReducer = filmGuideSlice.reducer;
export const { changeItems, addItemsLastViewed } = filmGuideSlice.actions;
