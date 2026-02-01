# Fix Required: Replace Hardcoded Songs with API Data

## Issue
The hardcoded song arrays `RECOMMENDED_HINDI` and `RECOMMENDED_ENGLISH` were removed from the top of the file, but line 91 still references them, causing an error.

## Solution

### Step 1: Update line 367 in Dashboard component
Change:
```javascript
<HomePage 
  mousePosition={mousePosition} 
  handlePlay={(song) => dispatch(setCurrentSong(song))} 
  setActiveTab={setActiveTab}
/>
```

To:
```javascript
<HomePage 
  mousePosition={mousePosition} 
  handlePlay={(song) => dispatch(setCurrentSong(song))} 
  setActiveTab={setActiveTab}
  recommendedSongs={recommendedSongs}
  isLoadingRecommended={isLoadingRecommended}
/>
```

### Step 2: Update line 91 in HomePage component
Change:
```javascript
{[...RECOMMENDED_HINDI, ...RECOMMENDED_ENGLISH].map((song) => (
```

To:
```javascript
{(isLoadingRecommended 
  ? Array(6).fill({}).map((_, i) => ({ id: `loading-${i}`, videoId: `loading-${i}` }))
  : recommendedSongs.slice(0, 6)
).map((song) => (
```

### Step 3: Update line 93 key prop
Change:
```javascript
key={song.id}
```

To:
```javascript
key={song.videoId || song.id}
```

### Step 4: Add loading state check around line 96
Wrap the image and content in a conditional to show skeleton for loading:

```javascript
{isLoadingRecommended ? (
  <div className="aspect-square bg-white/5 rounded-[24px] animate-pulse" />
) : (
  <>
    <div className="relative aspect-square rounded-[18px] md:rounded-[24px] overflow-hidden mb-3 md:mb-4">
      <img src={song.thumbnail || song.image} alt={song.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
      {/* ... rest of the content ... */}
    </div>
    <div className="px-1 md:px-2 space-y-1">
      <h3 className="font-bold text-sm md:text-lg truncate group-hover:text-purple-400 transition-colors uppercase italic tracking-tighter">{song.title}</h3>
      <p className="text-[10px] md:text-sm text-gray-500 font-medium truncate uppercase">
        {song.artist?.name || song.artist || song.author?.name || song.channelTitle || "Unknown Artist"}
      </p>
    </div>
  </>
)}
```

### Step 5: Update all song.image references
Change all instances of:
```javascript
song.image
```

To:
```javascript
song.thumbnail || song.image
```

And for artist:
```javascript
song.artist
```

To:
```javascript
song.artist?.name || song.artist || song.author?.name || song.channelTitle || "Unknown Artist"
```

## Files Modified
- `frontend/src/app/dashboard/page.js` (lines 91-137, 367)

## Result
The Recommended Tracks section will now display real songs fetched from the YouTube API instead of hardcoded data.
