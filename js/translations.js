// Çoklu Dil Sistemi
const translations = {
    tr: {
        // Navigation
        home: 'Ana Sayfa',
        statistics: 'İstatistikler', 
        budgets: 'Bütçeler',
        goals: 'Hedefler',
        accounts: 'Hesaplar',
        recurring: 'Tekrarlayan',
        categories: 'Kategoriler',
        profile: 'Profil',
        
        // Common
        add: 'Ekle',
        edit: 'Düzenle',
        delete: 'Sil',
        save: 'Kaydet',
        cancel: 'İptal',
        close: 'Kapat',
        confirm: 'Onayla',
        name: 'Ad',
        amount: 'Tutar',
        date: 'Tarih',
        category: 'Kategori',
        description: 'Açıklama',
        type: 'Tür',
        status: 'Durum',
        
        // Transaction Types
        income: 'Gelir',
        expense: 'Gider',
        
        // Modal Titles
        addTransaction: 'İşlem Ekle',
        editTransaction: 'İşlemi Düzenle',
        addBudget: 'Bütçe Ekle',
        editBudget: 'Bütçeyi Düzenle',
        addGoal: 'Hedef Ekle',
        editGoal: 'Hedefi Düzenle',
        addAccount: 'Hesap Ekle',
        editAccount: 'Hesabı Düzenle',
        addRecurring: 'Tekrarlayan İşlem Ekle',
        
        // Welcome Screen
        welcomeTitle: 'Harcama Takipçisi',
        welcomeSubtitle: 'Finansal hayatınızı yönetmenin akıllı yolu',
        welcomeDescription: 'Gelir ve giderlerinizi kolayca takip edin, bütçelerinizi planlayın ve finansal hedeflerinize ulaşın.',
        getStarted: 'Başlayalım',
        
        // Statistics
        totalIncome: 'Toplam Gelir',
        totalExpense: 'Toplam Gider',
        netBalance: 'Net Bakiye',
        categoryBreakdown: 'Kategori Dağılımı',
        topCategory: 'En Çok Harcanan Kategori',
        avgDailySpend: 'Ortalama Günlük Harcama',
        highestTransaction: 'En Yüksek İşlem',
        
        // Messages
        success: 'Başarılı',
        error: 'Hata',
        warning: 'Uyarı',
        info: 'Bilgi',
        saved: 'Kaydedildi',
        deleted: 'Silindi',
        updated: 'Güncellendi',
        
        // Export
        export: 'Dışa Aktar',
        exportPDF: 'PDF Olarak Dışa Aktar',
        exportExcel: 'Excel Olarak Dışa Aktar',
        exportJSON: 'JSON Olarak Dışa Aktar',
        
        // Settings
        settings: 'Ayarlar',
        language: 'Dil',
        theme: 'Tema',
        exportImport: 'Dışa Aktar/İçe Al',
        premium: 'Premium',
        darkMode: 'Karanlık Mod',
        lightMode: 'Açık Mod',
        
        // Categories (will be populated dynamically)
        uncategorized: 'Kategorisiz'
    },
    
    en: {
        // Navigation
        home: 'Home',
        statistics: 'Statistics',
        budgets: 'Budgets', 
        goals: 'Goals',
        accounts: 'Accounts',
        recurring: 'Recurring',
        categories: 'Categories',
        profile: 'Profile',
        
        // Common
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save',
        cancel: 'Cancel',
        close: 'Close',
        confirm: 'Confirm',
        name: 'Name',
        amount: 'Amount',
        date: 'Date',
        category: 'Category',
        description: 'Description',
        type: 'Type',
        status: 'Status',
        
        // Transaction Types
        income: 'Income',
        expense: 'Expense',
        
        // Modal Titles
        addTransaction: 'Add Transaction',
        editTransaction: 'Edit Transaction',
        addBudget: 'Add Budget',
        editBudget: 'Edit Budget',
        addGoal: 'Add Goal',
        editGoal: 'Edit Goal',
        addAccount: 'Add Account',
        editAccount: 'Edit Account',
        addRecurring: 'Add Recurring Transaction',
        
        // Welcome Screen
        welcomeTitle: 'Expense Tracker',
        welcomeSubtitle: 'The smart way to manage your financial life',
        welcomeDescription: 'Track your income and expenses easily, plan your budgets and reach your financial goals.',
        getStarted: 'Get Started',
        
        // Statistics
        totalIncome: 'Total Income',
        totalExpense: 'Total Expense',
        netBalance: 'Net Balance',
        categoryBreakdown: 'Category Breakdown',
        topCategory: 'Top Spending Category',
        avgDailySpend: 'Average Daily Spend',
        highestTransaction: 'Highest Transaction',
        
        // Messages
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Information',
        saved: 'Saved',
        deleted: 'Deleted',
        updated: 'Updated',
        
        // Export
        export: 'Export',
        exportPDF: 'Export as PDF',
        exportExcel: 'Export as Excel',
        exportJSON: 'Export as JSON',
        
        // Settings
        settings: 'Settings',
        language: 'Language',
        theme: 'Theme',
        exportImport: 'Export/Import',
        premium: 'Premium',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        
        // Categories (will be populated dynamically)
        uncategorized: 'Uncategorized'
    },
    
    fr: {
        // Navigation
        home: 'Accueil',
        statistics: 'Statistiques',
        budgets: 'Budgets',
        goals: 'Objectifs',
        accounts: 'Comptes',
        recurring: 'Récurrent',
        categories: 'Catégories',
        profile: 'Profil',
        
        // Common
        add: 'Ajouter',
        edit: 'Modifier',
        delete: 'Supprimer',
        save: 'Enregistrer',
        cancel: 'Annuler',
        close: 'Fermer',
        confirm: 'Confirmer',
        name: 'Nom',
        amount: 'Montant',
        date: 'Date',
        category: 'Catégorie',
        description: 'Description',
        type: 'Type',
        status: 'Statut',
        
        // Transaction Types
        income: 'Revenus',
        expense: 'Dépenses',
        
        // Modal Titles
        addTransaction: 'Ajouter une transaction',
        editTransaction: 'Modifier la transaction',
        addBudget: 'Ajouter un budget',
        editBudget: 'Modifier le budget',
        addGoal: 'Ajouter un objectif',
        editGoal: 'Modifier l\'objectif',
        addAccount: 'Ajouter un compte',
        editAccount: 'Modifier le compte',
        addRecurring: 'Ajouter une transaction récurrente',
        
        // Welcome Screen
        welcomeTitle: 'Suivi des Dépenses',
        welcomeSubtitle: 'La manière intelligente de gérer votre vie financière',
        welcomeDescription: 'Suivez facilement vos revenus et dépenses, planifiez vos budgets et atteignez vos objectifs financiers.',
        getStarted: 'Commencer',
        
        // Statistics
        totalIncome: 'Revenus Totaux',
        totalExpense: 'Dépenses Totales',
        netBalance: 'Solde Net',
        categoryBreakdown: 'Répartition par Catégorie',
        topCategory: 'Catégorie de Dépenses Principale',
        avgDailySpend: 'Dépenses Quotidiennes Moyennes',
        highestTransaction: 'Transaction la Plus Élevée',
        
        // Messages
        success: 'Succès',
        error: 'Erreur',
        warning: 'Avertissement',
        info: 'Information',
        saved: 'Enregistré',
        deleted: 'Supprimé',
        updated: 'Mis à jour',
        
        // Export
        export: 'Exporter',
        exportPDF: 'Exporter en PDF',
        exportExcel: 'Exporter en Excel',
        exportJSON: 'Exporter en JSON',
        
        // Settings
        settings: 'Paramètres',
        language: 'Langue',
        theme: 'Thème',
        exportImport: 'Exporter/Importer',
        premium: 'Premium',
        darkMode: 'Mode Sombre',
        lightMode: 'Mode Clair',
        
        // Categories (will be populated dynamically)
        uncategorized: 'Non Catégorisé'
    },
    
    de: {
        // Navigation
        home: 'Startseite',
        statistics: 'Statistiken',
        budgets: 'Budgets',
        goals: 'Ziele',
        accounts: 'Konten',
        recurring: 'Wiederkehrend',
        categories: 'Kategorien',
        profile: 'Profil',
        
        // Common
        add: 'Hinzufügen',
        edit: 'Bearbeiten',
        delete: 'Löschen',
        save: 'Speichern',
        cancel: 'Abbrechen',
        close: 'Schließen',
        confirm: 'Bestätigen',
        name: 'Name',
        amount: 'Betrag',
        date: 'Datum',
        category: 'Kategorie',
        description: 'Beschreibung',
        type: 'Typ',
        status: 'Status',
        
        // Transaction Types
        income: 'Einkommen',
        expense: 'Ausgaben',
        
        // Modal Titles
        addTransaction: 'Transaktion Hinzufügen',
        editTransaction: 'Transaktion Bearbeiten',
        addBudget: 'Budget Hinzufügen',
        editBudget: 'Budget Bearbeiten',
        addGoal: 'Ziel Hinzufügen',
        editGoal: 'Ziel Bearbeiten',
        addAccount: 'Konto Hinzufügen',
        editAccount: 'Konto Bearbeiten',
        addRecurring: 'Wiederkehrende Transaktion Hinzufügen',
        
        // Welcome Screen
        welcomeTitle: 'Ausgaben-Tracker',
        welcomeSubtitle: 'Der intelligente Weg zur Verwaltung Ihres finanziellen Lebens',
        welcomeDescription: 'Verfolgen Sie einfach Ihre Einnahmen und Ausgaben, planen Sie Ihre Budgets und erreichen Sie Ihre finanziellen Ziele.',
        getStarted: 'Loslegen',
        
        // Statistics
        totalIncome: 'Gesamteinnahmen',
        totalExpense: 'Gesamtausgaben',
        netBalance: 'Nettobilanz',
        categoryBreakdown: 'Kategorieaufteilung',
        topCategory: 'Top Ausgabenkategorie',
        avgDailySpend: 'Durchschnittliche tägliche Ausgaben',
        highestTransaction: 'Höchste Transaktion',
        
        // Messages
        success: 'Erfolg',
        error: 'Fehler',
        warning: 'Warnung',
        info: 'Information',
        saved: 'Gespeichert',
        deleted: 'Gelöscht',
        updated: 'Aktualisiert',
        
        // Export
        export: 'Exportieren',
        exportPDF: 'Als PDF exportieren',
        exportExcel: 'Als Excel exportieren',
        exportJSON: 'Als JSON exportieren',
        
        // Settings
        settings: 'Einstellungen',
        language: 'Sprache',
        theme: 'Thema',
        exportImport: 'Exportieren/Importieren',
        premium: 'Premium',
        darkMode: 'Dunkler Modus',
        lightMode: 'Heller Modus',
        
        // Categories (will be populated dynamically)
        uncategorized: 'Nicht kategorisiert'
    },
    
    es: {
        // Navigation
        home: 'Inicio',
        statistics: 'Estadísticas',
        budgets: 'Presupuestos',
        goals: 'Metas',
        accounts: 'Cuentas',
        recurring: 'Recurrente',
        categories: 'Categorías',
        profile: 'Perfil',
        
        // Common
        add: 'Agregar',
        edit: 'Editar',
        delete: 'Eliminar',
        save: 'Guardar',
        cancel: 'Cancelar',
        close: 'Cerrar',
        confirm: 'Confirmar',
        name: 'Nombre',
        amount: 'Cantidad',
        date: 'Fecha',
        category: 'Categoría',
        description: 'Descripción',
        type: 'Tipo',
        status: 'Estado',
        
        // Transaction Types
        income: 'Ingresos',
        expense: 'Gastos',
        
        // Modal Titles
        addTransaction: 'Agregar Transacción',
        editTransaction: 'Editar Transacción',
        addBudget: 'Agregar Presupuesto',
        editBudget: 'Editar Presupuesto',
        addGoal: 'Agregar Meta',
        editGoal: 'Editar Meta',
        addAccount: 'Agregar Cuenta',
        editAccount: 'Editar Cuenta',
        addRecurring: 'Agregar Transacción Recurrente',
        
        // Welcome Screen
        welcomeTitle: 'Controlador de Gastos',
        welcomeSubtitle: 'La forma inteligente de manejar tu vida financiera',
        welcomeDescription: 'Realiza un seguimiento fácil de tus ingresos y gastos, planifica tus presupuestos y alcanza tus objetivos financieros.',
        getStarted: 'Comenzar',
        
        // Statistics
        totalIncome: 'Ingresos Totales',
        totalExpense: 'Gastos Totales',
        netBalance: 'Saldo Neto',
        categoryBreakdown: 'Desglose por Categoría',
        topCategory: 'Categoría Principal de Gastos',
        avgDailySpend: 'Gasto Diario Promedio',
        highestTransaction: 'Transacción Más Alta',
        
        // Messages
        success: 'Éxito',
        error: 'Error',
        warning: 'Advertencia',
        info: 'Información',
        saved: 'Guardado',
        deleted: 'Eliminado',
        updated: 'Actualizado',
        
        // Export
        export: 'Exportar',
        exportPDF: 'Exportar como PDF',
        exportExcel: 'Exportar como Excel',
        exportJSON: 'Exportar como JSON',
        
        // Settings
        settings: 'Configuración',
        language: 'Idioma',
        theme: 'Tema',
        exportImport: 'Exportar/Importar',
        premium: 'Premium',
        darkMode: 'Modo Oscuro',
        lightMode: 'Modo Claro',
        
        // Categories (will be populated dynamically)
        uncategorized: 'Sin Categoría'
    },
    
    ar: {
        // Navigation
        home: 'الرئيسية',
        statistics: 'الإحصائيات',
        budgets: 'الميزانيات',
        goals: 'الأهداف',
        accounts: 'الحسابات',
        recurring: 'متكرر',
        categories: 'الفئات',
        profile: 'الملف الشخصي',
        
        // Common
        add: 'إضافة',
        edit: 'تحرير',
        delete: 'حذف',
        save: 'حفظ',
        cancel: 'إلغاء',
        close: 'إغلاق',
        confirm: 'تأكيد',
        name: 'الاسم',
        amount: 'المبلغ',
        date: 'التاريخ',
        category: 'الفئة',
        description: 'الوصف',
        type: 'النوع',
        status: 'الحالة',
        
        // Transaction Types
        income: 'الدخل',
        expense: 'المصروفات',
        
        // Modal Titles
        addTransaction: 'إضافة معاملة',
        editTransaction: 'تحرير المعاملة',
        addBudget: 'إضافة ميزانية',
        editBudget: 'تحرير الميزانية',
        addGoal: 'إضافة هدف',
        editGoal: 'تحرير الهدف',
        addAccount: 'إضافة حساب',
        editAccount: 'تحرير الحساب',
        addRecurring: 'إضافة معاملة متكررة',
        
        // Welcome Screen
        welcomeTitle: 'متتبع المصروفات',
        welcomeSubtitle: 'الطريقة الذكية لإدارة حياتك المالية',
        welcomeDescription: 'تتبع بسهولة دخلك ومصاريفك، خطط ميزانياتك ووصل إلى أهدافك المالية.',
        getStarted: 'ابدأ',
        
        // Statistics
        totalIncome: 'إجمالي الدخل',
        totalExpense: 'إجمالي المصروفات',
        netBalance: 'الرصيد الصافي',
        categoryBreakdown: 'توزيع الفئات',
        topCategory: 'أعلى فئة مصروفات',
        avgDailySpend: 'متوسط الإنفاق اليومي',
        highestTransaction: 'أعلى معاملة',
        
        // Messages
        success: 'نجح',
        error: 'خطأ',
        warning: 'تحذير',
        info: 'معلومات',
        saved: 'محفوظ',
        deleted: 'محذوف',
        updated: 'محدث',
        
        // Export
        export: 'تصدير',
        exportPDF: 'تصدير كـ PDF',
        exportExcel: 'تصدير كـ Excel',
        exportJSON: 'تصدير كـ JSON',
        
        // Settings
        settings: 'الإعدادات',
        language: 'اللغة',
        theme: 'السمة',
        exportImport: 'تصدير/استيراد',
        premium: 'المميزة',
        darkMode: 'الوضع الليلي',
        lightMode: 'الوضع النهاري',
        
        // Categories (will be populated dynamically)
        uncategorized: 'غير مصنف'
    }
};

