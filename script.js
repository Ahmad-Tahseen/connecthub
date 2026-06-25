// ============================================================
// CONNECTHUB — script.js
// Shared across index.html / profile.html / messages.html
// Every feature is guarded so missing elements on a given
// page simply get skipped instead of throwing errors.
// ============================================================

// ---------------------------------------------------------------
// 1) DARK MODE (persisted via localStorage) — original feature
// ---------------------------------------------------------------
(function initTheme(){
	const darkBtn = document.getElementById("dark-btn");

	// Apply saved theme on every page load, regardless of whether
	// this page has the toggle UI (only index.html does).
	if (localStorage.getItem("theme") === "dark"){
		document.body.classList.add("dark-theme");
		if (darkBtn) darkBtn.classList.add("dark-btn-on");
	}

	if (darkBtn){
		darkBtn.addEventListener("click", () => {
			darkBtn.classList.toggle("dark-btn-on");
			document.body.classList.toggle("dark-theme");
			localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
		});
	}
})();

// ---------------------------------------------------------------
// 2) SETTINGS MENU TOGGLE (index.html only)
// ---------------------------------------------------------------
function settingsMenuToggle(){
	const settingsMenu = document.querySelector(".settings-menu");
	if (settingsMenu) settingsMenu.classList.toggle("settings-menu-height");
}

// ---------------------------------------------------------------
// 3) NOTIFICATIONS DROPDOWN (index.html only)
// ---------------------------------------------------------------
function notifMenuToggle(){
	const notifMenu = document.getElementById("notif-menu");
	if (notifMenu) notifMenu.classList.toggle("open");
}

// Close notif menu / settings menu when clicking outside
document.addEventListener("click", (e) => {
	const notifMenu = document.getElementById("notif-menu");
	if (notifMenu && !e.target.closest(".notif-wrap") && notifMenu.classList.contains("open")){
		notifMenu.classList.remove("open");
	}
});

// ---------------------------------------------------------------
// 4) LIVE SEARCH (index.html — needs #searchInput + #searchResults)
// ---------------------------------------------------------------
(function initSearch(){
	const searchInput   = document.getElementById("searchInput");
	const searchResults = document.getElementById("searchResults");
	if (!searchInput || !searchResults) return;

	const people = [
		{ name: "Hamza Saleh",      role: "Robotics Teammate", avatar: "images/HH-2.jpg" },
		{ name: "H1mmam Alaghbar",  role: "Frontend Developer", avatar: "images/HH-3.jpg" },
		{ name: "Feras Fayyat",     role: "Photographer",       avatar: "images/HH-4.jpg" },
		{ name: "Cozy Rider",       role: "Travel Blogger",     avatar: "images/HH-1.jpg" },
		{ name: "RIFA Robotics Club", role: "Group · 86 members", avatar: "images/member-5.png" },
		{ name: "Lina Odeh",        role: "UI/UX Designer",     avatar: "images/member-1.png" },
	];

	searchInput.addEventListener("input", () => {
		const q = searchInput.value.trim().toLowerCase();
		if (!q){
			searchResults.classList.remove("show");
			searchResults.innerHTML = "";
			return;
		}
		const matches = people.filter(p => p.name.toLowerCase().includes(q));
		searchResults.innerHTML = matches.length
			? matches.map(p => `
				<div class="search-result-item">
					<img src="${p.avatar}">
					<div>
						<div style="font-weight:600;">${p.name}</div>
						<div style="font-size:11px;color:var(--text-muted);">${p.role}</div>
					</div>
				</div>`).join("")
			: `<div class="search-result-empty">No results for "${q}"</div>`;
		searchResults.classList.add("show");
	});

	document.addEventListener("click", (e) => {
		if (!e.target.closest(".search-box")) searchResults.classList.remove("show");
	});
})();

// ---------------------------------------------------------------
// 5) LIKE BUTTON TOGGLE (any page with .like-btn)
// ---------------------------------------------------------------
document.querySelectorAll(".like-btn").forEach(btn => {
	btn.addEventListener("click", () => {
		btn.classList.toggle("liked");
		const icon = btn.querySelector("i");
		if (icon) icon.className = btn.classList.contains("liked") ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up";
	});
});

