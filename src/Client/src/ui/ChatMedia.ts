/**
 * ChatMedia — Detects YouTube/Giphy URLs in chat messages and renders embeds.
 */

export interface EmbeddedMedia {
  type: 'youtube' | 'giphy';
  url: string;
  videoId?: string;
  gifId?: string;
  thumbnailUrl?: string;
  embedUrl?: string;
}

// YouTube URL patterns
const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
];

// Giphy URL patterns
const GIPHY_PATTERNS = [
  /giphy\.com\/gifs\/([a-zA-Z0-9]+)/,
  /media\.giphy\.com\/media\/([a-zA-Z0-9]+)/,
  /i\.giphy\.com\/([a-zA-Z0-9]+)/,
];

export class ChatMedia {
  private youtubePlayerBase = 'https://apps.easierit.org/igrid/youtube-player/';

  /**
   * Parse a chat message and extract any embedded media.
   */
  parseMessage(text: string): { text: string; media: EmbeddedMedia[] } {
    const media: EmbeddedMedia[] = [];
    let cleanText = text;

    // Find YouTube links
    for (const pattern of YOUTUBE_PATTERNS) {
      const match = text.match(pattern);
      if (match) {
        const videoId = match[1];
        media.push({
          type: 'youtube',
          url: match[0],
          videoId,
          thumbnailUrl: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          embedUrl: `${this.youtubePlayerBase}?v=${videoId}`,
        });
        cleanText = cleanText.replace(match[0], '').trim();
      }
    }

    // Find Giphy links
    for (const pattern of GIPHY_PATTERNS) {
      const match = text.match(pattern);
      if (match) {
        const gifId = match[1];
        media.push({
          type: 'giphy',
          url: match[0],
          gifId,
          thumbnailUrl: `https://media.giphy.com/media/${gifId}/giphy.gif`,
          embedUrl: `https://media.giphy.com/media/${gifId}/giphy.gif`,
        });
        cleanText = cleanText.replace(match[0], '').trim();
      }
    }

    return { text: cleanText, media };
  }

  /**
   * Create DOM elements for embedded media.
   */
  createMediaElements(media: EmbeddedMedia[]): HTMLElement[] {
    const elements: HTMLElement[] = [];

    for (const item of media) {
      if (item.type === 'youtube' && item.videoId) {
        const container = document.createElement('div');
        container.style.cssText = `
          margin: 4px 0; border-radius: 6px; overflow: hidden;
          max-width: 320px; background: #000; position: relative;
          cursor: pointer;
        `;

        // Thumbnail with play button
        const thumb = document.createElement('img');
        thumb.src = item.thumbnailUrl || '';
        thumb.style.cssText = 'width: 100%; display: block;';
        thumb.onerror = () => {
          thumb.style.display = 'none';
          playBtn.style.display = 'flex';
        };
        container.appendChild(thumb);

        // Play button overlay
        const playBtn = document.createElement('div');
        playBtn.style.cssText = `
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 48px; height: 48px; background: rgba(0,0,0,0.7);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 20px; color: white;
        `;
        playBtn.textContent = '▶';
        container.appendChild(playBtn);

        // Click to open full player
        container.onclick = () => {
          const overlay = this.createFullscreenOverlay(item.embedUrl || `https://www.youtube.com/embed/${item.videoId}`);
          document.body.appendChild(overlay);
        };

        // Label
        const label = document.createElement('div');
        label.style.cssText = 'padding: 4px 8px; font-size: 10px; color: #888; background: rgba(0,0,0,0.5);';
        label.textContent = '▶ YouTube Video';
        container.appendChild(label);

        elements.push(container);
      }

      if (item.type === 'giphy' && item.embedUrl) {
        const container = document.createElement('div');
        container.style.cssText = `
          margin: 4px 0; border-radius: 6px; overflow: hidden;
          max-width: 320px; background: #000;
        `;

        const img = document.createElement('img');
        img.src = item.embedUrl;
        img.style.cssText = 'width: 100%; display: block; border-radius: 6px;';
        img.loading = 'lazy';
        img.onerror = () => {
          img.alt = 'GIF failed to load';
          img.style.padding = '20px';
          img.style.textAlign = 'center';
        };
        container.appendChild(img);

        // Label
        const label = document.createElement('div');
        label.style.cssText = 'padding: 4px 8px; font-size: 10px; color: #888; background: rgba(0,0,0,0.5);';
        label.textContent = '🎞️ GIPHY';
        container.appendChild(label);

        elements.push(container);
      }
    }

    return elements;
  }

  /**
   * Create a fullscreen overlay for video playback.
   */
  private createFullscreenOverlay(embedUrl: string): HTMLDivElement {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.9); z-index: 99999;
      display: flex; align-items: center; justify-content: center;
    `;

    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.style.cssText = 'width: 80%; height: 80%; border: none; border-radius: 8px;';
    iframe.allow = 'autoplay; encrypted-media; fullscreen';
    overlay.appendChild(iframe);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
      position: absolute; top: 20px; right: 20px;
      background: rgba(255,255,255,0.2); border: none; color: white;
      font-size: 24px; width: 40px; height: 40px; border-radius: 50%;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
    `;
    closeBtn.onclick = () => overlay.remove();
    overlay.appendChild(closeBtn);

    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.remove();
    };

    return overlay;
  }

  dispose(): void {
    // Nothing to clean up
  }
}
