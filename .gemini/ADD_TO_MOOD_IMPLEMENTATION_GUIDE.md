# Add-to-Mood Button Implementation Guide

## Overview
This guide shows how to add the consistent `+` button to all song pages (Search, Recommended, Library).

## Changes Needed for Each Page

### 1. SearchPage.jsx
**Location**: `frontend/src/components/search/SearchPage.jsx`

**Steps**:
1. The import is already added: `import AddToMoodModal from "@/components/modals/AddToMoodModal";`
2. State variable is already updated: `const [selectedSongForMood, setSelectedSongForMood] = useState(null);`
3. Need to replace lines 136-188 (the song card image section) with the new design
4. Remove the old dropdown system (lines 166-186)
5. Add modal at the end before closing `</div>` (around line 223)

**New Song Card Structure** (replace lines 136-188):
```jsx
<div className="relative aspect-square rounded-[24px] overflow-hidden mb-4">
  <img src={track.thumbnail || track.image} alt={track.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
  
  {/* Overlay Background - Only on hover */}
  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
  
  {/* Play Button - Center, only on hover */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <button
      onClick={(e) => {
        e.stopPropagation();
        handlePlaySong(track);
      }}
      className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-500 shadow-2xl hover:scale-110 z-10"
    >
      <svg className="w-6 h-6 md:w-7 md:h-7 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  </div>
  
  {/* Add to Mood Button - Bottom Right, always visible */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      const artistName = track.artist?.name || track.artist || track.author?.name || track.channelTitle || "Unknown Artist";
      setSelectedSongForMood({
        ...track,
        artist: artistName,
        thumbnail: track.thumbnail || track.image
      });
    }}
    className="absolute bottom-2 right-2 w-6 h-6 md:w-7 md:h-7 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 z-20"
  >
    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
    </svg>
  </button>
</div>
```

**Add Modal** (before line 223 `</div>`):
```jsx
{/* Add to Mood Modal */}
{selectedSongForMood && (
  <AddToMoodModal
    song={selectedSongForMood}
    onClose={() => setSelectedSongForMood(null)}
  />
)}
```

**Remove**: Lines 53-54 (the old alert system)

---

### 2. RecommendedPage.jsx
**Location**: `frontend/src/components/recommended/RecommendedPage.jsx`

**Steps**:
1. Add import: `import AddToMoodModal from "@/components/modals/AddToMoodModal";`
2. Add state: `const [selectedSongForMood, setSelectedSongForMood] = useState(null);`
3. Find the song card image div (around line 90-110)
4. Replace with the same structure as SearchPage
5. Add modal before closing component

---

### 3. LibraryPage.jsx
**Location**: `frontend/src/components/library/LibraryPage.jsx`

**Steps**:
1. Add import: `import AddToMoodModal from "@/components/modals/AddToMoodModal";`
2. Add state: `const [selectedSongForMood, setSelectedSongForMood] = useState(null);`
3. Find mood space song cards
4. Add the `+` button to each song card
5. Add modal before closing component

---

## Key Points

1. **Consistent Design**: All pages should have the same button size and position
2. **Button Size**: `w-6 h-6 md:w-7 md:h-7` (24px mobile, 28px desktop)
3. **Icon Size**: `w-3 h-3 md:w-3.5 md:h-3.5`
4. **Position**: `absolute bottom-2 right-2`
5. **Always Visible**: No opacity transitions on the button itself
6. **Play Button**: Only shows on hover, centered
7. **Modal**: Use the centralized `AddToMoodModal` component

## Testing Checklist

- [ ] SearchPage: `+` button appears on all search results
- [ ] RecommendedPage: `+` button appears on all recommended songs
- [ ] LibraryPage: `+` button appears on mood space songs
- [ ] Modal opens when clicking `+`
- [ ] Modal shows all available mood spaces
- [ ] Songs can be added to moods successfully
- [ ] Success notification appears after adding
- [ ] Buttons are clickable and responsive
- [ ] Design is consistent across all pages