// ---------------------------------------------------------------
// 6) LOAD MORE POSTS (index.html only)
// ---------------------------------------------------------------
(function initLoadMore(){
	const btn  = document.getElementById("loadMoreBtn");
	const feed = document.getElementById("postsFeed");
	if (!btn || !feed) return;

	const morePosts = [
		{
			name: "Lina Odeh", avatar: "images/member-1.png", time: "Jan 3 2026, 09:40 am",
			text: `Redesigned the onboarding flow for our class project — feedback welcome! <a href="#">#UIUX</a>`,
			img: "images/P6.png", likes: "212", comments: "18"
		},
		{
			name: "RIFA Robotics Club", avatar: "images/member-5.png", time: "Jan 8 2026, 16:02 pm",
			text: `Practice match highlights from this week's scrimmage 🤖⚙️ <a href="#">#RIFA</a> <a href="#">#Robotics</a>`,
			img: "images/P7.jpeg", likes: "388", comments: "47"
		}
	];

	let loaded = false;
	btn.addEventListener("click", () => {
		if (loaded){ return; }
		feed.insertAdjacentHTML("beforeend", morePosts.map(p => `
			<div class="post-container">
				<div class="post-row">
					<div class="user-profile">
						<img src="${p.avatar}">
						<div><p>${p.name}</p><span>${p.time}</span></div>
					</div>
					<a href="#"><i class="fa-solid fa-ellipsis-vertical"></i></a>
				</div>
				<p class="post-text">${p.text}</p>
				<img src="${p.img}" class="post-img">
				<div class="post-row">
					<div class="activity-icons">
						<button class="like-btn"><i class="fa-regular fa-thumbs-up"></i> ${p.likes}</button>
						<div><i class="fa-regular fa-comment"></i> ${p.comments}</div>
						<div><i class="fa-solid fa-share"></i></div>
					</div>
				</div>
			</div>
		`).join(""));

		// re-attach like handlers for newly injected buttons
		feed.querySelectorAll(".like-btn").forEach(b => {
			b.onclick = () => {
				b.classList.toggle("liked");
				const icon = b.querySelector("i");
				if (icon) icon.className = b.classList.contains("liked") ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up";
			};
		});

		loaded = true;
		btn.textContent = "No More Posts";
		btn.disabled = true;
	});
})();

// ---------------------------------------------------------------
// 7) NEW POST CREATION (index.html only)
// ---------------------------------------------------------------
(function initPostCreate(){
	const postInput = document.getElementById("postInput");
	const postBtn   = document.getElementById("postBtn");
	const feed      = document.getElementById("postsFeed");
	if (!postInput || !postBtn || !feed) return;

	postBtn.addEventListener("click", () => {
		const text = postInput.value.trim();
		if (!text) return;

		feed.insertAdjacentHTML("afterbegin", `
			<div class="post-container">
				<div class="post-row">
					<div class="user-profile">
						<img src="images/HH.jpg">
						<div><p>Ahmad Ali</p><span>Just now</span></div>
					</div>
					<a href="#"><i class="fa-solid fa-ellipsis-vertical"></i></a>
				</div>
				<p class="post-text">${text}</p>
				<div class="post-row">
					<div class="activity-icons">
						<button class="like-btn"><i class="fa-regular fa-thumbs-up"></i> 0</button>
						<div><i class="fa-regular fa-comment"></i> 0</div>
						<div><i class="fa-solid fa-share"></i></div>
					</div>
				</div>
			</div>
		`);
		postInput.value = "";

		feed.querySelector(".like-btn").onclick = function(){
			this.classList.toggle("liked");
			const icon = this.querySelector("i");
			if (icon) icon.className = this.classList.contains("liked") ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up";
		};
	});
})();

// ---------------------------------------------------------------
// 8) PROFILE TABS (profile.html only)
// ---------------------------------------------------------------
(function initProfileTabs(){
	const tabBtns = document.querySelectorAll(".tab-btn");
	if (!tabBtns.length) return;

	tabBtns.forEach(btn => {
		btn.addEventListener("click", () => {
			tabBtns.forEach(b => b.classList.remove("active"));
			btn.classList.add("active");

			document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.add("hidden"));
			const target = document.getElementById("tab-" + btn.dataset.tab);
			if (target) target.classList.remove("hidden");
		});
	});

	// Support deep-link like profile.html#friends
	if (location.hash){
		const tab = location.hash.replace("#", "");
		const btn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
		if (btn) btn.click();
	}
})();

