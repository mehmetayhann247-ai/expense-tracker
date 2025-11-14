// Application State
let currentLanguage = 'tr';
let transactions = [];
let budgets = []; // Budget management
let goals = []; // Savings goals
let recurringTransactions = []; // Recurring transactions
let accounts = []; // Multiple accounts/wallets
let receipts = []; // Receipt management
let userPreferences = {
    theme: 'light',
    currency: '₺',
    notifications: true,
    language: 'tr'
};
let currentAccount = null;
let categories = [
    // Expense Categories
    { id: 1, name: 'Yemek', icon: '🍔', color: '#FF6B6B', type: 'expense' },
    { id: 2, name: 'Ulaşım', icon: '🚗', color: '#4ECDC4', type: 'expense' },
    { id: 3, name: 'Market', icon: '🛒', color: '#45B7D1', type: 'expense' },
    { id: 4, name: 'Faturalar', icon: '💡', color: '#96CEB4', type: 'expense' },
    { id: 5, name: 'Eğlence', icon: '🎬', color: '#FFEAA7', type: 'expense' },
    { id: 6, name: 'Sağlık', icon: '💊', color: '#DDA0DD', type: 'expense' },
    { id: 7, name: 'Giyim', icon: '👕', color: '#98D8C8', type: 'expense' },
    { id: 8, name: 'Kira', icon: '🏠', color: '#F7DC6F', type: 'expense' },
    { id: 9, name: 'İletişim', icon: '📱', color: '#BB8FCE', type: 'expense' },
    { id: 10, name: 'Diğer', icon: '✨', color: '#85C1E9', type: 'expense' },
    
    // Income Categories
    { id: 11, name: 'Maaş', icon: '💰', color: '#51CF66', type: 'income' },
    { id: 12, name: 'Bonus', icon: '🎉', color: '#40E0D0', type: 'income' },
    { id: 13, name: 'Yatırım', icon: '📈', color: '#32CD32', type: 'income' },
    { id: 14, name: 'Diğer Gelir', icon: '💎', color: '#228B22', type: 'income' }
];

let currentTransactionType = 'expense';
let editingTransactionId = null;
let currentView = 'home'; // Current screen view
let notifications = []; // System notifications

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('DOM yüklendi, uygulama başlatılıyor...');
        
        loadData();
        console.log('Veriler yüklendi');
        
        initializeApp();
        console.log('Uygulama initialize edildi');
        
        setupEventListeners();
        console.log('Event listeners kuruldu');
        
        // Hide loading screen after a delay
        setTimeout(() => {
            const loadingEl = document.getElementById('loading');
            const appEl = document.getElementById('app');
            
            if (loadingEl) {
                loadingEl.style.display = 'none';
            }
            if (appEl) {
                appEl.style.display = 'block';
            }
            
            console.log('Loading screen gizlendi, app gösterildi');
        }, 1000);
        
        console.log('Uygulama başarıyla yüklendi');
    } catch (error) {
        console.error('Uygulama başlatma hatası:', error);
        alert('Uygulama başlatma sırasında hata oluştu: ' + error.message);
    }
});

function loadData() {
    let loaded = false;
    
    try {
        // LocalStorage'dan tüm veriyi yükle
        const savedData = {
            transactions: localStorage.getItem('transactions'),
            categories: localStorage.getItem('categories'),
            budgets: localStorage.getItem('budgets'),
            goals: localStorage.getItem('goals'),
            recurringTransactions: localStorage.getItem('recurringTransactions'),
            accounts: localStorage.getItem('accounts'),
            receipts: localStorage.getItem('receipts'),
            userPreferences: localStorage.getItem('userPreferences'),
            currentAccount: localStorage.getItem('currentAccount')
        };
        
        // Verileri yükle
        if (savedData.transactions) {
            transactions = JSON.parse(savedData.transactions);
            loaded = true;
        }
        if (savedData.categories) {
            categories = JSON.parse(savedData.categories);
            loaded = true;
        }
        if (savedData.budgets) {
            budgets = JSON.parse(savedData.budgets);
            loaded = true;
        }
        if (savedData.goals) {
            goals = JSON.parse(savedData.goals);
            loaded = true;
        }
        if (savedData.recurringTransactions) {
            recurringTransactions = JSON.parse(savedData.recurringTransactions);
            loaded = true;
        }
        if (savedData.accounts) {
            accounts = JSON.parse(savedData.accounts);
            loaded = true;
            if (!currentAccount && accounts.length > 0) {
                currentAccount = accounts[0].id;
            }
        }
        if (savedData.receipts) {
            receipts = JSON.parse(savedData.receipts);
            loaded = true;
        }
        if (savedData.userPreferences) {
            userPreferences = JSON.parse(savedData.userPreferences);
            loaded = true;
            applyTheme(userPreferences.theme);
        }
        if (savedData.currentAccount) {
            currentAccount = savedData.currentAccount;
            loaded = true;
        }
        
        // İlk kurulum - varsayılan hesap oluştur
        if (loaded && accounts.length === 0) {
            initializeDefaultAccount();
        }
        
    } catch (e) {
        console.error('LocalStorage yükleme hatası:', e);
    }
    
    if (!loaded) {
        try {
            // SessionStorage'a fall back
            const savedData = {
                transactions: sessionStorage.getItem('transactions'),
                categories: sessionStorage.getItem('categories'),
                budgets: sessionStorage.getItem('budgets'),
                goals: sessionStorage.getItem('goals')
            };
            
            if (savedData.transactions) {
                transactions = JSON.parse(savedData.transactions);
                loaded = true;
            }
            if (savedData.categories) {
                categories = JSON.parse(savedData.categories);
                loaded = true;
            }
            if (savedData.budgets) {
                budgets = JSON.parse(savedData.budgets);
                loaded = true;
            }
            if (savedData.goals) {
                goals = JSON.parse(savedData.goals);
                loaded = true;
            }
        } catch (e) {
            console.error('SessionStorage yükleme hatası:', e);
        }
    }
    
    // İlk kurulum durumunda varsayılan hesap oluştur
    if (accounts.length === 0) {
        initializeDefaultAccount();
    }
    
    console.log('Tüm veriler yüklendi - İşlemler:', transactions.length, 'Hesaplar:', accounts.length);
}

// Statistics Functions
let currentStatsMonth = new Date().getMonth();
let currentStatsYear = new Date().getFullYear();

function updateStatistics() {
    console.log('İstatistikler güncelleniyor...');
    
    const monthStats = calculateMonthlyStats(currentStatsYear, currentStatsMonth);
    updateStatsDisplay(monthStats);
    updateComparisonBars(monthStats);
    updateCategoryBreakdown(monthStats);
    updateActivitySummary(monthStats);
    updateMonthDisplay();
}

function changeMonth(direction) {
    currentStatsMonth += direction;
    
    if (currentStatsMonth < 0) {
        currentStatsMonth = 11;
        currentStatsYear--;
    } else if (currentStatsMonth > 11) {
        currentStatsMonth = 0;
        currentStatsYear++;
    }
    
    updateStatistics();
    updateMonthNavigationButtons();
}

function updateMonthDisplay() {
    const monthNames = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    
    document.getElementById('current-month-display').textContent = 
        `${monthNames[currentStatsMonth]} ${currentStatsYear}`;
}

function updateMonthNavigationButtons() {
    const now = new Date();
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    
    // Sadece geçmiş ayları göster ( gelecek ayları gösterme )
    if (currentStatsYear > now.getFullYear() || 
        (currentStatsYear === now.getFullYear() && currentStatsMonth > now.getMonth())) {
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.5';
    } else {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
    }
}

function calculateMonthlyStats(year, month) {
    console.log(`${year} yılı ${month + 1}. ay için istatistikler hesaplanıyor...`);
    
    const monthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getFullYear() === year && 
               transactionDate.getMonth() === month;
    });
    
    const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const netBalance = income - expenses;
    
    // Önceki ay ile karşılaştırma
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    
    const prevMonthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getFullYear() === prevYear && 
               transactionDate.getMonth() === prevMonth;
    });
    
    const prevIncome = prevMonthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const prevExpenses = prevMonthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const incomeChange = prevIncome > 0 ? ((income - prevIncome) / prevIncome) * 100 : 0;
    const expenseChange = prevExpenses > 0 ? ((expenses - prevExpenses) / prevExpenses) * 100 : 0;
    
    const stats = {
        totalIncome: income,
        totalExpenses: expenses,
        netBalance: netBalance,
        transactionCount: monthTransactions.length,
        incomeChange: incomeChange,
        expenseChange: expenseChange,
        prevIncome: prevIncome,
        prevExpenses: prevExpenses
    };
    
    console.log('İstatistik hesaplandı:', stats);
    return stats;
}

function updateStatsDisplay(stats) {
    console.log('İstatistik ekranı güncelleniyor...', stats);
    
    // Ana istatistikler
    document.getElementById('stats-total-income').textContent = formatCurrency(stats.totalIncome);
    document.getElementById('stats-total-expense').textContent = formatCurrency(stats.totalExpenses);
    document.getElementById('stats-net-balance').textContent = formatCurrency(stats.netBalance);
    
    // Trend göstergeleri
    updateTrendIndicator('income-change', stats.incomeChange, 'Gelir');
    updateTrendIndicator('expense-change', stats.expenseChange, 'Harcama');
    
    // Pasta dilim chart ekle
    updateCategoryBreakdown(stats);
}

function updateTrendIndicator(elementId, change, label) {
    const element = document.getElementById(elementId);
    const arrow = change > 0 ? '↗' : change < 0 ? '↘' : '→';
    const colorClass = change > 0 ? 'positive' : change < 0 ? 'negative' : '';
    
    element.className = `stat-detail-change ${colorClass}`;
    element.innerHTML = `
        <span>${arrow}</span>
        <span>${Math.abs(change).toFixed(1)}% ${label}</span>
    `;
}

