// 共通コンポーネント定義
const CommonComponents = {
  // ヘッダーHTML
  header: `
    <header class="header">
        <nav class="nav">
            <div class="container">
                <div class="nav-wrapper">
                    <div class="logo">
                        <h1><a href="index.html">副業ラボ</a></h1>
                    </div>
                    <ul class="nav-menu">
                        <li><a href="index.html#categories">カテゴリー</a></li>
                        <li><a href="index.html#ranking">人気記事</a></li>
                        <li><a href="about.html">初めての方へ</a></li>
                        <li><a href="consultation.html" class="cta-button">無料相談</a></li>
                    </ul>
                    <div class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
    </header>
  `,

  // フッターHTML
  footer: `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>副業ラボ</h3>
                    <p>AIが提案する最新副業情報サイト。あなたに合った副業を見つけて、理想の収入アップを実現しましょう。</p>
                </div>
                <div class="footer-section">
                    <h4>サイト情報</h4>
                    <ul class="footer-links-grid">
                        <li><a href="footer/terms.html">利用規約</a></li>
                        <li><a href="footer/privacy.html">プライバシーポリシー</a></li>
                        <li><a href="footer/contact.html">お問い合わせ</a></li>
                        <li><a href="about.html">初めての方へ</a></li>
                        <li><a href="about-us.html">About Us</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 副業ラボ. All rights reserved.</p>
                <p style="font-size: 0.75rem; color: #999; margin-top: 0.5rem;">※ このサイトは生成AIを用いて作成しています。</p>
            </div>
        </div>
    </footer>
  `,

  // 人気記事TOP5
  popularArticles: `
    <div class="sidebar-widget">
        <h3>人気記事TOP5</h3>
        <ol class="popular-list">
            <a href="articles/chatgpt-writing-side-job.html" style="text-decoration: none; color: inherit; display: block; cursor: pointer;"><li>ChatGPTを活用したWebライティング副業で月10万円稼ぐ方法</li></a>
            <a href="articles/investment/tsumitate-nisa-guide.html" style="text-decoration: none; color: inherit; display: block; cursor: pointer;"><li>初心者でも始められる！月1万円から始める積立投資術</li></a>
            <a href="articles/skill-share/online-tutoring.html" style="text-decoration: none; color: inherit; display: block; cursor: pointer;"><li>オンライン家庭教師で時給3000円稼ぐ方法</li></a>
            <a href="articles/online-work/data-entry-jobs.html" style="text-decoration: none; color: inherit; display: block; cursor: pointer;"><li>データ入力の副業で月5万円稼ぐ方法</li></a>
            <a href="articles/online-work/writing-side-job.html" style="text-decoration: none; color: inherit; display: block; cursor: pointer;"><li>Webライティングで月10万円稼ぐ方法</li></a>
        </ol>
    </div>
  `,

  // カテゴリーリスト
  categoryList: `
    <div class="sidebar-widget">
        <h3>カテゴリー</h3>
        <ul class="category-list">
            <li><a href="categories/online-work.html">在宅ワーク</a></li>
            <li><a href="categories/skill-share.html">スキルシェア</a></li>
            <li><a href="categories/investment.html">投資・資産運用</a></li>
            <li><a href="categories/creative.html">クリエイティブ</a></li>
            <li><a href="categories/ecommerce.html">物販・EC</a></li>
            <li><a href="categories/gig-economy.html">ギグエコノミー</a></li>
        </ul>
    </div>
  `,

  // 著者プロフィール
  authorProfile: `
    <div class="sidebar-widget">
        <h3>この記事を書いた人</h3>
        <div class="author-profile">
            <div class="author-avatar">AI</div>
            <h4>AI副業アドバイザー</h4>
            <p>最新のAI技術で毎日更新される副業情報を分析・提供しています。</p>
        </div>
    </div>
  `
};

// パスを調整する関数
function adjustPaths(html, depth) {
  if (depth === 0) return html; // ルートディレクトリ
  
  const prefix = '../'.repeat(depth);
  
  // hrefのパス調整（httpやmailtoで始まるものは除外）
  html = html.replace(/href="([^"]*)"/g, (match, path) => {
    if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:') || path.startsWith('#')) {
      return match;
    }
    return `href="${prefix}${path}"`;
  });
  
  // srcのパス調整
  html = html.replace(/src="([^"]*)"/g, (match, path) => {
    if (path.startsWith('http') || path.startsWith('data:')) return match;
    return `src="${prefix}${path}"`;
  });
  
  return html;
}

// コンポーネントを挿入する関数
function loadCommonComponents(depth = null) {
  // 階層の深さを取得（引数で指定されない場合は自動判定）
  let pathDepth = depth;
  if (pathDepth === null) {
    // data-depth属性から取得を試行
    const bodyElement = document.querySelector('body');
    if (bodyElement && bodyElement.dataset.depth) {
      pathDepth = parseInt(bodyElement.dataset.depth);
    } else {
      // フォールバック：スクリプトのsrc属性から判定
      const scriptTags = document.querySelectorAll('script[src*="common-components.js"]');
      if (scriptTags.length > 0) {
        const src = scriptTags[0].src;
        pathDepth = (src.match(/\.\.\//g) || []).length;
      } else {
        pathDepth = 0; // デフォルト
      }
    }
  }
  
  // ヘッダーを挿入
  const headerPlaceholder = document.getElementById('common-header');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = adjustPaths(CommonComponents.header, pathDepth);
  }
  
  // フッターを挿入
  const footerPlaceholder = document.getElementById('common-footer');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = adjustPaths(CommonComponents.footer, pathDepth);
  }
  
  // 人気記事を挿入
  const popularPlaceholder = document.getElementById('popular-articles');
  if (popularPlaceholder) {
    popularPlaceholder.innerHTML = adjustPaths(CommonComponents.popularArticles, pathDepth);
  }
  
  // カテゴリーリストを挿入
  const categoryPlaceholder = document.getElementById('category-list');
  if (categoryPlaceholder) {
    categoryPlaceholder.innerHTML = adjustPaths(CommonComponents.categoryList, pathDepth);
  }
  
  // 著者プロフィールを挿入
  const authorPlaceholder = document.getElementById('author-profile');
  if (authorPlaceholder) {
    authorPlaceholder.innerHTML = CommonComponents.authorProfile;
  }
}

// DOMContentLoadedで実行
document.addEventListener('DOMContentLoaded', function() {
  loadCommonComponents();
});