// ---------------------------------------------------------------
// 9) MESSAGES PAGE — conversation switching + sending (messages.html only)
// ---------------------------------------------------------------
(function initMessages(){
	const convItems   = document.querySelectorAll(".conv-item");
	const chatMessages = document.getElementById("chatMessages");
	const chatName     = document.getElementById("chatName");
	const chatAvatar   = document.getElementById("chatAvatar");
	const chatInput    = document.getElementById("chatInput");
	const chatSendBtn  = document.getElementById("chatSendBtn");
	if (!convItems.length || !chatMessages) return;

	const conversations = {
		"Hamza Saleh": [
			{ from: "received", text: "Wassup buddy , how is life going lately?" },
			{ from: "sent",     text: "its been good actually" },
			{ from: "received", text: "and how's urs?" },
			{ from: "sent",     text: "its been up and down but its doing fine now" },
		],
		"H1mmam Alaghbar": [
			{ from: "received", text: "i was programming an app for the uni" },
			{ from: "received", text: "are you down to help?" },
			{ from: "sent",     text: "yeah sure man when?" },
		],
		"Feras Fayyat": [
			{ from: "received", text: "That photo turned out amazing " },
			{ from: "sent",     text: "The lighting at golden hour really helped" },
			{ from: "received", text: "We should plan another shoot soon" },
		],
		"Cozy Rider": [
			{ from: "received", text: "What happened to ur bike?" },
			{ from: "sent",     text: "i went into accident and got out safe " },
		],
		"RIFA Robotics Club": [
			{ from: "received", text: "Reminder: bring the chassis parts tomorrow" },
			{ from: "received", text: "Practice starts at 5pm sharp" },
			{ from: "sent",     text: "Got it, see everyone there" },
		],
	};

	function renderConversation(name, avatar){
		if (chatName)   chatName.textContent = name;
		if (chatAvatar) chatAvatar.src = avatar;
		const msgs = conversations[name] || [];
		chatMessages.innerHTML = msgs.map(m => `<div class="bubble ${m.from}">${m.text}</div>`).join("");
		chatMessages.scrollTop = chatMessages.scrollHeight;
	}

	convItems.forEach(item => {
		item.addEventListener("click", () => {
			convItems.forEach(i => i.classList.remove("active"));
			item.classList.add("active");
			renderConversation(item.dataset.name, item.dataset.avatar);
		});
	});

	// IMPORTANT: render the default chat from the JS `conversations` object
	// on page load too — otherwise the page shows the static placeholder
	// HTML instead of your edited text until you click a conversation.
	const defaultItem = document.querySelector(".conv-item.active") || convItems[0];
	if (defaultItem) renderConversation(defaultItem.dataset.name, defaultItem.dataset.avatar);

	function updatePreview(convItem, text, isYou = false){
		const p = convItem.querySelector(".conv-text p");
		if (p) {
			p.textContent = (isYou ? "You: " : "") + text;
			// Flash the preview blue briefly so the update is always visible
			p.classList.remove("preview-updated");
			void p.offsetWidth; // force reflow to restart animation
			p.classList.add("preview-updated");
		}
		const timeEl = convItem.querySelector(".conv-time");
		if (timeEl) timeEl.textContent = "Just now";

		// Move this conversation to the top of the list (like real Messenger)
		const list = document.getElementById("conversationList");
		if (list) {
			const header = list.querySelector(".conv-list-header");
			if (header) list.insertBefore(convItem, header.nextSibling);
		}
	}

	function sendMessage(){
		if (!chatInput) return;
		const text = chatInput.value.trim();
		if (!text) return;

		const activeItem = document.querySelector(".conv-item.active");
		const name = activeItem ? activeItem.dataset.name : chatName.textContent;
		if (!conversations[name]) conversations[name] = [];
		conversations[name].push({ from: "sent", text });

		chatMessages.insertAdjacentHTML("beforeend", `<div class="bubble sent">${text}</div>`);
		chatMessages.scrollTop = chatMessages.scrollHeight;
		chatInput.value = "";

		// update the conversation list preview line — always runs, no null risk
		if (activeItem) updatePreview(activeItem, text, true);
	}

	if (chatSendBtn) chatSendBtn.addEventListener("click", sendMessage);
	if (chatInput) chatInput.addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage(); });
})();
