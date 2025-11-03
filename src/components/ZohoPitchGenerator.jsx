import React, { useState, useEffect } from 'react';
import { Globe, Building2, ChevronRight, Download, BarChart3, Users, FileText, Sparkles, Brain } from 'lucide-react';

const ZohoPitchGenerator = () => {
  const [language, setLanguage] = useState('ar'); // Default to Arabic
  const [accessType, setAccessType] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [salesRepName, setSalesRepName] = useState('');
  const [aiEnabled, setAiEnabled] = useState(true);
  
  const [formData, setFormData] = useState({
    companyName: '',
    companyUrl: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    tiktok: '',
    description: ''
  });
  
  const [industryData, setIndustryData] = useState(null);
  const [objections, setObjections] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);

  const ZOHO_LOGO = "https://ik.imagekit.io/xtj3m9hth/image-removebg-preview%20(3).png?updatedAt=1761664841869";
  const ETISALAT_LOGO = "https://ik.imagekit.io/xtj3m9hth/image-removebg-preview%20(4).png?updatedAt=1761664842867";

  // Comprehensive Arabic text content
  const text = {
    en: {
      managerialAccess: 'Managerial Access',
      salesAccess: 'Sales Representative Access',
      selectAccess: 'Select Access Type',
      dashboard: 'Managerial Dashboard',
      totalPDFs: 'Total PDFs Generated',
      serviceBreakdown: 'Service Usage Breakdown',
      back: 'Back',
      salesRepName: 'Sales Representative Name',
      salesRepPlaceholder: 'Enter your full name',
      companyInfo: 'Company Information',
      companyName: 'Company Name',
      companyUrl: 'Company Website',
      description: 'Company Description / Challenges',
      descPlaceholder: 'Describe the company, their challenges, target customers, and goals...',
      socialLinks: 'Social Media Links (Optional)',
      next: 'Analyze Company',
      industryAnalysis: 'Industry Analysis & Recommendations',
      detectedIndustry: 'Detected Industry',
      challenges: 'Common Industry Challenges',
      recommended: 'Recommended Zoho Solutions',
      objections: 'Client Objections / Specific Needs',
      objPlaceholder: 'Enter any specific objections or needs mentioned by the client...',
      generate: 'Generate Proposal',
      proposal: 'Final Proposal',
      selectedServices: 'Selected Services',
      download: 'Download PDF Proposal',
      newProposal: 'Create New Proposal',
      validation: 'Please provide at least company name and one link (website or social media)',
      nameValidation: 'Please enter your name to continue',
      chooseFormat: 'Choose Proposal Format',
      quickProposal: 'Quick Proposal',
      detailedProposal: 'Detailed Proposal',
      quickDesc: '2-3 pages • Service list • Key benefits • Quick read',
      detailedDesc: '8-12 pages • Full analysis • Detailed scenarios • Complete ROI breakdown',
      bestForQuick: 'Best for: Email follow-ups, Quick pitches',
      bestForDetailed: 'Best for: Board meetings, Deep dives, Decision makers',
      cancel: 'Cancel',
      aiAnalysis: 'AI-Powered Analysis',
      generatingInsights: 'Generating AI Insights...',
      aiRecommendations: 'AI Recommendations',
      enableAI: 'Enable AI Enhancement',
      aiPowered: 'AI-Powered Proposal',
      pricing: 'Pricing',
      features: 'Key Features'
    },
    ar: {
      managerialAccess: 'الوصول الإداري',
      salesAccess: 'وصول مندوب المبيعات',
      selectAccess: 'اختر نوع الوصول',
      dashboard: 'لوحة التحكم الإدارية',
      totalPDFs: 'إجمالي ملفات PDF المُنشأة',
      serviceBreakdown: 'تفصيل استخدام الخدمات',
      back: 'رجوع',
      salesRepName: 'اسم مندوب المبيعات',
      salesRepPlaceholder: 'أدخل اسمك الكامل',
      companyInfo: 'معلومات الشركة',
      companyName: 'اسم الشركة',
      companyUrl: 'موقع الشركة الإلكتروني',
      description: 'وصف الشركة / التحديات',
      descPlaceholder: 'صف الشركة وتحدياتها والعملاء المستهدفين والأهداف...',
      socialLinks: 'روابط وسائل التواصل الاجتماعي (اختياري)',
      next: 'تحليل الشركة',
      industryAnalysis: 'تحليل الصناعة والتوصيات',
      detectedIndustry: 'الصناعة المكتشفة',
      challenges: 'التحديات الصناعية الشائعة',
      recommended: 'حلول Zoho الموصى بها',
      objections: 'اعتراضات العميل / الاحتياجات المحددة',
      objPlaceholder: 'أدخل أي اعتراضات أو احتياجات محددة ذكرها العميل...',
      generate: 'إنشاء العرض',
      proposal: 'العرض النهائي',
      selectedServices: 'الخدمات المحددة',
      download: 'تنزيل عرض PDF',
      newProposal: 'إنشاء عرض جديد',
      validation: 'يرجى تقديم اسم الشركة ورابط واحد على الأقل (موقع ويب أو وسائل التواصل الاجتماعي)',
      nameValidation: 'يرجى إدخال اسمك للمتابعة',
      chooseFormat: 'اختر تنسيق العرض',
      quickProposal: 'عرض سريع',
      detailedProposal: 'عرض مفصل',
      quickDesc: '٢-٣ صفحات • قائمة الخدمات • الفوائد الرئيسية • قراءة سريعة',
      detailedDesc: '٨-١٢ صفحة • تحليل كامل • سيناريوهات مفصلة • تفصيل عائد الاستثمار',
      bestForQuick: 'الأفضل لـ: متابعات البريد الإلكتروني، العروض السريعة',
      bestForDetailed: 'الأفضل لـ: اجتماعات مجلس الإدارة، التحليل العميق، صانعي القرار',
      cancel: 'إلغاء',
      aiAnalysis: 'التحليل بالذكاء الاصطناعي',
      generatingInsights: 'جاري توليد الرؤى...',
      aiRecommendations: 'التوصيات الذكية',
      enableAI: 'تفعيل التعزيز بالذكاء الاصطناعي',
      aiPowered: 'العرض المدعوم بالذكاء الاصطناعي',
      pricing: 'التسعير',
      features: 'الميزات الرئيسية'
    }
  };

  // Enhanced industry detection
  const detectIndustry = (data) => {
    const textContent = `${data.companyName} ${data.companyUrl} ${data.description}`.toLowerCase();
    
    const keywords = {
      'Retail & E-commerce': ['shop', 'store', 'retail', 'ecommerce', 'e-commerce', 'product', 'sell', 'marketplace'],
      'Logistics & Supply Chain': ['logistics', 'shipping', 'transport', 'delivery', 'warehouse', 'supply'],
      'Financial Services': ['bank', 'finance', 'insurance', 'investment', 'payment', 'fintech'],
      'Tourism & Hospitality': ['hotel', 'tourism', 'travel', 'resort', 'restaurant', 'hospitality'],
      'Real Estate & Construction': ['real estate', 'property', 'construction', 'building', 'contractor'],
      'Healthcare': ['health', 'medical', 'clinic', 'hospital', 'doctor', 'pharmaceutical']
    };

    let detectedIndustry = 'Retail & E-commerce';
    let maxMatches = 0;

    Object.entries(keywords).forEach(([industry, words]) => {
      const matches = words.filter(word => textContent.includes(word)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedIndustry = industry;
      }
    });

    return detectedIndustry;
  };

  // Enhanced analysis with AI
  const handleAnalyze = async () => {
    // Check for sales representative name
    if (!salesRepName.trim()) {
      alert(text[language].nameValidation);
      return;
    }
    
    // Check for company name AND at least one link
    if (!formData.companyName.trim() || (!formData.companyUrl.trim() && !formData.facebook.trim() && !formData.instagram.trim() && !formData.linkedin.trim() && !formData.tiktok.trim())) {
      alert(text[language].validation);
      return;
    }

    setLoading(true);
    
    try {
      const industry = detectIndustry(formData);
      
      setIndustryData({
        industry,
        challenges: industryChallenges[industry] || [],
        services: zohoServices[industry] || []
      });
      
      setSelectedServices(zohoServices[industry] || []);
      
    } catch (error) {
      console.error('Analysis error:', error);
      // Fallback to standard analysis
      const industry = 'Retail & E-commerce';
      setIndustryData({
        industry,
        challenges: industryChallenges[industry] || [],
        services: zohoServices[industry] || []
      });
      setSelectedServices(zohoServices[industry] || []);
    } finally {
      setLoading(false);
      setCurrentPage(2);
    }
  };

  const generatePDF = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentPage(3);
    }, 1000);
  };

  const downloadPDF = (format) => {
    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    
    const isArabic = language === 'ar';
    
    let pdfContent = '';
    
    if (format === 'quick') {
      if (isArabic) {
        pdfContent = `═══════════════════════════════════════════════════════════════════════
                        عرض ZOHO ONE التجاري
                          مدعوم من e& مصر
═══════════════════════════════════════════════════════════════════════

تاريخ العرض: ${formattedDate}
معد للشركة: ${formData.companyName}
أعد بواسطة: ${salesRepName}

═══════════════════════════════════════════════════════════════════════
                          معلومات العميل
═══════════════════════════════════════════════════════════════════════

اسم الشركة: ${formData.companyName}
الصناعة: ${industryData.industry}
${formData.companyUrl ? `الموقع الإلكتروني: ${formData.companyUrl}` : ''}

${formData.description ? `السياق التجاري:\n${formData.description}\n` : ''}

═══════════════════════════════════════════════════════════════════════
                    حلول Zoho الموصى بها
═══════════════════════════════════════════════════════════════════════

${selectedServices.map((service, idx) => `
${idx + 1}. ${service.name}
   ${service.desc}
   التسعير: ${service.pricing}
`).join('\n')}

═══════════════════════════════════════════════════════════════════════
                            الخطوات التالية
═══════════════════════════════════════════════════════════════════════

1. جدولة عرض توضيحي مخصص
2. تخطيط تنفيذ مخصص
3. تدريب الفريق والنشر

الاتصال: ${salesRepName}
e& مصر - فريق حلول Zoho One

© ${date.getFullYear()} e& مصر. جميع الحقوق محفوظة.
═══════════════════════════════════════════════════════════════════════`;
      } else {
        // English version
        pdfContent = `═══════════════════════════════════════════════════════════════════════
                        ZOHO ONE BUSINESS PROPOSAL
                          Powered by e& Egypt
═══════════════════════════════════════════════════════════════════════

PROPOSAL DATE: ${formattedDate}
PREPARED FOR: ${formData.companyName}
PREPARED BY: ${salesRepName}

═══════════════════════════════════════════════════════════════════════
                          CLIENT INFORMATION
═══════════════════════════════════════════════════════════════════════

Company Name: ${formData.companyName}
Industry: ${industryData.industry}
${formData.companyUrl ? `Website: ${formData.companyUrl}` : ''}

${formData.description ? `Business Context:\n${formData.description}\n` : ''}

═══════════════════════════════════════════════════════════════════════
                    RECOMMENDED ZOHO SOLUTIONS
═══════════════════════════════════════════════════════════════════════

${selectedServices.map((service, idx) => `
${idx + 1}. ${service.name}
   ${service.desc}
   Pricing: ${service.pricing}
`).join('\n')}

═══════════════════════════════════════════════════════════════════════
                            NEXT STEPS
═══════════════════════════════════════════════════════════════════════

1. Schedule Personalized Demo
2. Custom Implementation Planning
3. Team Training & Deployment

Contact: ${salesRepName}
e& Egypt - Zoho One Solutions Team

© ${date.getFullYear()} e& Egypt. All rights reserved.
═══════════════════════════════════════════════════════════════════════`;
      }
    } else {
      // Detailed format
      if (isArabic) {
        pdfContent = `═══════════════════════════════════════════════════════════════════════
                        عرض ZOHO ONE التجاري
                       تحليل شامل وخارطة طريق
                          مدعوم من e& مصر
═══════════════════════════════════════════════════════════════════════

تاريخ العرض: ${formattedDate}
معد للشركة: ${formData.companyName}
أعد بواسطة: ${salesRepName}
الصناعة: ${industryData.industry}

═══════════════════════════════════════════════════════════════════════
              تحليل الصناعة
═══════════════════════════════════════════════════════════════════════

${industryData.industry} - سياق السوق المصري:

التحديات الرئيسية:
${industryData.challenges.map((challenge, idx) => `${idx + 1}. ${challenge}`).join('\n')}

${selectedServices.map((service, idx) => `
${'─'.repeat(75)}
الحل ${idx + 1}: ${service.name}
${'─'.repeat(75)}

${service.desc}

التسعير: ${service.pricing}
الميزات الرئيسية: ${service.features.join(', ')}
`).join('\n')}

═══════════════════════════════════════════════════════════════════════
                            الاتصال
═══════════════════════════════════════════════════════════════════════

مندوب المبيعات: ${salesRepName}
e& مصر - فريق حلول Zoho One

© ${date.getFullYear()} e& مصر. جميع الحقوق محفوظة.
═══════════════════════════════════════════════════════════════════════`;
      } else {
        // English detailed version
        pdfContent = `═══════════════════════════════════════════════════════════════════════
                        ZOHO ONE BUSINESS PROPOSAL
                       COMPREHENSIVE ANALYSIS & ROADMAP
                          Powered by e& Egypt
═══════════════════════════════════════════════════════════════════════

PROPOSAL DATE: ${formattedDate}
PREPARED FOR: ${formData.companyName}
PREPARED BY: ${salesRepName}
INDUSTRY: ${industryData.industry}

═══════════════════════════════════════════════════════════════════════
              INDUSTRY ANALYSIS
═══════════════════════════════════════════════════════════════════════

${industryData.industry} - Egyptian Market Context:

KEY CHALLENGES:
${industryData.challenges.map((challenge, idx) => `${idx + 1}. ${challenge}`).join('\n')}

${selectedServices.map((service, idx) => `
${'─'.repeat(75)}
SOLUTION ${idx + 1}: ${service.name}
${'─'.repeat(75)}

${service.desc}

PRICING: ${service.pricing}
KEY FEATURES: ${service.features.join(', ')}
`).join('\n')}

═══════════════════════════════════════════════════════════════════════
                            CONTACT
═══════════════════════════════════════════════════════════════════════

Sales Representative: ${salesRepName}
e& Egypt - Zoho One Solutions Team

© ${date.getFullYear()} e& Egypt. All rights reserved.
═══════════════════════════════════════════════════════════════════════`;
      }
    }

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const formatLabel = format === 'quick' ? (language === 'ar' ? 'سريع' : 'Quick') : (language === 'ar' ? 'مفصل' : 'Detailed');
    link.download = `Zoho_Proposal_${formatLabel}_${formData.companyName.replace(/\s+/g, '_')}_${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const resetApp = () => {
    setFormData({
      companyName: '',
      companyUrl: '',
      facebook: '',
      instagram: '',
      linkedin: '',
      tiktok: '',
      description: ''
    });
    setSalesRepName('');
    setIndustryData(null);
    setObjections('');
    setSelectedServices([]);
    setCurrentPage(0);
    setAccessType(null);
  };

  // Enhanced services data in Arabic
  const zohoServices = {
    'Retail & E-commerce': [
      { 
        name: 'Zoho CRM', 
        desc: 'Multi-channel customer relationship management to close deals smarter, faster, and better. Centralized customer data and sales pipeline tracking across all channels.',
        pricing: '700-1750 EGP/month',
        features: ['Lead Management', 'Sales Pipeline Views', 'Smart Assistant (Zia)', 'Sales Force Automation']
      },
      { 
        name: 'Zoho Inventory', 
        desc: 'Centralized inventory management for distributed sales channels. Real-time stock control to prevent overselling and stockouts across retail stores and e-commerce.',
        pricing: '135-783 EGP/month',
        features: ['Multi-channel Tracking', 'Low Stock Alerts', 'Order Management', 'Supplier Relations']
      }
    ],
    'Logistics & Supply Chain': [
      { 
        name: 'Zoho Inventory', 
        desc: 'Complete visibility across warehouses for inventory. Streamline operations and track inventory in real-time across all locations.',
        pricing: '135-783 EGP/month',
        features: ['Multi-warehouse Management', 'Shipment Tracking', 'Purchase Orders', 'Stock Transfers']
      },
      { 
        name: 'Zoho Analytics', 
        desc: 'Business intelligence and reporting tool that turns business data into visually rich reports and dashboards for supply chain performance metrics.',
        pricing: 'Included in Zoho One',
        features: ['Custom Dashboards', 'Real-time Reports', 'KPI Metrics', 'Predictive Analytics']
      }
    ],
    'Financial Services': [
      { 
        name: 'Zoho CRM', 
        desc: 'Secure customer data management with compliance-ready features. Designed for financial institutions with privacy-first engineering.',
        pricing: '700-1750 EGP/month',
        features: ['Compliance Tracking', 'Secure Data Storage', 'Customer Onboarding', 'Audit Trails']
      }
    ],
    'Tourism & Hospitality': [
      { 
        name: 'Zoho CRM', 
        desc: 'Guest relationship management and booking pipeline management effectively with comprehensive customer data and interaction history.',
        pricing: '700-1750 EGP/month',
        features: ['Guest Profiles', 'Booking Pipeline', 'Loyalty Tracking', 'Automated Follow-ups']
      }
    ],
    'Real Estate & Construction': [
      { 
        name: 'Zoho CRM', 
        desc: 'Lead tracking and property listings management with customer interactions and powerful pipeline management and automation.',
        pricing: '700-1750 EGP/month',
        features: ['Property Management', 'Lead Scoring', 'Site Visit Scheduling', 'Client Portal']
      }
    ],
    'Healthcare': [
      { 
        name: 'Zoho CRM', 
        desc: 'Patient relationship management with appointment tracking and medical history with privacy standards compliance.',
        pricing: '700-1750 EGP/month',
        features: ['Patient Records', 'Appointment Management', 'Treatment Tracking', 'Secure Communications']
      }
    ]
  };

  const industryChallenges = {
    'Retail & E-commerce': [
      'Multi-channel inventory management causing stockouts and overselling',
      'Customer data scattered across platforms making personalization difficult',
      'Manual order processing causing delays and fulfillment errors',
      'Difficulty tracking customer behavior and preferences for targeted marketing'
    ],
    'Logistics & Supply Chain': [
      'Real-time visibility of shipments and inventory across multiple locations',
      'Manual documentation and tracking processes leading to inefficiencies',
      'Poor coordination between warehouses, transportation, and delivery teams',
      'Limited customer communication about delivery status causing satisfaction issues'
    ],
    'Financial Services': [
      'Regulatory compliance requirements and data security becoming more stringent',
      'Complex customer onboarding and documentation processes requiring automation',
      'Multi-channel customer support expectations from digitally-savvy customers',
      'Maintaining financial reporting and audit trails for compliance'
    ],
    'Tourism & Hospitality': [
      'Seasonal demand fluctuations requiring flexible capacity management',
      'Guest experience and reputation management across multiple channels',
      'Managing bookings across multiple platforms and direct channels',
      'Staff coordination and communication during peak seasons'
    ],
    'Real Estate & Construction': [
      'Lead management and follow-up tracking for long sales cycles',
      'Project schedule and budget management across multiple sites',
      'Document signing and contract management requiring digital solutions',
      'Communication between stakeholders including buyers, contractors, and suppliers'
    ],
    'Healthcare': [
      'Patient appointment scheduling and automated reminders to reduce no-shows',
      'Medical record management with privacy standards compliance',
      'Complex insurance billing and claims processing',
      'Multi-location practice coordination and staff communications'
    ]
  };

  const TopBar = () => (
    <div className="bg-white shadow-md border-b-2 border-red-500" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center h-20 gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className="flex-shrink-0 w-40 h-16 flex items-center justify-start">
            <img 
              src={ZOHO_LOGO} 
              alt="Zoho One" 
              className="max-h-full max-w-full object-contain"
              crossOrigin="anonymous"
            />
          </div>
          
          <div className={`flex items-center gap-4 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            {/* AI Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
              <Brain className={`w-5 h-5 ${aiEnabled ? 'text-green-500' : 'text-gray-400'}`} />
              <span className="text-sm font-medium">AI</span>
              <button
                onClick={() => setAiEnabled(!aiEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  aiEnabled ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    aiEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-yellow-500 text-white hover:from-red-600 hover:to-yellow-600 transition-all font-medium shadow-md"
            >
              <Globe className="w-5 h-5" />
              <span className="font-semibold">{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>

          <div className="flex-shrink-0 w-40 h-16 flex items-center justify-end">
            <img 
              src={ETISALAT_LOGO} 
              alt="Etisalat" 
              className="max-h-full max-w-full object-contain"
              crossOrigin="anonymous"
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (!accessType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <TopBar />

        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] p-4">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                {language === 'ar' ? 'منشئ عروض Zoho One' : 'Zoho One Pitch Generator'}
              </h1>
              <p className="text-gray-600 text-xl">
                {text[language].selectAccess}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <button
                onClick={() => setAccessType('manager')}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all p-10 border-4 border-transparent hover:border-red-500 transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center group-hover:from-red-500 group-hover:to-red-600 transition-all shadow-lg">
                    <BarChart3 className="w-12 h-12 text-red-600 group-hover:text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {text[language].managerialAccess}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {language === 'ar' ? 'عرض التحليلات، تتبع الأداء، ومراقبة نشاط الفريق' : 'View analytics, track performance, and monitor team activity'}
                  </p>
                </div>
              </button>

              <button
                onClick={() => { setAccessType('sales'); setCurrentPage(1); }}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all p-10 border-4 border-transparent hover:border-yellow-500 transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center group-hover:from-yellow-500 group-hover:to-yellow-600 transition-all shadow-lg">
                    <Users className="w-12 h-12 text-yellow-600 group-hover:text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {text[language].salesAccess}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {language === 'ar' ? 'إنشاء عروض مخصصة وتوليد عروض العملاء' : 'Create customized proposals and generate client pitches'}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <TopBar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className={`flex items-center justify-between mb-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            {[1, 2, 3].map((step) => (
              <div key={step} className={`flex-1 ${step < 3 ? (language === 'ar' ? 'ml-2' : 'mr-2') : ''}`}>
                <div className={`h-3 rounded-full transition-all ${currentPage >= step ? 'bg-gradient-to-r from-red-500 to-yellow-500 shadow-md' : 'bg-gray-200'}`} />
              </div>
            ))}
          </div>
          <div className={`flex justify-between text-sm font-medium text-gray-600 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <span>{language === 'ar' ? 'معلومات الشركة' : 'Company Info'}</span>
            <span>{language === 'ar' ? 'التحليل' : 'Analysis'}</span>
            <span>{language === 'ar' ? 'العرض' : 'Proposal'}</span>
          </div>
        </div>

        {/* Page 1: Company Information */}
        {currentPage === 1 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-red-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{text[language].companyInfo}</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  {text[language].salesRepName} *
                </label>
                <input
                  type="text"
                  value={salesRepName}
                  onChange={(e) => setSalesRepName(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-lg"
                  placeholder={text[language].salesRepPlaceholder}
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  {text[language].companyName} *
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-lg"
                  placeholder={language === 'ar' ? 'شركة ABC' : 'ABC Corporation'}
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  {text[language].companyUrl}
                </label>
                <input
                  type="url"
                  value={formData.companyUrl}
                  onChange={(e) => setFormData({...formData, companyUrl: e.target.value})}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-lg"
                  placeholder={language === 'ar' ? 'https://example.com' : 'https://example.com'}
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  {text[language].description}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-lg"
                  rows={4}
                  placeholder={text[language].descPlaceholder}
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">{text[language].socialLinks}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="url"
                    value={formData.facebook}
                    onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                    className="px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-lg"
                    placeholder="Facebook URL"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <input
                    type="url"
                    value={formData.instagram}
                    onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                    className="px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-lg"
                    placeholder="Instagram URL"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    className="px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-lg"
                    placeholder="LinkedIn URL"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                  <input
                    type="url"
                    value={formData.tiktok}
                    onChange={(e) => setFormData({...formData, tiktok: e.target.value})}
                    className="px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-lg"
                    placeholder="TikTok URL"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={resetApp}
                  className="px-8 py-4 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold transition-all shadow-md"
                >
                  {text[language].back}
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                >
                  {loading ? (language === 'ar' ? 'جاري التحليل...' : 'Analyzing...') : text[language].next}
                  {!loading && <ChevronRight className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page 2: Industry Analysis */}
        {currentPage === 2 && industryData && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-red-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{text[language].industryAnalysis}</h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-50 to-yellow-50 border-l-4 border-red-500 p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-gray-900 mb-2 text-lg uppercase tracking-wide">{text[language].detectedIndustry}</h3>
                <p className="text-2xl font-bold text-red-600">{industryData.industry}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">{text[language].challenges}</h3>
                <div className="space-y-3">
                  {industryData.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border-l-4 border-red-500">
                      <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">{text[language].recommended}</h3>
                <div className="space-y-4">
                  {industryData.services.map((service, index) => (
                    <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-red-500 transition-all bg-white shadow-sm">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{service.name}</h4>
                          <p className="text-sm text-green-600 font-semibold">{service.pricing}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{service.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {service.features.map((feature, idx) => (
                          <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">{text[language].objections}</label>
                <textarea
                  value={objections}
                  onChange={(e) => setObjections(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-lg"
                  rows={3}
                  placeholder={text[language].objPlaceholder}
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setCurrentPage(1)}
                  className="px-8 py-4 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold transition-all shadow-md"
                >
                  {text[language].back}
                </button>
                <button
                  onClick={generatePDF}
                  disabled={loading}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                >
                  {loading ? (language === 'ar' ? 'جاري الإنشاء...' : 'Generating...') : text[language].generate}
                  {!loading && <ChevronRight className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page 3: Final Proposal */}
        {currentPage === 3 && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-green-500">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{text[language].proposal}</h2>
              <p className="text-gray-600 text-lg">
                {language === 'ar' ? `تم إنشاء عرض مخصص لـ ${formData.companyName}` : `Custom proposal generated for ${formData.companyName}`}
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-gray-900 mb-3 text-lg uppercase tracking-wide">{text[language].selectedServices}</h3>
                <div className="space-y-3">
                  {selectedServices.map((service, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        ✓
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{service.name}</p>
                        <p className="text-sm text-gray-600">{service.desc}</p>
                        <p className="text-sm text-green-600 font-semibold">{service.pricing}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => setShowDownloadModal(true)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Download className="w-6 h-6" />
                  {text[language].download}
                </button>
                <button
                  onClick={resetApp}
                  className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Globe className="w-6 h-6" />
                  {text[language].newProposal}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Download Modal */}
        {showDownloadModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-5xl w-full shadow-2xl" dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">{text[language].chooseFormat}</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Quick Proposal */}
                <button
                  onClick={() => {
                    downloadPDF('quick');
                    setShowDownloadModal(false);
                  }}
                  className="group bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-2xl p-8 border-4 border-green-200 hover:border-green-500 transition-all text-left transform hover:scale-105 shadow-lg"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{text[language].quickProposal}</h3>
                      <p className="text-gray-600 text-sm">{text[language].quickDesc}</p>
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-green-700 mb-2">
                      {language === 'ar' ? 'يشمل:' : 'Includes:'}
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ {language === 'ar' ? 'نظرة عامة على الشركة والتحديات' : 'Company overview & challenges'}</li>
                      <li>✓ {language === 'ar' ? 'خدمات Zoho الموصى بها' : 'Recommended Zoho services'}</li>
                      <li>✓ {language === 'ar' ? 'ملخص الفوائد الرئيسية' : 'Key benefits summary'}</li>
                      <li>✓ {language === 'ar' ? 'الخطوات التالية ومعلومات الاتصال' : 'Next steps & contact info'}</li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-600 italic">{text[language].bestForQuick}</p>
                </button>

                {/* Detailed Proposal */}
                <button
                  onClick={() => {
                    downloadPDF('detailed');
                    setShowDownloadModal(false);
                  }}
                  className="group bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-2xl p-8 border-4 border-blue-200 hover:border-blue-500 transition-all text-left transform hover:scale-105 shadow-lg"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{text[language].detailedProposal}</h3>
                      <p className="text-gray-600 text-sm">{text[language].detailedDesc}</p>
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-blue-700 mb-2">
                      {language === 'ar' ? 'يشمل:' : 'Includes:'}
                    </p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ {language === 'ar' ? 'ملخص تنفيذي' : 'Executive summary'}</li>
                      <li>✓ {language === 'ar' ? 'تفصيل الخدمات' : 'Detailed service breakdown'}</li>
                      <li>✓ {language === 'ar' ? 'سيناريوهات قبل/بعد' : 'Before/After scenarios'}</li>
                      <li>✓ {language === 'ar' ? 'تحليل عائد الاستثمار والجدول الزمني' : 'ROI analysis & timeline'}</li>
                      <li>✓ {language === 'ar' ? 'خارطة طريق التنفيذ' : 'Implementation roadmap'}</li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-600 italic">{text[language].bestForDetailed}</p>
                </button>
              </div>

              <button
                onClick={() => setShowDownloadModal(false)}
                className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold transition-all"
              >
                {text[language].cancel}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZohoPitchGenerator;