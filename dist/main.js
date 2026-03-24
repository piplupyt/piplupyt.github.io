"use strict";
// 終端機風格個人網站 TypeScript 邏輯
class TerminalPortfolio {
    constructor() {
        this.hamburgerMenu = document.querySelector('.hamburger');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.currentDateElement = document.getElementById('current-date');
        this.init();
    }
    init() {
        this.setupEventListeners();
        this.setupCurrentDate();
        this.setupCategoryFilters();
    }
    setupEventListeners() {
        // 漢堡選單切換
        if (this.hamburgerMenu) {
            this.hamburgerMenu.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }
        // 導航連結點擊 - 只處理錨點連結
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    this.scrollToSection(targetId);
                    this.closeMobileMenu();
                }
            });
        });
        // 點擊外部關閉手機選單
        document.addEventListener('click', (e) => {
            if (this.mobileMenu && this.mobileMenu.classList.contains('active')) {
                const target = e.target;
                if (!target.closest('.hamburger') && !target.closest('.mobile-menu')) {
                    this.closeMobileMenu();
                }
            }
        });
        // 視窗大小改變時關閉手機選單
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }
    toggleMobileMenu() {
        if (this.hamburgerMenu && this.mobileMenu) {
            this.hamburgerMenu.classList.toggle('active');
            this.mobileMenu.classList.toggle('active');
            // 防止背景滾動
            document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : '';
        }
    }
    closeMobileMenu() {
        if (this.hamburgerMenu && this.mobileMenu) {
            this.hamburgerMenu.classList.remove('active');
            this.mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    scrollToSection(sectionId) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    setupCurrentDate() {
        if (this.currentDateElement) {
            const now = new Date();
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            };
            const dateString = now.toLocaleString('en-US', options);
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
        console.log('Binding category events...');
        // 為分類連結添加點擊事件
        const footerCategories = document.querySelectorAll('.footer-link');
        console.log('Found footer categories:', footerCategories.length);
        footerCategories.forEach(category => {
            const href = category.getAttribute('href');
            // 檢查是否為分類頁面連結（包含 category- 的連結）
            if (href && href.includes('category-')) {
                category.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const categoryName = category.textContent?.trim();
                    console.log('Category clicked:', categoryName);
                    if (categoryName) {
                        this.navigateToCategoryPage(categoryName);
                    }
                });
            }
        });
    }
    navigateToCategoryPage(categoryName) {
        const categoryPageMap = {
            '技術': 'category-技術.html',
            '設計': 'category-設計.html',
            '生活': 'category-生活.html',
            '教學': 'category-教學.html'
        };
        const pageName = categoryPageMap[categoryName];
        if (pageName) {
            window.location.href = pageName;
        }
        else {
            console.log('No page found for category:', categoryName);
        }
    }
}
// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new TerminalPortfolio();
});
//# sourceMappingURL=main.js.map