function updateComparisonBars(stats) {
    console.log('Karşılaştırma çubukları güncelleniyor...');
    
    // Maksimum değeri hesapla (ölçekleme için)
    const maxValue = Math.max(stats.totalIncome, stats.totalExpenses, 1);
    
    // Gelir çubuğu
    const incomeBar = document.getElementById('bar-income');
    const incomeHeight = (stats.totalIncome / maxValue) * 100;
    incomeBar.style.height = `${Math.max(incomeHeight, 5)}%`;
    document.getElementById('bar-income-value').textContent = formatCurrency(stats.totalIncome);
    
    // Harcama çubuğu
    const expenseBar = document.getElementById('bar-expense');
    const expenseHeight = (stats.totalExpenses / maxValue) * 100;
    expenseBar.style.height = `${Math.max(expenseHeight, 5)}%`;
    document.getElementById('bar-expense-value').textContent = formatCurrency(stats.totalExpenses);
}

function updateCategoryBreakdown(stats) {
    console.log('Kategori dağılımı güncelleniyor...');
    
    const categoryBreakdown = document.getElementById('category-breakdown');
    const emptyStats = document.getElementById('stats-empty');
    const pieChartSection = document.getElementById('pie-chart-section');
    
    if (stats.totalExpenses === 0) {
        emptyStats.style.display = 'flex';
        categoryBreakdown.style.display = 'none';
        pieChartSection.style.display = 'none';
        return;
    }
    
    emptyStats.style.display = 'none';
    categoryBreakdown.style.display = 'block';
    
    // Kategori bazında harcamaları hesapla
    const categorySpending = {};
    
    transactions.forEach(t => {
        if (t.type === 'expense') {
            const transactionDate = new Date(t.date);
            if (transactionDate.getFullYear() === currentStatsYear && 
                transactionDate.getMonth() === currentStatsMonth) {
                if (!categorySpending[t.categoryId]) {
                    categorySpending[t.categoryId] = 0;
                }
                categorySpending[t.categoryId] += t.amount;
            }
        }
    });
    
    // Sırala (en çok harcanandan az harcanana)
    const sortedCategories = Object.entries(categorySpending)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10); // En çok 10 kategori göster
    
    // Pasta grafik verisi hazırla (ÜCRETSİZ ÖZELLİK)
    if (sortedCategories.length > 0) {
        pieChartSection.style.display = 'block';
        categoryBreakdown.style.display = 'block'; // Listeyi de göster
        
        const pieChartData = sortedCategories.map(([categoryId, amount]) => {
            const category = categories.find(c => c.id === parseInt(categoryId));
            return {
                label: category ? category.name : 'Bilinmeyen',
                value: amount,
                color: category ? category.color : '#6b7280'
            };
        });
        
        createPieChart(pieChartData, 'category-pie-chart');
    } else {
        pieChartSection.style.display = 'none';
    }
    
    // Liste görünümünü güncelle
    categoryBreakdown.innerHTML = '';
    
    sortedCategories.forEach(([categoryId, amount]) => {
        const category = categories.find(c => c.id === parseInt(categoryId));
        if (!category) return;
        
        const percentage = (amount / stats.totalExpenses) * 100;
        
        const item = document.createElement('div');
        item.className = 'category-breakdown-item';
        item.innerHTML = `
            <div class="category-breakdown-left">
                <div class="category-breakdown-icon" style="background: ${category.color}20; color: ${category.color};">
                    ${category.icon}
                </div>
                <div class="category-breakdown-info">
                    <div class="category-breakdown-name">${category.name}</div>
                    <div class="category-breakdown-amount">${percentage.toFixed(1)}%</div>
                </div>
            </div>
            <div class="category-breakdown-right">
                <div class="category-breakdown-value">${formatCurrency(amount)}</div>
            </div>
        `;
        
        categoryBreakdown.appendChild(item);
    });
}

function updateActivitySummary(stats) {
    console.log('Aktivite özeti güncelleniyor...');
    
    // Bu ay işlem sayısı
    document.getElementById('stats-transaction-count').textContent = stats.transactionCount;
    
    // En çok harcama yapılan kategori
    const categorySpending = {};
    transactions.forEach(t => {
        if (t.type === 'expense') {
            const transactionDate = new Date(t.date);
            if (transactionDate.getFullYear() === currentStatsYear && 
                transactionDate.getMonth() === currentStatsMonth) {
                if (!categorySpending[t.categoryId]) {
                    categorySpending[t.categoryId] = 0;
                }
                categorySpending[t.categoryId] += t.amount;
            }
        }
    });
    
    const topCategoryId = Object.entries(categorySpending)
        .sort(([,a], [,b]) => b - a)[0]?.[0];
    
    if (topCategoryId) {
        const topCategory = categories.find(c => c.id === parseInt(topCategoryId));
        document.getElementById('top-category').textContent = topCategory ? topCategory.name : '-';
    } else {
        document.getElementById('top-category').textContent = '-';
    }
    
    // Ortalama günlük harcama
    const daysInMonth = new Date(currentStatsYear, currentStatsMonth + 1, 0).getDate();
    const avgDailySpend = stats.totalExpenses / daysInMonth;
    document.getElementById('avg-daily-spend').textContent = formatCurrency(avgDailySpend);
    
    // En yüksek tek işlem
    const maxTransaction = Math.max(...transactions
        .filter(t => {
            const transactionDate = new Date(t.date);
            return transactionDate.getFullYear() === currentStatsYear && 
                   transactionDate.getMonth() === currentStatsMonth;
        })
        .map(t => t.amount), 0);
    
    document.getElementById('highest-transaction').textContent = formatCurrency(maxTransaction);
}

// Welcome Screen Functions
let isWelcomeShown = false;

function startApp() {
    console.log('Uygulama başlatılıyor...');
    
    // Dil sistemini başlat
    changeLanguage(localStorage.getItem('appLanguage') || 'tr');
    
    const welcomeScreen = document.getElementById('welcome-screen');
    const app = document.getElementById('app');
    
    if (welcomeScreen) {
        welcomeScreen.classList.remove('active');
    }
    
    setTimeout(() => {
        if (app) {
            app.style.display = 'block';
            welcomeScreen.style.display = 'none';
        }
        
        isWelcomeShown = true;
        console.log('Ana uygulama açıldı');
        
        // Event listener'ları tekrar kur (güvenlik için)
        setupEventListeners();
        console.log('Event listeners yeniden kuruldu');
        
        // Home tab'ını aktifleştir
        switchTab('home');
        console.log('Home tab aktifleştirildi');
        
    }, 500);
}

function showPremiumModal() {
    const modal = document.getElementById('premium-modal');
    modal.style.display = 'flex';
}

function closePremiumModal() {
    const modal = document.getElementById('premium-modal');
    modal.style.display = 'none';
}

function upgradeToPremium() {
    alert('🎉 Premium aboneliğiniz etkinleştirildi!\n\n✅ Tüm premium özellikler artık kullanılabilir.');
    
    // Premium özellikleri aktifleştir
    localStorage.setItem('isPremium', 'true');
    
    closePremiumModal();
    
    // Premium butonunu güncelle
    const upgradeBtn = document.getElementById('upgrade-btn');
    if (upgradeBtn) {
        upgradeBtn.textContent = '✅ Premium Aktif';
        upgradeBtn.disabled = true;
        upgradeBtn.style.background = '#10b981';
    }
    
    // İstatistikleri yenile
    updateStatistics();
}

// Export Functions
function showExportModal() {
    const modal = document.getElementById('export-modal');
    modal.style.display = 'flex';
}

function closeExportModal() {
    const modal = document.getElementById('export-modal');
    modal.style.display = 'none';
}

function exportToPDF() {
    console.log('PDF dışa aktarımı başlatılıyor...');
    
    // PDF içeriği oluştur
    const reportContent = generatePDFContent();
    
    // Tarayıcı yazdırma penceresini aç
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Harcama Takipçisi - PDF Raporu</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .title { font-size: 24px; font-weight: bold; color: #6C63FF; }
                    .subtitle { color: #666; margin: 5px 0; }
                    .section { margin: 25px 0; }
                    .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #333; }
                    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px; }
                    .stat-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; text-align: center; }
                    .stat-value { font-size: 18px; font-weight: bold; color: #6C63FF; }
                    .stat-label { color: #666; margin-top: 5px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f5f5f5; font-weight: bold; }
                    .pie-chart { text-align: center; margin: 20px 0; }
                    .pie-chart svg { max-width: 400px; height: auto; }
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                ${reportContent}
                <div style="margin-top: 50px; text-align: center; color: #999; font-size: 12px;">
                    <p>Bu rapor Harcama Takipçisi uygulaması ile oluşturulmuştur.</p>
                    <p>Oluşturulma Tarihi: ${new Date().toLocaleString('tr-TR')}</p>
                </div>
            </body>
        </html>
    `);
    
    printWindow.document.close();
    
    // Yazdırma penceresini hazırla
    setTimeout(() => {
        printWindow.print();
        showNotification('PDF raporu açıldı. "Farklı Kaydet" ile PDF olarak kaydedebilirsiniz!', 'info');
    }, 500);
}

function generatePDFContent() {
    const monthNames = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    
    const currentMonthName = monthNames[currentStatsMonth];
    
    const stats = calculateMonthlyStats(currentStatsYear, currentStatsMonth);
    
    const categorySpending = {};
    transactions.forEach(t => {
        if (t.type === 'expense') {
            const transactionDate = new Date(t.date);
            if (transactionDate.getFullYear() === currentStatsYear && 
                transactionDate.getMonth() === currentStatsMonth) {
                if (!categorySpending[t.categoryId]) {
                    categorySpending[t.categoryId] = 0;
                }
                categorySpending[t.categoryId] += t.amount;
            }
        }
    });
    
    return `
        <div class="header">
            <div class="title">💰 Harcama Takipçisi</div>
            <div class="subtitle">${currentMonthName} ${currentStatsYear} Raporu</div>
            <div class="subtitle">Oluşturulma: ${new Date().toLocaleString('tr-TR')}</div>
        </div>
        
        <div class="section">
            <div class="section-title">📊 Özet İstatistikler</div>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${formatCurrency(stats.totalIncome)}</div>
                    <div class="stat-label">Toplam Gelir</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${formatCurrency(stats.totalExpenses)}</div>
                    <div class="stat-label">Toplam Harcama</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${formatCurrency(stats.netBalance)}</div>
                    <div class="stat-label">Net Bakiye</div>
                </div>
            </div>
        </div>
        
        <div class="section">
            <div class="section-title">📈 Kategori Dağılımı</div>
            <table>
                <thead>
                    <tr>
                        <th>Kategori</th>
                        <th>Tutar</th>
                        <th>Yüzde</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(categorySpending)
                        .sort(([,a], [,b]) => b - a)
                        .map(([categoryId, amount]) => {
                            const category = categories.find(c => c.id === parseInt(categoryId));
                            const percentage = stats.totalExpenses > 0 ? ((amount / stats.totalExpenses) * 100).toFixed(1) : '0';
                            return `
                                <tr>
                                    <td>${category ? category.icon + ' ' + category.name : 'Bilinmeyen'}</td>
                                    <td>${formatCurrency(amount)}</td>
                                    <td>%${percentage}</td>
                                </tr>
                            `;
                        }).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="section">
            <div class="section-title">📋 Son İşlemler</div>
            <table>
                <thead>
                    <tr>
                        <th>Tarih</th>
                        <th>Tür</th>
                        <th>Kategori</th>
                        <th>Tutar</th>
                        <th>Açıklama</th>
                    </tr>
                </thead>
                <tbody>
                    ${transactions
                        .slice(0, 20)
                        .map(t => {
                            const category = categories.find(c => c.id === t.categoryId);
                            const date = new Date(t.date).toLocaleDateString('tr-TR');
                            return `
                                <tr>
                                    <td class="date">${date}</td>
                                    <td>${t.type === 'income' ? 'Gelir' : 'Harcama'}</td>
                                    <td>${category ? category.name : 'Bilinmeyen'}</td>
                                    <td>${formatCurrency(t.amount)}</td>
                                    <td>${t.description || '-'}</td>
                                </tr>
                            `;
                        }).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="footer">
            <p>Rapor Harcama Takipçisi tarafından otomatik oluşturulmuştur.</p>
            <p>© 2025 MiniMax Agent - Tüm hakları saklıdır.</p>
        </div>
    `;
}

function exportToExcel() {
    console.log('Excel dışa aktarımı başlatılıyor...');
    
    if (!localStorage.getItem('isPremium')) {
        alert('⚠️ Excel dışa aktarma özelliği Premium aboneliğe dahildir.\n\nPremium aboneliğinizi etkinleştirmek için "Premium Özellikleri Gör" butonuna tıklayın.');
        return;
    }
    
    // CSV formatında veri oluştur
    let csvContent = 'data:text/csv;charset=utf-8,';
    
    // Başlık satırı
    csvContent += 'Tarih,Tür,Kategori,Tutar,Açıklama,Ay\n';
    
    // Veri satırları
    transactions.forEach(transaction => {
        const category = categories.find(c => c.id === transaction.categoryId);
        const date = new Date(transaction.date).toLocaleDateString('tr-TR');
        const type = transaction.type === 'income' ? 'Gelir' : 'Harcama';
        const categoryName = category ? category.name : 'Bilinmeyen';
        const month = new Date(transaction.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' });
        
        csvContent += `"${date}","${type}","${categoryName}","${transaction.amount}","${transaction.description || ''}","${month}"\n`;
    });
    
    // Dosyayı indir
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `harcama-takipci-excel-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('✅ Excel dosyanız başarıyla indirildi!\n\n📊 Not: CSV formatı Excel, Google Sheets ve diğer tabloları açabilirsiniz.');
    closeExportModal();
}

function exportToJSON() {
    console.log('JSON dışa aktarımı başlatılıyor...');
    
    const exportData = {
        metadata: {
            version: '1.0.0',
            exportDate: new Date().toISOString(),
            application: 'Harcama Takipçisi',
            developer: 'MiniMax Agent'
        },
        statistics: {
            totalTransactions: transactions.length,
            totalCategories: categories.length,
            totalIncome: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
            totalExpenses: transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
            currentBalance: transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0) - 
                           transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
        },
        categories: categories,
        transactions: transactions,
        monthlyAnalysis: generateMonthlyAnalysis()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `harcama-takipci-tam-yedek-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    alert('✅ JSON yedek dosyanız başarıyla indirildi!\n\n💾 Bu dosya tüm verilerinizi ve analizleri içerir.');
    closeExportModal();
}

function checkPremiumStatus() {
    const isPremium = localStorage.getItem('isPremium') === 'true';
    
    console.log('Premium durumu kontrol ediliyor:', isPremium ? 'Premium Aktif' : 'Ücretsiz');
    
    if (isPremium) {
        // Premium butonunu güncelle
        const upgradeBtn = document.getElementById('upgrade-btn');
        if (upgradeBtn) {
            upgradeBtn.textContent = '✅ Premium Aktif';
            upgradeBtn.disabled = true;
            upgradeBtn.style.background = '#10b981';
        }
    }
}

function generateMonthlyAnalysis() {
    const monthlyData = {};
    
    transactions.forEach(t => {
        const year = new Date(t.date).getFullYear();
        const month = new Date(t.date).getMonth();
        const key = `${year}-${String(month + 1).padStart(2, '0')}`;
        
        if (!monthlyData[key]) {
            monthlyData[key] = { income: 0, expenses: 0, transactions: 0 };
        }
        
        if (t.type === 'income') {
            monthlyData[key].income += t.amount;
        } else {
            monthlyData[key].expenses += t.amount;
        }
        monthlyData[key].transactions++;
    });
    
    return monthlyData;
}

// Pie Chart Functions
function createPieChart(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return;
    
    let currentAngle = 0;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'pie-chart');
    svg.setAttribute('viewBox', '0 0 200 200');
    
    data.forEach((item, index) => {
        const percentage = (item.value / total) * 100;
        const angle = (item.value / total) * 360;
        
        const startAngle = currentAngle;
        const endAngle = currentAngle + angle;
        
        const path = createPieSlice(100, 100, 80, startAngle, endAngle, item.color);
        svg.appendChild(path);
        
        currentAngle += angle;
    });
    
    container.innerHTML = '';
    container.appendChild(svg);
    
    // Legend oluştur
    createPieLegend(data, containerId + '-legend');
}

function createPieSlice(cx, cy, radius, startAngle, endAngle, color) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const startAngleRad = (startAngle - 90) * Math.PI / 180;
    const endAngleRad = (endAngle - 90) * Math.PI / 180;
    
    const x1 = cx + radius * Math.cos(startAngleRad);
    const y1 = cy + radius * Math.sin(startAngleRad);
    const x2 = cx + radius * Math.cos(endAngleRad);
    const y2 = cy + radius * Math.sin(endAngleRad);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    
    path.setAttribute('d', d);
    path.setAttribute('fill', color);
    path.setAttribute('stroke', '#fff');
    path.setAttribute('stroke-width', '2');
    
    return path;
}

function createPieLegend(data, legendId) {
    const legend = document.getElementById(legendId);
    if (!legend) return;
    
    legend.innerHTML = '';
    
    data.forEach(item => {
        const legendItem = document.createElement('div');
        legendItem.className = 'pie-legend-item';
        legendItem.innerHTML = `
            <div class="pie-legend-color" style="background: ${item.color};"></div>
            <span>${item.label} (${item.value.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })})</span>
        `;
        legend.appendChild(legendItem);
    });
}

// Categories Functions
function updateCategoriesDisplay() {
    console.log('Kategoriler ekranı güncelleniyor...');
    
    const categoriesList = document.getElementById('categories-list');
    if (!categoriesList) return;
    
    // Kullanılan kategorileri hesapla
    const usedCategories = new Set(transactions.map(t => t.categoryId));
    
    // İstatistikleri güncelle
    document.getElementById('total-categories-display').textContent = categories.length;
    document.getElementById('used-categories-display').textContent = usedCategories.size;
    
    // Kategori listesini oluştur
    categoriesList.innerHTML = '';
    
    categories.forEach(category => {
        const isUsed = usedCategories.has(category.id);
        const usageCount = transactions.filter(t => t.categoryId === category.id).length;
        
        const item = document.createElement('div');
        item.className = `category-item ${isUsed ? 'used' : 'unused'}`;
        item.style.setProperty('--category-bg', `${category.color}20`);
        item.style.setProperty('--category-color', category.color);
        
        item.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <div class="category-name">${category.name}</div>
            <div class="category-usage">${usageCount} işlem</div>
        `;
        
        categoriesList.appendChild(item);
    });
}

function showAddCategoryModal() {
    alert('Yeni kategori ekleme özelliği yakında eklenecek!');
}

function showEditCategoriesModal() {
    alert('Kategori düzenleme özelliği yakında eklenecek!');
}

// Profile Functions
function updateProfileDisplay() {
    console.log('Profil ekranı güncelleniyor...');
    
    // Kullanım süresi hesapla (ilk işlemden bugüne)
    if (transactions.length > 0) {
        const firstTransactionDate = new Date(Math.min(...transactions.map(t => new Date(t.date).getTime())));
        const today = new Date();
        const diffTime = Math.abs(today - firstTransactionDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        document.getElementById('usage-days').textContent = `${diffDays} Gün`;
    } else {
        document.getElementById('usage-days').textContent = '0 Gün';
    }
    
    // Veri boyutu hesapla
    const dataSize = JSON.stringify({ transactions, categories }).length;
    const sizeInKB = (dataSize / 1024).toFixed(2);
    document.getElementById('data-size').textContent = `${sizeInKB} KB`;
}

function exportData() {
    console.log('Veri dışa aktarımı başlatılıyor...');
    showExportModal();
}

function importData() {
    console.log('Veriler içe aktarılıyor...');
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.transactions && data.categories) {
                    if (confirm('Mevcut veriler silinecek ve yeni veriler yüklenecek. Devam etmek istiyor musunuz?')) {
                        transactions = data.transactions;
                        categories = data.categories;
                        saveData();
                        updateUI();
                        updateStatistics();
                        alert('Verileriniz başarıyla içe aktarıldı!');
                    }
                } else {
                    alert('Geçersiz dosya formatı!');
                }
            } catch (error) {
                console.error('Dosya okuma hatası:', error);
                alert('Dosya okunurken hata oluştu!');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

function clearAllData() {
    console.log('Tüm veriler temizleniyor...');
    
    if (confirm('Tüm verileriniz silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?')) {
        if (confirm('Son kontrol: Tüm işlemler ve kategoriler silinecek. Emin misiniz?')) {
            transactions = [];
            categories = [
                { id: 1, name: 'Yemek', icon: '🍽️', color: '#ef4444', type: 'expense' },
                { id: 2, name: 'Ulaşım', icon: '🚌', color: '#3b82f6', type: 'expense' },
                { id: 3, name: 'Alışveriş', icon: '🛍️', color: '#8b5cf6', type: 'expense' },
                { id: 4, name: 'Sağlık', icon: '🏥', color: '#10b981', type: 'expense' },
                { id: 5, name: 'Eğitim', icon: '📚', color: '#f59e0b', type: 'expense' },
                { id: 6, name: 'Eğlence', icon: '🎮', color: '#ec4899', type: 'expense' },
                { id: 7, name: 'Ev', icon: '🏠', color: '#6b7280', type: 'expense' },
                { id: 8, name: 'Elektrik', icon: '💡', color: '#eab308', type: 'expense' },
                { id: 9, name: 'Su', icon: '🚰', color: '#06b6d4', type: 'expense' },
                { id: 10, name: 'İnternet', icon: '📶', color: '#6366f1', type: 'expense' },
                { id: 11, name: 'Telefon', icon: '📱', color: '#84cc16', type: 'expense' },
                { id: 12, name: 'Giyim', icon: '👕', color: '#f97316', type: 'expense' },
                { id: 13, name: 'Hediye', icon: '🎁', color: '#a855f7', type: 'expense' },
                { id: 14, name: 'Maaş', icon: '💰', color: '#22c55e', type: 'income' }
            ];
            saveData();
            updateUI();
            updateStatistics();
            updateCategoriesDisplay();
            updateProfileDisplay();
            alert('Tüm veriler temizlendi ve uygulama sıfırlandı!');
        }
    }
}

function saveData() {
    try {
        // LocalStorage'a tüm veriyi kaydet
        localStorage.setItem('transactions', JSON.stringify(transactions));
        localStorage.setItem('categories', JSON.stringify(categories));
        localStorage.setItem('budgets', JSON.stringify(budgets));
        localStorage.setItem('goals', JSON.stringify(goals));
        localStorage.setItem('recurringTransactions', JSON.stringify(recurringTransactions));
        localStorage.setItem('accounts', JSON.stringify(accounts));
        localStorage.setItem('receipts', JSON.stringify(receipts));
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
        localStorage.setItem('currentAccount', currentAccount);
        
        console.log('Tüm veriler LocalStorage\'a kaydedildi');
    } catch (e) {
        try {
            // SessionStorage'a fallback
            sessionStorage.setItem('transactions', JSON.stringify(transactions));
            sessionStorage.setItem('categories', JSON.stringify(categories));
            sessionStorage.setItem('budgets', JSON.stringify(budgets));
            sessionStorage.setItem('goals', JSON.stringify(goals));
            sessionStorage.setItem('accounts', JSON.stringify(accounts));
            sessionStorage.setItem('userPreferences', JSON.stringify(userPreferences));
            console.warn('Veri SessionStorage\'a kaydedildi (geçici)');
        } catch (e2) {
            // Son çare - memory'de tut
            window._transactions = transactions;
            window._categories = categories;
            window._budgets = budgets;
            window._goals = goals;
            console.warn('Veri saklama sınırlı, sadece bu oturum için veri tutuluyor');
        }
    }
}

function initializeDefaultAccount() {
    // Varsayılan hesap oluştur
    const defaultAccount = {
        id: 'acc_' + Date.now(),
        name: 'Genel Cüzdan',
        type: 'cash',
        balance: 0,
        color: '#6C63FF',
        icon: '💳'
    };
    
    accounts.push(defaultAccount);
    currentAccount = defaultAccount.id;
    
    // İlk kurulum için hoşgeldin hoşgörüsü
    if (!localStorage.getItem('hasCompletedOnboarding')) {
        showNotification('Hoş geldiniz! İlk hesabınız oluşturuldu.', 'info');
        localStorage.setItem('hasCompletedOnboarding', 'true');
    }
    
    saveData();
}

function initializeApp() {
    try {
        console.log('App başlatılıyor...');
        
        // Dil sistemini başlat
        changeLanguage(localStorage.getItem('appLanguage') || 'tr');
        
        // Premium durumunu kontrol et
        checkPremiumStatus();
        
        // Ana uygulama başlatılırken giriş ekranını göster
        if (!isWelcomeShown) {
            console.log('Welcome screen gösteriliyor...');
            const welcomeScreen = document.getElementById('welcome-screen');
            const app = document.getElementById('app');
            
            if (welcomeScreen && app) {
                welcomeScreen.classList.add('active');
                app.style.display = 'none';
            }
            // ERKEN DÖNÜŞ KALDIRILDI - Event listener'lar kurulsun
        }
        
        // Normal uygulama başlatma - Her zaman çalışsın
        updateCurrentDate();
        console.log('Tarih güncellendi');
        
        // Event Listeners'ları kur
        setupEventListeners();
        console.log('Event listeners kuruldu');
        
        // Default tab'ı aktifleştir (welcome screen gizliyse)
        if (isWelcomeShown) {
            switchTab('home');
            console.log('Home tab aktifleştirildi');
        }
        
        // Bildirim izni iste
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    showNotification('Bildirimler etkinleştirildi!', 'success');
                }
            });
        }
        
        updateUI();
        console.log('UI güncellendi');
        
        updateStatistics();
        console.log('İstatistikler başlatıldı');
        
        updateMonthNavigationButtons();
        updateCategoriesDisplay();
        console.log('Kategoriler ekranı başlatıldı');
        
        updateProfileDisplay();
        console.log('Profil ekranı başlatıldı');
        
        console.log('Uygulama başarıyla başlatıldı!');
        
        renderTransactions();
        console.log('Transactions render edildi');
        
        renderCategories();
        console.log('Categories render edildi');
        
        renderProfile();
        console.log('Profile render edildi');
        
        updateMonthNavigationButtons();
        
        // Yeni özellikleri başlat
        updateBudgetDisplay();
        updateGoalsDisplay();
        updateAccountsDisplay();
        updateRecurringDisplay();
        
        console.log('App başarıyla başlatıldı');
    } catch (error) {
        console.error('initializeApp hatası:', error);
    }
}

// THEME MANAGEMENT
function applyTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
    userPreferences.theme = theme;
    saveData();
    console.log(`${theme} teması uygulandı`);
}

function toggleTheme() {
    const newTheme = userPreferences.theme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    showNotification(`${newTheme === 'dark' ? 'Koyu' : 'Açık'} tema aktifleştirildi`, 'info');
}

function updateThemeButton() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i') || themeToggle.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = userPreferences.theme === 'dark' ? '☀️' : '🌙';
        }
    }
}

// BUDGET MANAGEMENT
function addBudget(budgetData) {
    const budget = {
        id: 'budget_' + Date.now(),
        categoryId: budgetData.categoryId,
        amount: budgetData.amount,
        period: budgetData.period || 'monthly', // monthly, weekly, yearly
        startDate: budgetData.startDate || new Date().toISOString().split('T')[0],
        alerts: budgetData.alerts || { enabled: true, threshold: 80 }, // %80'de uyarı
        createdAt: new Date().toISOString()
    };
    
    budgets.push(budget);
    saveData();
    showNotification('Bütçe başarıyla eklendi!', 'success');
    updateBudgetDisplay();
    return budget;
}

function updateBudget(budgetId, updates) {
    const index = budgets.findIndex(b => b.id === budgetId);
    if (index !== -1) {
        budgets[index] = { ...budgets[index], ...updates };
        saveData();
        showNotification('Bütçe güncellendi', 'success');
        updateBudgetDisplay();
    }
}

function deleteBudget(budgetId) {
    const index = budgets.findIndex(b => b.id === budgetId);
    if (index !== -1) {
        budgets.splice(index, 1);
        saveData();
        showNotification('Bütçe silindi', 'info');
        updateBudgetDisplay();
    }
}

function calculateBudgetStatus(budget) {
    const now = new Date();
    const currentPeriodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentPeriodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    // Bu dönemdeki harcama hesapla
    const spentInPeriod = transactions
        .filter(t => {
            const tDate = new Date(t.date);
            const isInPeriod = tDate >= currentPeriodStart && tDate <= currentPeriodEnd;
            const isCorrectCategory = t.categoryId === budget.categoryId;
            const isExpense = t.type === 'expense';
            return isInPeriod && isCorrectCategory && isExpense;
        })
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    
    const percentage = (spentInPeriod / budget.amount) * 100;
    const remaining = budget.amount - spentInPeriod;
    
    return {
        spent: spentInPeriod,
        remaining: Math.max(0, remaining),
        percentage: Math.min(100, percentage),
        status: percentage >= 100 ? 'over' : percentage >= budget.alerts.threshold ? 'warning' : 'good'
    };
}

function checkBudgetAlerts() {
    budgets.forEach(budget => {
        if (!budget.alerts.enabled) return;
        
        const status = calculateBudgetStatus(budget);
        const categoryName = categories.find(c => c.id === budget.categoryId)?.name || 'Kategori';
        
        if (status.status === 'warning' && !budget._warningShown) {
            showNotification(`⚠️ ${categoryName} bütçenizin %${budget.alerts.threshold}'ine ulaştınız!`, 'warning');
            budget._warningShown = true;
        } else if (status.status === 'over' && !budget._overShown) {
            showNotification(`🚨 ${categoryName} bütçenizi aştınız!`, 'error');
            budget._overShown = true;
        }
    });
}

// GOALS MANAGEMENT
function addGoal(goalData) {
    const goal = {
        id: 'goal_' + Date.now(),
        name: goalData.name,
        targetAmount: goalData.targetAmount,
        currentAmount: goalData.currentAmount || 0,
        deadline: goalData.deadline,
        category: goalData.category || 'general',
        color: goalData.color || '#6C63FF',
        icon: goalData.icon || '🎯',
        priority: goalData.priority || 'medium', // low, medium, high
        createdAt: new Date().toISOString(),
        milestones: [] // Hedef için araçlar
    };
    
    goals.push(goal);
    saveData();
    showNotification('Hedef başarıyla oluşturuldu!', 'success');
    updateGoalsDisplay();
    return goal;
}