// Dil yönetim sistemi
let currentLanguage = localStorage.getItem('appLanguage') || 'tr';

// Metin çevirme fonksiyonu
function t(key) {
    const lang = translations[currentLanguage] || translations.tr;
    return lang[key] || translations.tr[key] || key;
}

// Dil değiştirme fonksiyonu
function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    // Global değişkeni güncelle
    if (typeof currentLanguage !== 'undefined') {
        currentLanguage = lang;
    }
    localStorage.setItem('appLanguage', lang);
    
    // Sayfa yönlendirme yönünü ayarla (Arapça için RTL)
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
    
    updatePageTranslations();
}

// Sayfa çevirilerini güncelleme
function updatePageTranslations() {
    // Navigation items
    document.querySelectorAll('[data-translate="home"]').forEach(el => el.textContent = t('home'));
    document.querySelectorAll('[data-translate="statistics"]').forEach(el => el.textContent = t('statistics'));
    document.querySelectorAll('[data-translate="budgets"]').forEach(el => el.textContent = t('budgets'));
    document.querySelectorAll('[data-translate="goals"]').forEach(el => el.textContent = t('goals'));
    document.querySelectorAll('[data-translate="accounts"]').forEach(el => el.textContent = t('accounts'));
    document.querySelectorAll('[data-translate="recurring"]').forEach(el => el.textContent = t('recurring'));
    document.querySelectorAll('[data-translate="categories"]').forEach(el => el.textContent = t('categories'));
    document.querySelectorAll('[data-translate="profile"]').forEach(el => el.textContent = t('profile'));
    
    // Form labels
    document.querySelectorAll('[data-translate="add"]').forEach(el => el.textContent = t('add'));
    document.querySelectorAll('[data-translate="edit"]').forEach(el => el.textContent = t('edit'));
    document.querySelectorAll('[data-translate="delete"]').forEach(el => el.textContent = t('delete'));
    document.querySelectorAll('[data-translate="save"]').forEach(el => el.textContent = t('save'));
    document.querySelectorAll('[data-translate="cancel"]').forEach(el => el.textContent = t('cancel'));
    document.querySelectorAll('[data-translate="close"]').forEach(el => el.textContent = t('close'));
    
    // Welcome screen
    const welcomeTitle = document.querySelector('.welcome-title');
    if (welcomeTitle) welcomeTitle.textContent = t('welcomeTitle');
    
    const welcomeSubtitle = document.querySelector('.welcome-subtitle');
    if (welcomeSubtitle) welcomeSubtitle.textContent = t('welcomeSubtitle');
    
    const welcomeDescription = document.querySelector('.welcome-description');
    if (welcomeDescription) welcomeDescription.textContent = t('welcomeDescription');
    
    const getStartedBtn = document.querySelector('.welcome-btn-primary');
    if (getStartedBtn) getStartedBtn.textContent = t('getStarted');
}