// 共通コンポーネント設定
// 各記事から読み込む際に、相対パスを動的に設定します

// 現在のページから見たルートまでの相対パスを取得
function getRelativeRoot() {
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;
    
    if (depth === 0) return '.';
    if (depth === 1) return '..';
    if (depth === 2) return '../..';
    if (depth === 3) return '../../..';
    
    return '../'.repeat(depth - 1) + '..';
}

// グローバル変数として相対ルートを保存
const ROOT_PATH = getRelativeRoot();

// 共通コンポーネント定義
const CommonComponents = {
    // ヘッダーHTML
    getHeader: function() {
        return `
        <header class="header">
            <nav class="nav">
                <div class="container">
                    <div class="nav-wrapper">
                        <div class="logo">
                            <h1><a href="${ROOT_PATH}/">副業ラボ</a></h1>
                        </div>
                        <ul class="nav-menu">
                            <li><a href="${ROOT_PATH}/#categories">カテゴリー</a></li>
                            <li><a href="${ROOT_PATH}/#ranking">人気記事</a></li>
                            <li><a href="${ROOT_PATH}/#about">初めての方へ</a></li>
                            <li><a href="${ROOT_PATH}/#contact" class="cta-button">お問い合わせ</a></li>
                        </ul>
                        <div class="hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </nav>
        </header>`;
    },

    // フッターHTML
    getFooter: function() {
        return `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>副業ラボ</h3>
                        <p>AIが提案する最新副業情報サイト</p>
                    </div>
                    <div class="footer-section">
                        <h4>カテゴリー</h4>
                        <ul>
                            <li><a href="${ROOT_PATH}/categories/online-work.html">在宅ワーク</a></li>
                            <li><a href="#">投資・資産運用</a></li>
                            <li><a href="#">スキルシェア</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>サイト情報</h4>
                        <ul>
                            <li><a href="#">利用規約</a></li>
                            <li><a href="#">プライバシーポリシー</a></li>
                            <li><a href="#">お問い合わせ</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 副業ラボ. All rights reserved. | <a href="#">運営者情報</a></p>
                    <p style="font-size: 0.75rem; color: #999; margin-top: 0.5rem;">※ このサイトは生成AIを用いて作成しています。</p>
                </div>
            </div>
        </footer>`;
    },

    // 人気記事TOP5
    getPopularArticles: function() {
        return `
        <div class="sidebar-widget">
            <h3>人気記事TOP5</h3>
            <ol class="popular-list">
                <li><a href="${ROOT_PATH}/articles/online-work/data-entry-jobs.html">データ入力の副業で月5万円稼ぐ方法</a></li>
                <li><a href="${ROOT_PATH}/articles/online-work/writing-side-job.html">Webライティングで月10万円稼ぐ方法</a></li>
                <li><a href="${ROOT_PATH}/articles/online-work/programming-for-beginners.html">プログラミング副業の始め方</a></li>
                <li><a href="${ROOT_PATH}/articles/online-work/virtual-assistant.html">オンライン秘書の副業ガイド</a></li>
                <li><a href="#">副業の税金対策完全ガイド</a></li>
            </ol>
        </div>`;
    },

    // カテゴリーリスト（記事数は自動更新が必要な場合はここを編集）
    getCategoryList: function() {
        return `
        <div class="sidebar-widget">
            <h3>カテゴリー</h3>
            <ul class="category-list">
                <li><a href="${ROOT_PATH}/categories/online-work.html">在宅ワーク (4)</a></li>
                <li><a href="#">投資・資産運用 (0)</a></li>
                <li><a href="#">スキルシェア (0)</a></li>
                <li><a href="#">クリエイティブ (0)</a></li>
                <li><a href="#">物販・EC (0)</a></li>
            </ul>
        </div>`;
    },

    // 著者プロフィール
    getAuthorProfile: function() {
        return `
        <div class="sidebar-widget">
            <h3>この記事を書いた人</h3>
            <div class="author-profile">
                <div class="author-avatar">AI</div>
                <h4>AI副業アドバイザー</h4>
                <p>最新のAI技術で毎日更新される副業情報を分析・提供しています。</p>
            </div>
        </div>`;
    }
};

// コンポーネントを挿入する関数
function loadCommonComponents() {
    // ヘッダーを挿入
    const headerPlaceholder = document.getElementById('common-header');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = CommonComponents.getHeader();
    }
    
    // フッターを挿入
    const footerPlaceholder = document.getElementById('common-footer');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = CommonComponents.getFooter();
    }
    
    // 人気記事を挿入
    const popularPlaceholder = document.getElementById('popular-articles');
    if (popularPlaceholder) {
        popularPlaceholder.innerHTML = CommonComponents.getPopularArticles();
    }
    
    // カテゴリーリストを挿入
    const categoryPlaceholder = document.getElementById('category-list');
    if (categoryPlaceholder) {
        categoryPlaceholder.innerHTML = CommonComponents.getCategoryList();
    }
    
    // 著者プロフィールを挿入
    const authorPlaceholder = document.getElementById('author-profile');
    if (authorPlaceholder) {
        authorPlaceholder.innerHTML = CommonComponents.getAuthorProfile();
    }
}

// DOMContentLoadedで実行
document.addEventListener('DOMContentLoaded', loadCommonComponents);