function updateGoal(goalId, updates) {
    const index = goals.findIndex(g => g.id === goalId);
    if (index !== -1) {
        goals[index] = { ...goals[index], ...updates };
        saveData();
        showNotification('Hedef güncellendi', 'success');
        updateGoalsDisplay();
    }
}

function deleteGoal(goalId) {
    const index = goals.findIndex(g => g.id === goalId);
    if (index !== -1) {
        goals.splice(index, 1);
        saveData();
        showNotification('Hedef silindi', 'info');
        updateGoalsDisplay();
    }
}

function calculateGoalProgress(goal) {
    const percentage = (goal.currentAmount / goal.targetAmount) * 100;
    const remaining = goal.targetAmount - goal.currentAmount;
    
    // Deadline kontrolü
    const deadline = new Date(goal.deadline);
    const now = new Date();
    const daysRemaining = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
    
    return {
        percentage: Math.min(100, percentage),
        remaining: Math.max(0, remaining),
        daysRemaining: daysRemaining,
        isOverdue: daysRemaining < 0,
        status: percentage >= 100 ? 'completed' : daysRemaining < 0 ? 'overdue' : 'active'
    };
}

// RECURRING TRANSACTIONS
function addRecurringTransaction(recurringData) {
    const recurring = {
        id: 'recurring_' + Date.now(),
        type: recurringData.type,
        categoryId: recurringData.categoryId,
        amount: recurringData.amount,
        description: recurringData.description,
        frequency: recurringData.frequency, // daily, weekly, monthly, yearly
        interval: recurringData.interval || 1, // 1 haftalık, 2 aylık vb.
        nextDate: recurringData.nextDate,
        isActive: true,
        autoExecute: recurringData.autoExecute || false,
        createdAt: new Date().toISOString()
    };
    
    recurringTransactions.push(recurring);
    saveData();
    showNotification('Tekrarlayan işlem oluşturuldu!', 'success');
    updateRecurringDisplay();
    return recurring;
}

function updateRecurringTransaction(id, updates) {
    const index = recurringTransactions.findIndex(r => r.id === id);
    if (index !== -1) {
        recurringTransactions[index] = { ...recurringTransactions[index], ...updates };
        saveData();
        showNotification('Tekrarlayan işlem güncellendi', 'success');
        updateRecurringDisplay();
    }
}

function deleteRecurringTransaction(id) {
    const index = recurringTransactions.findIndex(r => r.id === id);
    if (index !== -1) {
        recurringTransactions.splice(index, 1);
        saveData();
        showNotification('Tekrarlayan işlem silindi', 'info');
        updateRecurringDisplay();
    }
}

function checkRecurringTransactions() {
    const today = new Date().toISOString().split('T')[0];
    
    recurringTransactions.forEach(recurring => {
        if (!recurring.isActive) return;
        
        const nextDate = new Date(recurring.nextDate);
        const todayDate = new Date(today);
        
        if (nextDate <= todayDate) {
            // Tekrarlayan işlem tarihi geldi
            if (recurring.autoExecute) {
                // Otomatik çalıştır
                executeRecurringTransaction(recurring);
            } else {
                // Kullanıcıya bildir
                showNotification(
                    `🔄 "${recurring.description}" tekrarlayan işleminizi kontrol edin`,
                    'info',
                    () => showExecuteRecurringModal(recurring.id)
                );
            }
        }
    });
}

function executeRecurringTransaction(recurring) {
    const transaction = {
        id: 'txn_' + Date.now(),
        type: recurring.type,
        categoryId: recurring.categoryId,
        amount: recurring.amount,
        description: `${recurring.description} (Otomatik)`,
        date: new Date().toISOString().split('T')[0],
        accountId: currentAccount,
        isRecurring: true,
        recurringId: recurring.id,
        createdAt: new Date().toISOString()
    };
    
    transactions.push(transaction);
    
    // Bir sonraki tarihi hesapla
    const nextDate = calculateNextRecurringDate(recurring);
    recurring.nextDate = nextDate;
    
    saveData();
    showNotification('Tekrarlayan işlem otomatik eklendi!', 'success');
    
    // UI'ı güncelle
    renderTransactions();
    updateStatistics();
}

function calculateNextRecurringDate(recurring) {
    const nextDate = new Date(recurring.nextDate);
    
    switch (recurring.frequency) {
        case 'daily':
            nextDate.setDate(nextDate.getDate() + recurring.interval);
            break;
        case 'weekly':
            nextDate.setDate(nextDate.getDate() + (7 * recurring.interval));
            break;
        case 'monthly':
            nextDate.setMonth(nextDate.getMonth() + recurring.interval);
            break;
        case 'yearly':
            nextDate.setFullYear(nextDate.getFullYear() + recurring.interval);
            break;
    }
    
    return nextDate.toISOString().split('T')[0];
}

// NOTIFICATION SYSTEM
function showNotification(message, type = 'info', actionCallback = null) {
    const notification = {
        id: 'notif_' + Date.now(),
        message: t(message) || message, // Çeviri sistemi kullan
        type, // info, success, warning, error
        actionCallback,
        timestamp: new Date().toISOString(),
        read: false
    };
    
    notifications.push(notification);
    
    // Browser notification gönder
    if (userPreferences.notifications && 'Notification' in window) {
        if (Notification.permission === 'granted') {
            new Notification('Harcama Takipçisi', {
                body: message,
                icon: '/assets/icon-192.png'
            });
        }
    }
    
    // UI'da göster
    displayNotification(notification);
    
    // 5 saniye sonra otomatik kaldır
    setTimeout(() => {
        removeNotification(notification.id);
    }, 5000);
}

function displayNotification(notification) {
    const notificationContainer = getOrCreateNotificationContainer();
    
    const notificationEl = document.createElement('div');
    notificationEl.className = `notification notification-${notification.type}`;
    notificationEl.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${notification.message}</span>
            ${notification.actionCallback ? '<button class="notification-action">Görüntüle</button>' : ''}
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Action callback
    const actionBtn = notificationEl.querySelector('.notification-action');
    if (actionBtn && notification.actionCallback) {
        actionBtn.addEventListener('click', notification.actionCallback);
    }
    
    // Close button
    const closeBtn = notificationEl.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification.id));
    
    notificationContainer.appendChild(notificationEl);
    
    // Animasyon için kısa gecikme
    setTimeout(() => {
        notificationEl.classList.add('show');
    }, 10);
}

function removeNotification(notificationId) {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        const notificationEl = document.querySelector(`[data-notification-id="${notificationId}"]`);
        if (notificationEl) {
            notificationEl.classList.remove('show');
            setTimeout(() => {
                if (notificationEl.parentNode) {
                    notificationEl.parentNode.removeChild(notificationEl);
                }
            }, 300);
        }
    }
}

function getOrCreateNotificationContainer() {
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    return container;
}

// Periodically check for alerts
setInterval(() => {
    checkBudgetAlerts();
    checkRecurringTransactions();
}, 60000); // Her dakika kontrol et

