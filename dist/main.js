"use strict";
// 終端機風格個人網站 TypeScript 邏輯
class TerminalPortfolio {
	constructor() {
		this.hamburgerMenu = document.querySelector(".hamburger");
		this.mobileMenu = document.querySelector(".mobile-menu");
		this.navLinks = document.querySelectorAll(".nav-link");
		this.currentDateElement = document.getElementById("current-date");
		this.experienceCards = document.querySelectorAll(".experience-item");
		this.init();
	}
	init() {
		this.setupEventListeners();
		this.setupCurrentDate();
		this.setupCategoryFilters();
		this.setupContactEasterEgg();
		this.setupExperienceFlipCards();
	}
	setupEventListeners() {
		// 漢堡選單切換
		if (this.hamburgerMenu) {
			this.hamburgerMenu.addEventListener("click", (e) => {
				e.stopPropagation();
				this.toggleMobileMenu();
			});
		}
		// 導航連結點擊 - 只處理錨點連結
		this.navLinks.forEach((link) => {
			link.addEventListener("click", (e) => {
				const href = link.getAttribute("href");
				if (href && href.startsWith("#")) {
					e.preventDefault();
					const targetId = href.substring(1);
					this.scrollToSection(targetId);
					this.closeMobileMenu();
				}
			});
		});
		// 點擊外部關閉手機選單
		document.addEventListener("click", (e) => {
			if (
				this.mobileMenu &&
				this.mobileMenu.classList.contains("active")
			) {
				const target = e.target;
				if (
					!target.closest(".hamburger") &&
					!target.closest(".mobile-menu")
				) {
					this.closeMobileMenu();
				}
			}
		});
		// 視窗大小改變時關閉手機選單
		window.addEventListener("resize", () => {
			if (window.innerWidth > 768) {
				this.closeMobileMenu();
			}
		});
	}
	toggleMobileMenu() {
		if (this.hamburgerMenu && this.mobileMenu) {
			this.hamburgerMenu.classList.toggle("active");
			this.mobileMenu.classList.toggle("active");
			// 防止背景滾動
			document.body.style.overflow = this.mobileMenu.classList.contains(
				"active",
			)
				? "hidden"
				: "";
		}
	}
	closeMobileMenu() {
		if (this.hamburgerMenu && this.mobileMenu) {
			this.hamburgerMenu.classList.remove("active");
			this.mobileMenu.classList.remove("active");
			document.body.style.overflow = "";
		}
	}
	scrollToSection(sectionId) {
		const targetElement = document.getElementById(sectionId);
		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}
	setupCurrentDate() {
		if (this.currentDateElement) {
			const now = new Date();
			const options = {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				timeZoneName: "short",
			};
			const dateString = now.toLocaleString("en-US", options);
			this.currentDateElement.textContent = dateString;
		}
	}
	// 分類過濾功能
	setupCategoryFilters() {
		// 延遲執行，確保 DOM 完全載入
		setTimeout(() => {
			this.bindCategoryEvents();
		}, 100);
	}
	bindCategoryEvents() {
		console.log("Binding category events...");
		// 為分類連結添加點擊事件
		const footerCategories = document.querySelectorAll(".footer-link");
		console.log("Found footer categories:", footerCategories.length);
		footerCategories.forEach((category) => {
			const href = category.getAttribute("href");
			// 檢查是否為分類頁面連結（包含 category- 的連結）
			if (href && href.includes("category-")) {
				category.addEventListener("click", (e) => {
					e.preventDefault();
					e.stopPropagation();
					console.log("Category clicked:", href);
					window.location.href = href;
				});
			}
		});
	}
	setupContactEasterEgg() {
		const submitButton = document.querySelector(".form-submit");
		if (!submitButton) {
			return;
		}
		submitButton.addEventListener("click", (e) => {
			e.preventDefault();
			const rect = submitButton.getBoundingClientRect();
			const originX = rect.left + rect.width / 2;
			const originY = rect.top + rect.height / 2;
			this.launchFireworks(originX, originY);
		});
	}
	setupExperienceFlipCards() {
		if (!this.experienceCards.length) {
			return;
		}
		this.experienceCards.forEach((card) => {
			card.addEventListener("click", (e) => {
				const target = e.target;
				if (target.closest("a")) {
					return;
				}
				const isFlipped = card.classList.contains("is-flipped");
				this.experienceCards.forEach((otherCard) => {
					otherCard.classList.remove("is-flipped");
				});
				if (!isFlipped) {
					card.classList.add("is-flipped");
				}
			});
		});
		document.addEventListener("click", (e) => {
			const target = e.target;
			if (!target.closest(".experience-item")) {
				this.experienceCards.forEach((card) => {
					card.classList.remove("is-flipped");
				});
			}
		});
	}
	launchFireworks(originX, originY) {
		const layer = this.getFireworkLayer();
		const burstPoints = [
			{ x: originX, y: originY },
			{ x: window.innerWidth * 0.5, y: window.innerHeight * 0.25 },
			{ x: window.innerWidth * 0.3, y: window.innerHeight * 0.35 },
			{ x: window.innerWidth * 0.7, y: window.innerHeight * 0.3 },
			{ x: window.innerWidth * 0.2, y: window.innerHeight * 0.45 },
			{ x: window.innerWidth * 0.8, y: window.innerHeight * 0.42 },
		];
		burstPoints.forEach((point, index) => {
			window.setTimeout(() => {
				this.createFireworkBurst(layer, point.x, point.y);
			}, index * 130);
		});
	}
	getFireworkLayer() {
		let layer = document.querySelector(".firework-layer");
		if (!layer) {
			layer = document.createElement("div");
			layer.className = "firework-layer";
			document.body.appendChild(layer);
		}
		return layer;
	}
	createFireworkBurst(layer, centerX, centerY) {
		const colors = [
			"#7ee787",
			"#58a6ff",
			"#f2cc60",
			"#f85149",
			"#bc8cff",
			"#ffa657",
			"#79ffe1",
		];
		const particleCount = 64;
		for (let i = 0; i < particleCount; i++) {
			const particle = document.createElement("span");
			const angle = (Math.PI * 2 * i) / particleCount;
			const distance = 150 + Math.random() * 190;
			const dx = Math.cos(angle) * distance;
			const dy = Math.sin(angle) * distance;
			particle.className = "firework-particle";
			particle.style.left = `${centerX}px`;
			particle.style.top = `${centerY}px`;
			particle.style.color =
				colors[Math.floor(Math.random() * colors.length)];
			particle.style.setProperty("--dx", `${dx.toFixed(2)}px`);
			particle.style.setProperty("--dy", `${dy.toFixed(2)}px`);
			particle.style.setProperty(
				"--dur",
				`${(1050 + Math.random() * 700).toFixed(0)}ms`,
			);
			particle.style.setProperty(
				"--size",
				`${(8 + Math.random() * 8).toFixed(1)}px`,
			);
			particle.style.setProperty(
				"--delay",
				`${(Math.random() * 160).toFixed(0)}ms`,
			);
			layer.appendChild(particle);
			particle.addEventListener(
				"animationend",
				() => {
					particle.remove();
				},
				{ once: true },
			);
		}
	}
}
// 初始化
document.addEventListener("DOMContentLoaded", () => {
	new TerminalPortfolio();
});
//# sourceMappingURL=main.js.map
