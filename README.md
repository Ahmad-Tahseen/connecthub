# ConnectHub — Multi-Page Social Media UI

A multi-page, fully responsive social-media frontend — built with vanilla HTML, CSS, and JavaScript (no frameworks). What started as a single-page UI-cloning exercise was extended into a 3-page application with real navigation, live interactivity, dark mode, and practical iframe embeds.

> Personal frontend project — originally inspired by mainstream social-platform UI patterns, then rebuilt and extended with original branding, additional pages, and new features.

## Pages

| Page | Description |
|---|---|
| `index.html` | News feed — stories, post creation, posts feed, events & active-chats sidebar |
| `profile.html` | User profile — cover photo, tabbed sections (Posts / About / Friends / Photos), embedded location map |
| `messages.html` | Messenger-style chat — conversation list + live message thread |

## Features

- **Dark mode** — toggle persists across visits via `localStorage`
- **Create & publish posts** in real time, on top of the feed
- **Live people search** in the navbar with instant filtered dropdown results
- **Post interactions** — like toggle, comment & share affordances
- **Load more posts** — dynamically injects additional feed content
- **Notifications dropdown** with unread badge
- **Full profile page** with tabbed navigation (Posts, About, Friends, Photos)
- **Working chat interface** — switch between conversations, send new messages, auto-updating conversation previews
- **Embedded Google Map** (iframe) on the profile's About tab — showing a real practical use of `<iframe>` for embedding external content (not for page navigation)
- **Embedded YouTube video** (iframe) inside a feed post — same principle: iframes for embedding external media, not for routing between pages
- **Fully responsive** — adapts from a 3-column desktop layout down to a single-column mobile view
- **Icon system** built entirely on [Font Awesome](https://fontawesome.com/) — no raster icon images, fully scalable and theme-aware

## Tech Stack

- **HTML5** — semantic, multi-page structure
- **CSS3** — custom design system using CSS variables (instant dark-mode theming), Flexbox, CSS Grid, responsive breakpoints
- **Vanilla JavaScript** — DOM rendering, event delegation, `localStorage` persistence, live search filtering, dynamic content injection
- **Font Awesome 6** (via CDN) — icon system
- **Embedded iframes** — YouTube + Google Maps, used correctly for embedding external content inside a page

## Project Structure

```
connecthub/
├── index.html        → news feed page
├── profile.html      → profile page (tabs, map embed)
├── messages.html     → chat / messages page
├── style.css         → full design system + responsive rules
├── script.js         → all interactivity (shared across pages, feature-guarded)
├── images/           → photos, story backgrounds, avatars
└── README.md
```

## Run it locally

No build step needed — pure HTML/CSS/JS.

```bash
git clone https://github.com/Ahmad-Tahseen/connecthub.git
cd connecthub
# open index.html in your browser, or:
npx serve .
```

## What I practiced building this

- Structuring a **multi-page** site with shared navigation and consistent theming across pages
- Implementing **persisted UI state** (dark mode) with `localStorage`
- Building **real-time search filtering** and **dynamic DOM injection** without a framework
- Designing **responsive layouts** that gracefully degrade from desktop to mobile
- Knowing **when (and when not) to use an `<iframe>`** — for embedding external content, not for site navigation
- Migrating a raster-icon UI to a **scalable vector icon system**

## Author

**Ahmad Tahseen Ali** — Software Engineering Student

---
*Al-Hussein Bin Talal University · Software Engineering*