// Render Functions
function renderTransactions() {
    const container = document.getElementById('recent-transactions');
    if (!container) return;
    
    if (transactions.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">📝</span>
                <p class="empty-text">Henüz işlem yok</p>
                <p class="empty-subtext">İlk işleminizi eklemek için + butonuna tıklayın</p>
            </div>
        `;
        return;
    }
    
    const recentTransactions = transactions.slice(0, 5);
    
    container.innerHTML = recentTransactions.map(transaction => {
        const category = categories.find(c => c.id === transaction.categoryId);
        const date = new Date(transaction.date).toLocaleDateString('tr-TR');
        
        return `
            <div class="transaction-item ${transaction.type}">
                <div class="transaction-icon" style="background: ${category ? category.color + '20' : '#f3f4f6'}; color: ${category ? category.color : '#6b7280'};">
                    ${category ? category.icon : '💰'}
                </div>
                <div class="transaction-info">
                    <div class="transaction-main">
                        <span class="transaction-category">${category ? category.name : 'Bilinmeyen'}</span>
                        <span class="transaction-amount ${transaction.type}">${formatCurrency(transaction.amount)}</span>
                    </div>
                    <div class="transaction-details">
                        <span class="transaction-date">${date}</span>
                        ${transaction.description ? `<span class="transaction-description">${transaction.description}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderCategories() {
    const container = document.getElementById('categories-list');
    if (!container) return;
    
    updateCategoriesDisplay();
}

function renderProfile() {
    const container = document.getElementById('profile-content');
    if (!container) return;
    
    updateProfileDisplay();
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    try {
        // Navigation - Düzgün tab switching için debug ile
        const navItems = document.querySelectorAll('.nav-item');
        console.log('Found nav items:', navItems.length);
        
        navItems.forEach((item, index) => {
            console.log(`Setting up nav item ${index}:`, item.dataset.tab);
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const tab = item.dataset.tab;
                console.log('Navigation clicked:', tab);
                switchTab(tab);
            });
        });
        
        // Transaction Form
        const form = document.getElementById('transaction-form');
        if (form) {
            console.log('Form found, adding submit listener');
            form.addEventListener('submit', handleTransactionSubmit);
        } else {
            console.error('transaction-form element bulunamadı!');
        }
        
        // Transaction Type Toggle
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                console.log('Type button clicked:', type);
                setTransactionType(type);
            });
        });
        
        // Budget form
        const budgetForm = document.getElementById('budget-form');
        if (budgetForm) {
            budgetForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                addBudget({
                    categoryId: formData.get('budget-category') || document.getElementById('budget-category').value,
                    amount: parseFloat(document.getElementById('budget-amount').value),
                    period: document.getElementById('budget-period').value,
                    alerts: {
                        enabled: true,
                        threshold: parseInt(document.getElementById('budget-alert').value)
                    }
                });
                closeBudgetModal();
            });
        }
        
        // Goal form
        const goalForm = document.getElementById('goal-form');
        if (goalForm) {
            goalForm.addEventListener('submit', function(e) {
                e.preventDefault();
                addGoal({
                    name: document.getElementById('goal-name').value,
                    targetAmount: parseFloat(document.getElementById('goal-target').value),
                    currentAmount: parseFloat(document.getElementById('goal-current').value) || 0,
                    deadline: document.getElementById('goal-deadline').value,
                    priority: document.getElementById('goal-priority').value
                });
                closeGoalModal();
            });
        }
        
        // Account form
        const accountForm = document.getElementById('account-form');
        if (accountForm) {
            accountForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const editingId = this.dataset.editing;
                const accountData = {
                    name: document.getElementById('account-name').value,
                    type: document.getElementById('account-type').value,
                    balance: parseFloat(document.getElementById('account-balance').value) || 0
                };
                
                // Set default icon and color based on type
                const icons = {
                    cash: '💵',
                    bank: '🏦',
                    credit: '💳',
                    savings: '🐷',
                    investment: '📈'
                };
                accountData.icon = icons[accountData.type] || '💳';
                accountData.color = '#6C63FF';
                
                if (editingId) {
                    // Update existing account
                    const accountIndex = accounts.findIndex(a => a.id === editingId);
                    if (accountIndex !== -1) {
                        accounts[accountIndex] = {
                            ...accounts[accountIndex],
                            ...accountData
                        };
                        showNotification('Hesap başarıyla güncellendi!', 'success');
                    }
                } else {
                    // Create new account
                    accounts.push({
                        id: 'acc_' + Date.now(),
                        ...accountData
                    });
                    showNotification('Hesap başarıyla oluşturuldu!', 'success');
                }
                
                saveData();
                updateAccountsDisplay();
                closeAccountModal();
            });
        }
        
        // Recurring form
        const recurringForm = document.getElementById('recurring-form');
        if (recurringForm) {
            recurringForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const typeBtn = document.querySelector('.type-btn.active');
                addRecurringTransaction({
                    type: typeBtn ? typeBtn.dataset.type : 'expense',
                    categoryId: document.getElementById('recurring-category').value,
                    amount: parseFloat(document.getElementById('recurring-amount').value),
                    description: document.getElementById('recurring-description').value,
                    frequency: document.getElementById('recurring-frequency').value,
                    interval: parseInt(document.getElementById('recurring-interval').value) || 1,
                    nextDate: document.getElementById('recurring-next-date').value,
                    autoExecute: document.getElementById('recurring-auto').checked
                });
                closeRecurringModal();
            });
        }
        
        // Type toggle for recurring modal (additional)
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeTransactionModal();
            }
        });
        
        console.log('Event listeners başarıyla kuruldu');
    } catch (error) {
        console.error('setupEventListeners hatası:', error);
    }
}

function updateCurrentDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}

function switchTab(tabName) {
    console.log('=== SWITCH TAB BAŞLADI ===', tabName);
    
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNav = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeNav) {
        activeNav.classList.add('active');
        console.log('Active nav item set:', tabName);
    } else {
        console.error('Nav item not found for tab:', tabName);
    }
    
    // Update content
    const contentItems = document.querySelectorAll('.tab-content');
    contentItems.forEach(content => {
        content.classList.remove('active');
    });
    
    const activeContent = document.getElementById(`${tabName}-content`);
    if (activeContent) {
        activeContent.classList.add('active');
        console.log('Active content set:', tabName + '-content');
    } else {
        console.error('Content not found for tab:', tabName + '-content');
    }
    
    // Hide FAB on non-home tabs
    const fab = document.getElementById('fab');
    if (fab) {
        if (tabName === 'home') {
            fab.style.display = 'block';
        } else {
            fab.style.display = 'none';
        }
    }
    
    // Update specific tab content
    try {
        if (tabName === 'stats') {
            updateStatistics();
        } else if (tabName === 'categories') {
            updateCategoriesDisplay();
        } else if (tabName === 'budgets') {
            updateBudgetDisplay();
        } else if (tabName === 'goals') {
            updateGoalsDisplay();
        } else if (tabName === 'accounts') {
            updateAccountsDisplay();
        } else if (tabName === 'recurring') {
            updateRecurringDisplay();
        } else if (tabName === 'profile') {
            updateProfileDisplay();
            updateThemeButton();
        }
        console.log('Tab content updated successfully');
    } catch (error) {
        console.error('Error updating tab content:', error);
    }
    
    console.log('=== SWITCH TAB TAMAMLANDI ===');
}

function updateUI() {
    const stats = calculateStats();
    
    document.getElementById('current-balance').textContent = formatCurrency(stats.balance);
    document.getElementById('current-income').textContent = formatCurrency(stats.currentMonthIncome);
    document.getElementById('current-expense').textContent = formatCurrency(stats.currentMonthExpense);
    document.getElementById('total-transactions').textContent = transactions.length;
    document.getElementById('total-categories').textContent = categories.length;
}

function calculateStats() {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    
    const currentMonthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === thisMonth && 
               transactionDate.getFullYear() === thisYear;
    });
    
    const currentMonthIncome = currentMonthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const currentMonthExpense = currentMonthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = currentMonthIncome - currentMonthExpense;
    
    return {
        balance,
        currentMonthIncome,
        currentMonthExpense
    };
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
        return 'Bugün';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Dün';
    } else {
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }
}

function renderTransactions() {
    const container = document.getElementById('recent-transactions');
    
    if (transactions.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📊</div>
                <h3>Henüz işlem yok</h3>
                <p>İlk harcama veya gelirinizi ekleyin</p>
            </div>
        `;
        return;
    }
    
    const recentTransactions = transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10);
    
    container.innerHTML = recentTransactions.map(transaction => {
        const category = categories.find(c => c.id === transaction.categoryId);
        
        return `
            <div class="transaction-item">
                <div class="transaction-info">
                    <div class="transaction-icon" style="background-color: ${category.color}20">
                        ${category.icon}
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-category">${category.name}</div>
                        <div class="transaction-meta">
                            <span class="transaction-date">${formatDate(transaction.date)}</span>
                            ${transaction.description ? `<span class="transaction-description">${transaction.description}</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="transaction-amount ${transaction.type}">
                    ${transaction.type === 'expense' ? '-' : '+'}${formatCurrency(transaction.amount)}
                </div>
            </div>
        `;
    }).join('');
}

function renderCategories() {
    const container = document.getElementById('categories-content');
    
    const expenseCategories = categories.filter(c => c.type === 'expense');
    const incomeCategories = categories.filter(c => c.type === 'income');
    
    container.innerHTML = `
        <div class="section">
            <h2 class="section-title">Harcama Kategorileri</h2>
            <div class="categories-grid">
                ${expenseCategories.map(category => `
                    <div class="category-item">
                        <div class="category-icon" style="background-color: ${category.color}20">
                            ${category.icon}
                        </div>
                        <span class="category-name">${category.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="section">
            <h2 class="section-title">Gelir Kategorileri</h2>
            <div class="categories-grid">
                ${incomeCategories.map(category => `
                    <div class="category-item">
                        <div class="category-icon" style="background-color: ${category.color}20">
                            ${category.icon}
                        </div>
                        <span class="category-name">${category.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderProfile() {
    const container = document.getElementById('profile-content');
    
    container.innerHTML = `
        <div class="section">
            <div class="profile-header">
                <div class="profile-avatar">💰</div>
                <h2 class="section-title">Harcama Takipçisi</h2>
                <p class="profile-subtitle">Bütçe yönetimi için en kolay uygulama</p>
            </div>
        </div>
        
        <div class="section">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-header">
                        <span class="stat-icon">📊</span>
                        <span class="stat-label">Bu Ay İşlem</span>
                    </div>
                    <p class="stat-value">${transactions.length}</p>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <span class="stat-icon">🏷️</span>
                        <span class="stat-label">Kategori</span>
                    </div>
                    <p class="stat-value">${categories.length}</p>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">Veri Yönetimi</h2>
            <div class="profile-actions">
                <button class="profile-action" onclick="exportData()">
                    <div class="action-icon download">📥</div>
                    <div class="action-content">
                        <div class="action-title">Verileri Dışa Aktar</div>
                        <div class="action-subtitle">JSON formatında yedekle</div>
                    </div>
                </button>
                
                <label class="profile-action">
                    <div class="action-icon upload">📤</div>
                    <div class="action-content">
                        <div class="action-title">Verileri İçe Aktar</div>
                        <div class="action-subtitle">Yedeği geri yükle</div>
                    </div>
                    <input type="file" accept=".json" onchange="importData(event)" style="display: none;">
                </label>
                
                <button class="profile-action" onclick="clearAllData()">
                    <div class="action-icon danger">🗑️</div>
                    <div class="action-content">
                        <div class="action-title">Tüm Verileri Sil</div>
                        <div class="action-subtitle">Sıfırdan başla</div>
                    </div>
                </button>
            </div>
        </div>
        
        <div class="section">
            <h2 class="section-title">Uygulama Bilgileri</h2>
            <div class="info-card">
                <div class="info-row">
                    <span class="info-label">Sürüm</span>
                    <span class="info-value">v1.0.0</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Platform</span>
                    <span class="info-value">PWA</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Son Güncelleme</span>
                    <span class="info-value">Nov 2024</span>
                </div>
            </div>
        </div>
    `;
}

// RENDER FUNCTIONS FOR NEW FEATURES
function updateBudgetDisplay() {
    const container = document.getElementById('budgets-list');
    if (!container) return;
    
    if (budgets.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">💰</div>
                <h3>Henüz bütçe oluşturmadınız</h3>
                <p>Kategoriler için bütçe belirleyerek harcamalarınızı kontrol altında tutun</p>
                <button class="btn-primary" onclick="showAddBudgetModal()">İlk Bütçeni Oluştur</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = budgets.map(budget => {
        const category = categories.find(c => c.id === budget.categoryId);
        const status = calculateBudgetStatus(budget);
        
        return `
            <div class="budget-card">
                <div class="budget-header">
                    <div class="budget-category">
                        <div class="budget-category-icon" style="background-color: ${category?.color || '#6C63FF'}20">
                            ${category?.icon || '💰'}
                        </div>
                        <div>
                            <div class="budget-category-name">${category?.name || 'Kategori'}</div>
                            <div style="font-size: 0.75rem; color: #6b7280;">
                                ${budget.period === 'monthly' ? 'Aylık' : budget.period === 'weekly' ? 'Haftalık' : 'Yıllık'}
                            </div>
                        </div>
                    </div>
                    <div class="budget-amount">₺${budget.amount.toLocaleString('tr-TR')}</div>
                </div>
                
                <div class="budget-progress">
                    <div class="budget-progress-bar">
                        <div class="budget-progress-fill ${status.status}" style="width: ${status.percentage}%"></div>
                    </div>
                </div>
                
                <div class="budget-stats">
                    <span>Harcandı: ₺${status.spent.toLocaleString('tr-TR')}</span>
                    <span>Kalan: ₺${status.remaining.toLocaleString('tr-TR')}</span>
                    <span>${status.percentage.toFixed(1)}%</span>
                </div>
                
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                    <button class="btn-small btn-secondary" onclick="editBudget('${budget.id}')">Düzenle</button>
                    <button class="btn-small btn-danger" onclick="deleteBudget('${budget.id}')">Sil</button>
                </div>
            </div>
        `;
    }).join('');
}

function updateGoalsDisplay() {
    const container = document.getElementById('goals-list');
    if (!container) return;
    
    if (goals.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🎯</div>
                <h3>Henüz hedef oluşturmadınız</h3>
                <p>Tasarruf hedeflerinizi belirleyerek motivasyonunuzu artırın</p>
                <button class="btn-primary" onclick="showAddGoalModal()">İlk Hedefini Oluştur</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = goals.map(goal => {
        const progress = calculateGoalProgress(goal);
        const daysText = progress.daysRemaining > 0 ? `${progress.daysRemaining} gün kaldı` : 'Süre doldu';
        
        return `
            <div class="goal-card">
                <div class="goal-header">
                    <div class="goal-info">
                        <div class="goal-name">${goal.name}</div>
                        <span class="goal-priority ${goal.priority}">${goal.priority === 'high' ? 'Yüksek' : goal.priority === 'medium' ? 'Orta' : 'Düşük'}</span>
                    </div>
                    <div class="goal-amount" style="font-size: 1.25rem;">
                        ${goal.icon} ₺${goal.targetAmount.toLocaleString('tr-TR')}
                    </div>
                </div>
                
                <div class="goal-progress">
                    <div class="goal-progress-bar">
                        <div class="goal-progress-fill" style="width: ${progress.percentage}%"></div>
                    </div>
                </div>
                
                <div class="goal-stats">
                    <div class="goal-stat">
                        <span class="goal-stat-value">${progress.percentage.toFixed(1)}%</span>
                        <span class="goal-stat-label">Tamamlandı</span>
                    </div>
                    <div class="goal-stat">
                        <span class="goal-stat-value">₺${progress.remaining.toLocaleString('tr-TR')}</span>
                        <span class="goal-stat-label">Kalan</span>
                    </div>
                    <div class="goal-stat">
                        <span class="goal-stat-value">${daysText}</span>
                        <span class="goal-stat-label">Süre</span>
                    </div>
                </div>
                
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                    <button class="btn-small btn-primary" onclick="addToGoal('${goal.id}')">Ekle</button>
                    <button class="btn-small btn-secondary" onclick="editGoal('${goal.id}')">Düzenle</button>
                    <button class="btn-small btn-danger" onclick="deleteGoal('${goal.id}')">Sil</button>
                </div>
            </div>
        `;
    }).join('');
}

function updateAccountsDisplay() {
    const container = document.getElementById('accounts-list');
    if (!container) return;
    
    if (accounts.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🏦</div>
                <h3>Henüz hesap oluşturmadınız</h3>
                <p>Nakit, banka, kredi kartı gibi farklı hesaplar oluşturun</p>
                <button class="btn-primary" onclick="showAddAccountModal()">İlk Hesabını Oluştur</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = accounts.map(account => {
        const isActive = account.id === currentAccount;
        const balance = calculateAccountBalance(account.id);
        const typeText = account.type === 'cash' ? 'Nakit' : 
                        account.type === 'bank' ? 'Banka' :
                        account.type === 'credit' ? 'Kredi Kartı' :
                        account.type === 'savings' ? 'Tasarruf' : 'Yatırım';
        
        return `
            <div class="account-card ${isActive ? 'active' : ''}" onclick="selectAccount('${account.id}')">
                <div class="account-header">
                    <div class="account-info">
                        <div class="account-icon">${account.icon}</div>
                        <div>
                            <div class="account-name">${account.name}</div>
                            <div class="account-type">${typeText}</div>
                        </div>
                    </div>
                    <div class="account-balance" style="color: ${balance >= 0 ? '#10B981' : '#EF4444'}">
                        ₺${balance.toLocaleString('tr-TR')}
                    </div>
                </div>
                
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem; opacity: ${isActive ? '1' : '0.5'}">
                    ${isActive ? '<span style="color: #10B981; font-size: 0.75rem;">✓ Aktif Hesap</span>' : ''}
                    <button class="btn-small btn-secondary" onclick="event.stopPropagation(); editAccount('${account.id}')">Düzenle</button>
                    <button class="btn-small btn-danger" onclick="event.stopPropagation(); deleteAccount('${account.id}')">Sil</button>
                </div>
            </div>
        `;
    }).join('');
}

function updateRecurringDisplay() {
    const container = document.getElementById('recurring-list');
    if (!container) return;
    
    if (recurringTransactions.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔄</div>
                <h3>Henüz tekrarlayan işlem oluşturmadınız</h3>
                <p>Kira, maaş gibi düzenli işlemleri otomatik hale getirin</p>
                <button class="btn-primary" onclick="showAddRecurringModal()">İlk Tekrarlayanını Oluştur</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = recurringTransactions.map(recurring => {
        const category = categories.find(c => c.id === recurring.categoryId);
        const nextDate = new Date(recurring.nextDate);
        const frequencyText = recurring.frequency === 'daily' ? 'Günlük' : 
                             recurring.frequency === 'weekly' ? 'Haftalık' : 
                             recurring.frequency === 'monthly' ? 'Aylık' : 'Yıllık';
        
        return `
            <div class="recurring-card">
                <div class="recurring-header">
                    <div class="recurring-info">
                        <div class="recurring-description">${recurring.description}</div>
                        <div style="font-size: 0.875rem; color: #6b7280;">
                            ${category?.name || 'Kategori'} • ${recurring.type === 'expense' ? 'Harcama' : 'Gelir'}
                        </div>
                    </div>
                    <div class="recurring-amount" style="color: ${recurring.type === 'income' ? '#10B981' : '#EF4444'}">
                        ${recurring.type === 'income' ? '+' : '-'}₺${recurring.amount.toLocaleString('tr-TR')}
                    </div>
                </div>
                
                <div class="recurring-frequency">
                    <span>${frequencyText} ${recurring.interval > 1 ? `(${recurring.interval} ${recurring.frequency === 'weekly' ? 'haftada' : recurring.frequency === 'monthly' ? 'ayda' : 'yılda'})` : ''}</span>
                    <span>Sonraki: ${nextDate.toLocaleDateString('tr-TR')}</span>
                </div>
                
                <div style="margin-top: 1rem; display: flex; gap: 0.5rem; align-items: center;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem;">
                        <input type="checkbox" ${recurring.isActive ? 'checked' : ''} onchange="toggleRecurring('${recurring.id}')">
                        Aktif
                    </label>
                    <button class="btn-small btn-secondary" onclick="editRecurring('${recurring.id}')">Düzenle</button>
                    <button class="btn-small btn-danger" onclick="deleteRecurring('${recurring.id}')">Sil</button>
                </div>
            </div>
        `;
    }).join('');
}

function calculateAccountBalance(accountId) {
    return transactions
        .filter(t => t.accountId === accountId)
        .reduce((total, t) => {
            return t.type === 'income' ? total + parseFloat(t.amount) : total - parseFloat(t.amount);
        }, 0);
}

// MODAL FUNCTIONS
function showAddBudgetModal() {
    populateCategorySelect('budget-category');
    const modal = document.getElementById('budget-modal');
    modal.style.display = 'flex';
    
    document.getElementById('budget-form').reset();
    document.getElementById('budget-period').value = 'monthly';
    document.getElementById('budget-alert').value = '80';
}

function closeBudgetModal() {
    document.getElementById('budget-modal').style.display = 'none';
}

function showAddGoalModal() {
    const modal = document.getElementById('goal-modal');
    modal.style.display = 'flex';
    
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    document.getElementById('goal-form').reset();
    document.getElementById('goal-deadline').value = nextMonth.toISOString().split('T')[0];
}

function closeGoalModal() {
    document.getElementById('goal-modal').style.display = 'none';
}

function showAddAccountModal() {
    const modal = document.getElementById('account-modal');
    modal.style.display = 'flex';
    
    // Reset form and set edit mode to false
    document.getElementById('account-form').reset();
    document.getElementById('account-form').dataset.editing = '';
    document.getElementById('modal-title-account').textContent = 'Yeni Hesap Ekle';
}

function showEditAccountModal(accountId) {
    const account = accounts.find(a => a.id === accountId);
    if (!account) return;
    
    const modal = document.getElementById('account-modal');
    modal.style.display = 'flex';
    
    // Fill form with account data
    document.getElementById('account-name').value = account.name;
    document.getElementById('account-type').value = account.type;
    document.getElementById('account-balance').value = account.balance;
    
    // Set edit mode
    document.getElementById('account-form').dataset.editing = accountId;
    document.getElementById('modal-title-account').textContent = 'Hesabı Düzenle';
}

function editAccount(accountId) {
    showEditAccountModal(accountId);
}

function deleteAccount(accountId) {
    if (!confirm('Bu hesabı silmek istediğinizden emin misiniz?')) return;
    
    const accountIndex = accounts.findIndex(a => a.id === accountId);
    if (accountIndex === -1) return;
    
    // If this is the current account, switch to default
    if (currentAccount === accountId) {
        if (accounts.length > 1) {
            const otherAccounts = accounts.filter(a => a.id !== accountId);
            currentAccount = otherAccounts[0].id;
        } else {
            currentAccount = '';
        }
    }
    
    accounts.splice(accountIndex, 1);
    saveData();
    updateAccountsDisplay();
    showNotification('Hesap başarıyla silindi!', 'success');
}

function closeAccountModal() {
    document.getElementById('account-modal').style.display = 'none';
    document.getElementById('account-form').dataset.editing = '';
    document.getElementById('modal-title-account').textContent = 'Yeni Hesap Ekle';
}

function openRecurringModal() {
    populateCategorySelect('recurring-category');
    const modal = document.getElementById('recurring-modal');
    modal.style.display = 'flex';
    
    document.getElementById('recurring-form').reset();
    document.getElementById('recurring-frequency').value = 'monthly';
    document.getElementById('recurring-next-date').value = new Date().toISOString().split('T')[0];
}

function closeRecurringModal() {
    document.getElementById('recurring-modal').style.display = 'none';
}

// UTILITY FUNCTIONS
function populateCategorySelect(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;
    
    select.innerHTML = '<option value="">Kategori seçin</option>' +
        categories.map(cat => `<option value="${cat.id}">${cat.icon} ${cat.name}</option>`).join('');
}

function selectAccount(accountId) {
    currentAccount = accountId;
    saveData();
    updateAccountsDisplay();
    showNotification('Hesap değiştirildi', 'info');
}

function toggleRecurring(recurringId) {
    const recurring = recurringTransactions.find(r => r.id === recurringId);
    if (recurring) {
        recurring.isActive = !recurring.isActive;
        saveData();
        updateRecurringDisplay();
    }
}



// Transaction Modal Functions
function openTransactionModal(transaction = null) {
    const modal = document.getElementById('transaction-modal');
    const title = document.getElementById('modal-title');
    const form = document.getElementById('transaction-form');
    
    if (transaction) {
        // Edit mode
        title.textContent = 'İşlemi Düzenle';
        editingTransactionId = transaction.id;
        
        document.getElementById('amount').value = transaction.amount;
        document.getElementById('category').value = transaction.categoryId;
        document.getElementById('date').value = transaction.date;
        document.getElementById('description').value = transaction.description || '';
        
        setTransactionType(transaction.type);
    } else {
        // Add mode
        title.textContent = 'Yeni İşlem Ekle';
        editingTransactionId = null;
        
        form.reset();
        updateCurrentDate();
        setTransactionType('expense');
    }
    
    populateCategorySelect();
    modal.classList.add('show');
}

function closeTransactionModal() {
    document.getElementById('transaction-modal').classList.remove('show');
    editingTransactionId = null;
}

function setTransactionType(type) {
    currentTransactionType = type;
    
    // Update button states
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    // Update category select
    populateCategorySelect();
}

function populateCategorySelect() {
    try {
        const select = document.getElementById('category');
        if (!select) {
            console.error('Category select element bulunamadı!');
            return;
        }
        
        const filteredCategories = categories.filter(cat => cat.type === currentTransactionType);
        console.log('Filtered categories for', currentTransactionType, ':', filteredCategories);
        
        select.innerHTML = '<option value="">Kategori seçin</option>' +
            filteredCategories.map(category => 
                `<option value="${category.id}">${category.icon} ${category.name}</option>`
            ).join('');
        
        console.log('Category select güncellendi, option sayısı:', filteredCategories.length + 1);
    } catch (error) {
        console.error('populateCategorySelect hatası:', error);
    }
}

function handleTransactionSubmit(e) {
    e.preventDefault();
    
    console.log('=== FORM SUBMIT BAŞLADI ===');
    
    try {
        // Form validation
        const amount = document.getElementById('amount')?.value;
        const category = document.getElementById('category')?.value;
        const date = document.getElementById('date')?.value;
        const description = document.getElementById('description')?.value;
        
        console.log('Form değerleri:', { amount, category, date, type: currentTransactionType });
        
        // Validation checks
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            showNotification('Lütfen geçerli bir tutar girin!', 'error');
            return;
        }
        
        if (!category || category === '') {
            showNotification('Lütfen bir kategori seçin!', 'error');
            return;
        }
        
        if (!date) {
            showNotification('Lütfen bir tarih seçin!', 'error');
            return;
        }
        
        const transactionData = {
            type: currentTransactionType || 'expense',
            amount: parseFloat(amount),
            categoryId: parseInt(category),
            date: date,
            description: description || ''
        };
        
        console.log('Oluşturulan transaction:', transactionData);
        
        // Check if editing existing transaction
        if (editingTransactionId) {
            const index = transactions.findIndex(t => t.id === editingTransactionId);
            if (index !== -1) {
                transactions[index] = {
                    ...transactionData,
                    id: editingTransactionId,
                    updatedAt: new Date().toISOString()
                };
                console.log('Transaction güncellendi:', transactions[index]);
                showNotification('İşlem başarıyla güncellendi!', 'success');
            }
        } else {
            // Add new transaction
            transactionData.id = Date.now();
            transactionData.createdAt = new Date().toISOString();
            transactions.unshift(transactionData);
            console.log('Yeni transaction eklendi:', transactionData);
            showNotification('İşlem başarıyla eklendi!', 'success');
        }
        
        console.log('Mevcut transactions:', transactions.length);
        
        // Data persistence with error handling
        try {
            saveData();
            console.log('Veri kaydedildi');
        } catch (saveError) {
            console.error('Veri kaydetme hatası:', saveError);
            showNotification('Veri kaydetme hatası oluştu', 'error');
        }
        
        // UI Updates with error handling
        try {
            updateUI();
            console.log('UI güncellendi');
        } catch (uiError) {
            console.error('UI güncelleme hatası:', uiError);
        }
        
        try {
            updateStatistics();
            console.log('İstatistikler güncellendi');
        } catch (statsError) {
            console.error('İstatistik güncelleme hatası:', statsError);
        }
        
        try {
            updateCategoriesDisplay();
            updateProfileDisplay();
            updateBudgetDisplay();
            updateGoalsDisplay();
            updateAccountsDisplay();
            updateRecurringDisplay();
            renderTransactions();
            console.log('Tüm ekranlar güncellendi');
        } catch (displayError) {
            console.error('Ekran güncelleme hatası:', displayError);
        }
        
        // Close modal
        try {
            closeTransactionModal();
            console.log('Modal kapatıldı');
        } catch (closeError) {
            console.error('Modal kapatma hatası:', closeError);
        }
        
        console.log('=== FORM SUBMIT BAŞARIYLA TAMAMLANDI ===');
        
    } catch (error) {
        console.error('=== FORM SUBMIT HATASI ===', error);
        showNotification('İşlem sırasında bir hata oluştu!', 'error');
        
        // Fallback - try to close modal and refresh basic UI
        try {
            closeTransactionModal();
        } catch (e) {
            console.error('Modal kapatma hatası:', e);
        }
        
        try {
            renderTransactions();
        } catch (e) {
            console.error('Transaction render hatası:', e);
        }
    }
}

// Data Management Functions
function exportData() {
    const data = {
        transactions,
        categories,
        budgets,
        goals,
        recurringTransactions,
        accounts,
        receipts,
        userPreferences,
        currentAccount,
        exportedAt: new Date().toISOString(),
        app: 'Harcama Takipçisi',
        version: '2.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `harcama-takipci-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Tüm verileriniz başarıyla dışa aktarıldı! 📦', 'success');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.transactions && data.categories) {
                if (confirm('Mevcut verileriniz silinecek. Devam etmek istediğinizden emin misiniz?')) {
                    transactions = data.transactions;
                    categories = data.categories;
                    saveData();
                    
                    updateUI();
                    renderTransactions();
                    renderCategories();
                    renderProfile();
                    
                    alert('Verileriniz başarıyla içe aktarıldı!');
                }
            } else {
                alert('Geçersiz dosya formatı!');
            }
        } catch (error) {
            alert('Dosya okunurken hata oluştu!');
        }
    };
    reader.readAsText(file);
}

function clearAllData() {
    if (confirm('Tüm verileriniz silinecek. Bu işlem geri alınamaz! Devam etmek istediğinizden emin misiniz?')) {
        transactions = [];
        categories = [
            { id: 1, name: 'Yemek', icon: '🍔', color: '#FF6B6B', type: 'expense' },
            { id: 2, name: 'Ulaşım', icon: '🚗', color: '#4ECDC4', type: 'expense' },
            { id: 3, name: 'Market', icon: '🛒', color: '#45B7D1', type: 'expense' },
            { id: 4, name: 'Faturalar', icon: '💡', color: '#96CEB4', type: 'expense' },
            { id: 5, name: 'Eğlence', icon: '🎬', color: '#FFEAA7', type: 'expense' },
            { id: 6, name: 'Sağlık', icon: '💊', color: '#DDA0DD', type: 'expense' },
            { id: 7, name: 'Giyim', icon: '👕', color: '#98D8C8', type: 'expense' },
            { id: 8, name: 'Kira', icon: '🏠', color: '#F7DC6F', type: 'expense' },
            { id: 9, name: 'İletişim', icon: '📱', color: '#BB8FCE', type: 'expense' },
            { id: 10, name: 'Diğer', icon: '✨', color: '#85C1E9', type: 'expense' },
            { id: 11, name: 'Maaş', icon: '💰', color: '#51CF66', type: 'income' },
            { id: 12, name: 'Bonus', icon: '🎉', color: '#40E0D0', type: 'income' },
            { id: 13, name: 'Yatırım', icon: '📈', color: '#32CD32', type: 'income' },
            { id: 14, name: 'Diğer Gelir', icon: '💎', color: '#228B22', type: 'income' }
        ];
        
        try {
            localStorage.removeItem('transactions');
            localStorage.removeItem('categories');
            sessionStorage.removeItem('transactions');
            sessionStorage.removeItem('categories');
        } catch (e) {
            // Saklama hatası, ignore et
        }
        
        // Memory'deki verileri de temizle
        delete window._transactions;
        delete window._categories;
        
        saveData();
        updateUI();
        renderTransactions();
        renderCategories();
        renderProfile();
        
        alert('Tüm verileriniz silindi!');
    }
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
