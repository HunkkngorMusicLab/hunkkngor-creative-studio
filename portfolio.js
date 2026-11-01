const COLLECTIONS = {
  "frame-by-frame": { title: "Frame by Frame", heading: "Video & Visual <em>Stories.</em>", intro: "A collection of edits, short-form videos, visual narratives and moving-image experiments." },
  "colour-in-thought": { title: "Colour in Thought", heading: "Digital Image <em>Work.</em>", intro: "A collection of digital artwork, image editing, visual compositions and creative concepts." },
  "words-that-move": { title: "Words That Move", heading: "Writing & <em>Sound.</em>", intro: "A collection of writing, scripts, ideas, music and sound-led creative work." }
};
const pageKey = document.body.dataset.collection;
const collection = COLLECTIONS[pageKey];
const grid = document.getElementById("media-grid");
document.title = `${collection.title} | Hunkkngor Creative Studio`;
document.getElementById("collection-heading").innerHTML = collection.heading;
document.getElementById("collection-intro").textContent = collection.intro;
function youtubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('/')[0];
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v');
      const parts = u.pathname.split('/');
      const i = parts.findIndex(x => ['embed','shorts','live'].includes(x));
      if (i >= 0) return parts[i+1];
    }
  } catch(e) {}
  return null;
}
function isImage(url) { return /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/i.test(url); }
function isVideo(url) { return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url); }
function makePreview(item) {
  const wrap = document.createElement('div'); wrap.className = 'media-preview';
  const id = youtubeId(item.url);
  if (id) {
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`;
    frame.title = item.title || 'YouTube video'; frame.loading = 'lazy';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'; frame.allowFullscreen = true;
    wrap.append(frame);
  } else if (isImage(item.url)) {
    const img = document.createElement('img'); img.src = item.url; img.alt = item.title || 'Portfolio image'; img.loading = 'lazy';
    img.onerror = () => { wrap.innerHTML = '<div class="preview-placeholder">Image preview unavailable. Open the original post below.</div>'; };
    wrap.append(img);
  } else if (isVideo(item.url)) {
    const video = document.createElement('video'); video.src = item.url; video.controls = true; video.preload = 'metadata'; wrap.append(video);
  } else {
    wrap.innerHTML = '<div class="preview-placeholder">This platform does not provide an automatic preview here.<br>Use the original post link below.</div>';
  }
  return wrap;
}
function render(items) {
  const visible = items.filter(x => x.category === pageKey && x.status === 'published');
  if (!visible.length) {
    grid.innerHTML = '<div class="empty-state"><strong>The collection is taking shape.</strong>Published projects will appear here as they are added to the Hunkkngor Media Library.</div>';
    return;
  }
  visible.forEach(item => {
    const card = document.createElement('article'); card.className = 'media-card';
    card.append(makePreview(item));
    const copy = document.createElement('div'); copy.className = 'media-copy';
    const tag = document.createElement('div'); tag.className = 'media-tag'; tag.textContent = item.type || 'Creative work'; copy.append(tag);
    const title = document.createElement('h2'); title.textContent = item.title || 'Untitled project'; copy.append(title);
    if (item.description) { const desc = document.createElement('p'); desc.textContent = item.description; copy.append(desc); }
    const link = document.createElement('a'); link.className = 'original-link'; link.href = item.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'View original post ↗'; copy.append(link);
    card.append(copy); grid.append(card);
  });
}
fetch('../media.json', {cache:'no-store'}).then(r => { if (!r.ok) throw new Error('catalogue unavailable'); return r.json(); }).then(data => render(Array.isArray(data.items) ? data.items : [])).catch(() => {
  grid.innerHTML = '<div class="empty-state"><strong>Portfolio catalogue unavailable.</strong>Please check back shortly. Original social posts will remain hosted on their platforms.</div>';
});
