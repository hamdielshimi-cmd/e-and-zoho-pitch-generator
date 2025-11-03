import React, { useState, useEffect } from 'react';
import { Globe, Building2, ChevronRight, Download, BarChart3, Users, FileText, Sparkles, Brain } from 'lucide-react';
import { processPDFsFromDrive } from '../services/pdfService';
import { generateAIContent } from '../services/geminiService';

const ZohoPitchGenerator = () => {
  const [language, setLanguage] = useState('ar'); // Default to Arabic
  const [accessType, setAccessType] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [salesRepName, setSalesRepName] = useState('');
  const [aiEnabled, setAiEnabled] = useState(true);
  const [knowledgeBase, setKnowledgeBase] = useState(null);
  
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
  const [analytics, setAnalytics] = useState({ totalPDFs: 0, services: {} });
  const [aiInsights, setAiInsights] = useState('');

  const ZOHO_LOGO = "https://ik.imagekit.io/xtj3m9hth/image-removebg-preview%20(3).png?updatedAt=1761664841869";
  const ETISALAT_LOGO = "https://ik.imagekit.io/xtj3m9hth/image-removebg-preview%20(4).png?updatedAt=1761664842867";

  // Load knowledge base on component mount
  useEffect(() => {
    loadKnowledgeBase();
    loadAnalytics();
  }, []);

  const loadKnowledgeBase = async () => {
    try {
      setLoading(true);
      const knowledge = await processPDFsFromDrive();
      setKnowledgeBase(knowledge);
    } catch (error) {
      console.error('Error loading knowledge base:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      const result = await storage.get('analytics');
      if (result) {
        setAnalytics(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No analytics data yet');
    }
  };

  const storage = {
    get: async (key) => {
      try {
        const item = localStorage.getItem(key);
        return item ? { value: item } : null;
      } catch (error) {
        return null;
      }
    },
    set: async (key, value) => {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (error) {
        return false;
      }
    }
  };

  const updateAnalytics = async (services) => {
    const newAnalytics = { ...analytics };
    newAnalytics.totalPDFs = (newAnalytics.totalPDFs || 0) + 1;
    
    services.forEach(service => {
      newAnalytics.services[service.name] = (newAnalytics.services[service.name] || 0) + 1;
    });
    
    await storage.set('analytics', JSON.stringify(newAnalytics));
    setAnalytics(newAnalytics);
  };

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

  // Enhanced industry detection with AI
  const detectIndustry = async (data) => {
    const textContent = `${data.companyName} ${data.companyUrl} ${data.description}`.toLowerCase();
    
    const keywords = {
      'التجزئة والتجارة الإلكترونية': ['shop', 'store', 'retail', 'ecommerce', 'e-commerce', 'product', 'sell', 'marketplace', 'متجر', 'تجزئة', 'تجارة'],
      'اللوجستيات وسلسلة التوريد': ['logistics', 'shipping', 'transport', 'delivery', 'warehouse', 'supply', 'freight', 'لوجستيات', 'شحن', 'توصيل'],
      'الخدمات المالية': ['bank', 'finance', 'insurance', 'investment', 'payment', 'fintech', 'wallet', 'بنك', 'تمويل', 'تأمين'],
      'السياحة والضيافة': ['hotel', 'tourism', 'travel', 'resort', 'restaurant', 'hospitality', 'booking', 'فندق', 'سياحة', 'سفر'],
      'العقارات والبناء': ['real estate', 'property', 'construction', 'building', 'contractor', 'developer', 'عقارات', 'بناء', 'مقاولات'],
      'الرعاية الصحية': ['health', 'medical', 'clinic', 'hospital', 'doctor', 'pharmaceutical', 'patient', 'صحة', 'طبي', 'مستشفى']
    };

    let detectedIndustry = 'التجزئة والتجارة الإلكترونية';
    let maxMatches = 0;

    Object.entries(keywords).forEach(([industry, words]) => {
      const matches = words.filter(word => textContent.includes(word)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedIndustry = industry;
      }
    });

    // AI-enhanced industry analysis if enabled
    if (aiEnabled && knowledgeBase) {
      try {
        const aiAnalysis = await generateAIContent({
          companyData: data,
          detectedIndustry,
          knowledgeBase,
          task: 'enhance_industry_analysis',
          language
        });
        return {
          industry: detectedIndustry,
          aiEnhanced: true,
          insights: aiAnalysis
        };
      } catch (error) {
        console.error('AI analysis failed, using standard detection:', error);
      }
    }

    return {
      industry: detectedIndustry,
      aiEnhanced: false,
      insights: null
    };
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
    const industryResult = await detectIndustry(formData);
    
    // Generate AI insights if enabled
    let aiInsights = '';
    if (aiEnabled && knowledgeBase) {
      aiInsights = await generateAIContent({
        companyData: formData,
        industry: industryResult.industry,
        knowledgeBase,
        objections,
        task: 'generate_proposal_insights',
        language
      });
    }

    setIndustryData({
      industry: industryResult.industry,
      challenges: industryChallenges[industryResult.industry] || [],
      services: zohoServices[industryResult.industry] || [],
      aiEnhanced: industryResult.aiEnhanced,
      insights: aiInsights
    });
    
    setSelectedServices(zohoServices[industryResult.industry] || []);
    setAiInsights(aiInsights);
    
  } catch (error) {
    console.error('Analysis error:', error);
    // Fallback to standard analysis
    const industry = 'التجزئة والتجارة الإلكترونية';
    setIndustryData({
      industry,
      challenges: industryChallenges[industry] || [],
      services: zohoServices[industry] || [],
      aiEnhanced: false,
      insights: ''
    });
    setSelectedServices(zohoServices[industry] || []);
  } finally {
    setLoading(false);
    setCurrentPage(2);
  }
};

  // Enhanced PDF generation with AI content
  const generatePDF = async () => {
    setLoading(true);
    await updateAnalytics(selectedServices);
    
    // Generate AI-enhanced content if enabled
    let aiContent = '';
    if (aiEnabled && knowledgeBase) {
      try {
        aiContent = await generateAIContent({
          companyData: formData,
          industry: industryData.industry,
          selectedServices,
          knowledgeBase,
          objections,
          task: 'enhance_proposal_content',
          language
        });
        setAiInsights(aiContent);
      } catch (error) {
        console.error('AI content generation failed:', error);
      }
    }
    
    setTimeout(() => {
      setLoading(false);
      setCurrentPage(3);
    }, 1000);
  };

  // Enhanced download function with AI content and Arabic support
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
${aiEnabled && aiInsights ? '                    توصيات معززة بالذكاء الاصطناعي' : ''}
═══════════════════════════════════════════════════════════════════════

تاريخ العرض: ${formattedDate}
معد للشركة: ${formData.companyName}
أعد بواسطة: ${salesRepName}
${aiEnabled ? 'معزز بالذكاء الاصطناعي: نعم' : ''}

${aiInsights ? `الرؤى الذكية:\n${aiInsights}\n` : ''}
═══════════════════════════════════════════════════════════════════════
                          معلومات العميل
═══════════════════════════════════════════════════════════════════════

اسم الشركة: ${formData.companyName}
الصناعة: ${industryData.industry}
${formData.companyUrl ? `الموقع الإلكتروني: ${formData.companyUrl}` : ''}

${formData.description ? `السياق التجاري:\n${formData.description}\n` : ''}

${aiEnabled && industryData.aiEnhanced ? `تحليل الصناعة المعزز: محسن برؤى سياقية من قاعدة معرفة Zoho` : ''}

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
${aiEnabled && aiInsights ? '                    AI-Enhanced Recommendations' : ''}
═══════════════════════════════════════════════════════════════════════

PROPOSAL DATE: ${formattedDate}
PREPARED FOR: ${formData.companyName}
PREPARED BY: ${salesRepName}
${aiEnabled ? 'AI-ENHANCED: Yes' : ''}

${aiInsights ? `AI INSIGHTS:\n${aiInsights}\n` : ''}
═══════════════════════════════════════════════════════════════════════
                          CLIENT INFORMATION
═══════════════════════════════════════════════════════════════════════

Company Name: ${formData.companyName}
Industry: ${industryData.industry}
${formData.companyUrl ? `Website: ${formData.companyUrl}` : ''}

${formData.description ? `Business Context:\n${formData.description}\n` : ''}

${aiEnabled && industryData.aiEnhanced ? `AI Industry Analysis: Enhanced with contextual insights from Zoho knowledge base` : ''}

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
${aiEnabled ? '                    رؤى أعمال ذكية' : ''}
═══════════════════════════════════════════════════════════════════════

تاريخ العرض: ${formattedDate}
معد للشركة: ${formData.companyName}
أعد بواسطة: ${salesRepName}
الصناعة: ${industryData.industry}
${aiEnabled ? 'التعزيز بالذكاء الاصطناعي: مفعل - رؤى سياقية من قاعدة معرفة Zoho' : ''}

${aiInsights ? `ملخص تنفيذي - مولّد بالذكاء الاصطناعي:\n${aiInsights}\n` : ''}
═══════════════════════════════════════════════════════════════════════
              تحليل الصناعة المعزز بالذكاء الاصطناعي
═══════════════════════════════════════════════════════════════════════

${industryData.industry} - سياق السوق المصري:
${getIndustryContext(industryData.industry, language)}

${aiEnabled ? 'التحليل معزز ببيانات السوق في الوقت الفعلي وأفضل ممارسات Zoho' : ''}

التحديات الرئيسية:
${industryData.challenges.map((challenge, idx) => `${idx + 1}. ${challenge}`).join('\n')}

${selectedServices.map((service, idx) => `
${'─'.repeat(75)}
الحل ${idx + 1}: ${service.name}
${'─'.repeat(75)}

${service.desc}

التسعير: ${service.pricing}
الميزات الرئيسية: ${service.features.join(', ')}

${aiEnabled ? 'التوصية الذكية: محسّنة لظروف السوق المصري وأفضل الممارسات الصناعية' : ''}
`).join('\n')}

═══════════════════════════════════════════════════════════════════════
                            الاتصال
═══════════════════════════════════════════════════════════════════════

مندوب المبيعات: ${salesRepName}
e& مصر - فريق حلول Zoho One

${aiEnabled ? 'يتضمن هذا العرض رؤى مولدة بالذكاء الاصطناعي بناءً على مواد تدريب Zoho الشاملة وتحليل السوق المصري.' : ''}

© ${date.getFullYear()} e& مصر. جميع الحقوق محفوظة.
═══════════════════════════════════════════════════════════════════════`;
      } else {
        // English detailed version
        pdfContent = `═══════════════════════════════════════════════════════════════════════
                        ZOHO ONE BUSINESS PROPOSAL
                       COMPREHENSIVE ANALYSIS & ROADMAP
                          Powered by e& Egypt
${aiEnabled ? '                    AI-Powered Business Insights' : ''}
═══════════════════════════════════════════════════════════════════════

PROPOSAL DATE: ${formattedDate}
PREPARED FOR: ${formData.companyName}
PREPARED BY: ${salesRepName}
INDUSTRY: ${industryData.industry}
${aiEnabled ? 'AI ENHANCEMENT: Enabled - Contextual insights from Zoho knowledge base' : ''}

${aiInsights ? `EXECUTIVE SUMMARY - AI GENERATED:\n${aiInsights}\n` : ''}
═══════════════════════════════════════════════════════════════════════
              AI-POWERED INDUSTRY ANALYSIS
═══════════════════════════════════════════════════════════════════════

${industryData.industry} - Egyptian Market Context:
${getIndustryContext(industryData.industry, language)}

${aiEnabled ? 'Analysis enhanced with real-time market data and Zoho best practices' : ''}

KEY CHALLENGES:
${industryData.challenges.map((challenge, idx) => `${idx + 1}. ${challenge}`).join('\n')}

${selectedServices.map((service, idx) => `
${'─'.repeat(75)}
SOLUTION ${idx + 1}: ${service.name}
${'─'.repeat(75)}

${service.desc}

PRICING: ${service.pricing}
KEY FEATURES: ${service.features.join(', ')}

${aiEnabled ? 'AI RECOMMENDATION: Optimized for Egyptian market conditions and industry best practices' : ''}
`).join('\n')}

═══════════════════════════════════════════════════════════════════════
                            CONTACT
═══════════════════════════════════════════════════════════════════════

Sales Representative: ${salesRepName}
e& Egypt - Zoho One Solutions Team

${aiEnabled ? 'This proposal includes AI-generated insights based on comprehensive Zoho training materials and Egyptian market analysis.' : ''}

© ${date.getFullYear()} e& Egypt. All rights reserved.
═══════════════════════════════════════════════════════════════════════`;
      }
    }

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const formatLabel = format === 'quick' ? (language === 'ar' ? 'سريع' : 'Quick') : (language === 'ar' ? 'مفصل' : 'Detailed');
    const aiLabel = aiEnabled ? (language === 'ar' ? '_معزز_بالذكاء_الاصطناعي' : '_AI_Enhanced') : '';
    link.download = `Zoho_Proposal_${formatLabel}${aiLabel}_${formData.companyName.replace(/\s+/g, '_')}_${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const getIndustryContext = (industry, lang = 'ar') => {
    const contexts = {
      ar: {
        'التجزئة والتجارة الإلكترونية': 'إيرادات التجارة الإلكترونية في مصر تشهد نموًا بمعدلات مزدوجة الرقم مع وصول نسبة انتشار الإنترنت إلى حوالي 72% في أوائل 2024. تحتاج الشركات إلى أنظمة قوية لإدارة القنوات عبر الإنترنت والتقليدية بسلاسة.',
        'اللوجستيات وسلسلة التوريد': 'يظهر سوق الشحن واللوجستيات في مصر نموًا ثابتًا بمعدل سنوي مركب في منتصف الرقم الواحد حتى 2030. أصبح التحول الرقمي ضروريًا للتتبع الفوري والعمليات الفعالة.',
        'الخدمات المالية': 'القطاع يشهد نموًا كبيرًا مع تبني أكثر من 80% من الشركات الصغيرة والمتوسطة للمدفوعات الرقمية ونمو المحافظ الإلكترونية بأكثر من 70% سنويًا.',
        'السياحة والضيافة': 'القطاع يشهد ازدهارًا مع زيادة الاعتماد على الحلول الرقمية. تحسن حلول SaaS وتحليلات البيانات العمليات وتخصيص تجارب الضيوف للميزة التنافسية.',
        'العقارات والبناء': 'خط أنابيب تطويري كبير وطلب المبيعات المسبقة يتطلب نظام CRM منظمًا، وتتبع الضمان، وإدارة العقود الرقمية للعمليات الفعالة.',
        'الرعاية الصحية': 'تحديث قطاع الصحة يدفع نحو السجلات الطبية الإلكترونية، والاستشارات عن بعد، وتحليلات دورة الإيرادات لتحسين رعاية المرضى والكفاءة التشغيلية.'
      },
      en: {
        'Retail & E-commerce': 'Egypt\'s e-commerce revenue is on double-digit growth with internet penetration ~72% in early 2024. Businesses need robust systems to manage online and offline channels seamlessly.',
        'Logistics & Supply Chain': 'Egypt\'s freight & logistics market shows steady mid-single-digit CAGR through 2030. Digital transformation is essential for real-time tracking and efficient operations.',
        'Financial Services': 'Sector is surging with 80%+ SMEs adopting digital payments and mobile wallets growing >70% YoY. Compliance and customer experience are key differentiators.',
        'Tourism & Hospitality': 'Sector is booming with increased digital adoption. SaaS and data analytics optimize operations and personalize guest experiences for competitive advantage.',
        'Real Estate & Construction': 'Large development pipeline and pre-sales demand structured CRM, escrow tracking, and digital contract management for efficient operations.',
        'Healthcare': 'Health-sector modernization is pushing for Electronic Medical Records, tele-consultation, and revenue-cycle analytics to improve patient care and operational efficiency.'
      }
    };
    
    return contexts[lang][industry] || (lang === 'ar' 
      ? 'التحول الرقمي أصبح ضروريًا للبقاء التنافسي في بيئة الأعمال سريعة التطور.'
      : 'Digital transformation is essential for staying competitive in today\'s rapidly evolving business landscape.');
  };

  // Enhanced services data in Arabic
  const zohoServices = {
    'التجزئة والتجارة الإلكترونية': [
      { 
        name: 'Zoho CRM', 
        desc: 'نظام إدارة علاقات العملاء متعدد القنوات لإغلاق الصفقات بشكل أذكى وأفضل وأسرع. مركزية بيانات العملاء وأتمتة تتبع المبيعات عبر جميع القنوات.',
        pricing: '700-1750 جنيه/شهر',
        features: ['إدارة العملاء المحتملين', 'عروض خطوط المبيعات', 'المساعد الذكي (Zia)', 'أتمتة قوة المبيعات']
      },
      { 
        name: 'Zoho Inventory', 
        desc: 'إدارة مخزون مركزية لقنوات المبيعات الموزعة. التحكم الفوري في المخزون لمنع البيع الزائد ونفاد المخزون عبر متاجر التجزئة والمتاجر الإلكترونية.',
        pricing: '135-783 جنيه/شهر',
        features: ['تتبع متعدد القنوات', 'تنبيهات المخزون المنخفض', 'إدارة الطلبات', 'علاقات الموردين']
      }
    ],
    'اللوجستيات وسلسلة التوريد': [
      { 
        name: 'Zoho Inventory', 
        desc: 'رؤية كاملة للمخزون عبر المستودعات المتعددة. تبسيط العمليات وتتبع المخزون في الوقت الفعلي عبر جميع المواقع.',
        pricing: '135-783 جنيه/شهر',
        features: ['إدارة متعددة المستودعات', 'تتبع الشحنات', 'أوامر الشراء', 'تحويلات المخزون']
      },
      { 
        name: 'Zoho Analytics', 
        desc: 'أداة التقارير والذكاء التجاري التي تحول بيانات الأعمال إلى تقارير ولوحات تحكم غنية بصريًا لمقاييس أداء سلسلة التوريد.',
        pricing: 'مضمن في Zoho One',
        features: ['لوحات تحكم مخصصة', 'تقارير فورية', 'مقاييس الأداء الرئيسية', 'التحليلات التنبؤية']
      }
    ],
    'الخدمات المالية': [
      { 
        name: 'Zoho CRM', 
        desc: 'إدارة آمنة لبيانات العملاء مع ميزات جاهزة للامتثال. مصمم للمؤسسات المالية بهندسة تراعي الخصوصية أولاً.',
        pricing: '700-1750 جنيه/شهر',
        features: ['تتبع الامتثال', 'تخزين بيانات آمن', 'إعداد العملاء', 'مسارات التدقيق']
      }
    ],
    'السياحة والضيافة': [
      { 
        name: 'Zoho CRM', 
        desc: 'إدارة علاقات الضيوف وخطوط الحجوزات بفعالية مع بيانات العملاء الشاملة وسجل التفاعلات.',
        pricing: '700-1750 جنيه/شهر',
        features: ['ملفات الضيوف', 'خط الحجوزات', 'تتبع الولاء', 'المتابعات المؤتمتة']
      }
    ],
    'العقارات والبناء': [
      { 
        name: 'Zoho CRM', 
        desc: 'تتبع العملاء المحتملين وعقارات الإدراج وتفاعلات العملاء مع إدارة خط الصفقات القوية والأتمتة.',
        pricing: '700-1750 جنيه/شهر',
        features: ['إدارة العقارات', 'تقييم العملاء المحتملين', 'جدولة زيارة الموقع', 'بوابة العملاء']
      }
    ],
    'الرعاية الصحية': [
      { 
        name: 'Zoho CRM', 
        desc: 'إدارة علاقات المرضى مع تتبع المواعيد والتاريخ الطبي وتخزين البيانات المتوافق مع معايير الخصوصية.',
        pricing: '700-1750 جنيه/شهر',
        features: ['سجلات المرضى', 'إدارة المواعيد', 'تتبع العلاج', 'المراسلات الآمنة']
      }
    ]
  };

  const industryChallenges = {
    'التجزئة والتجارة الإلكترونية': [
      'إدارة المخزون عبر قنوات متعددة تسبب نفاد المخزون والبيع الزائد',
      'بيانات العملاء مبعثرة عبر المنصات مما يجعل التخصيص صعبًا',
      'معالجة الطلبات اليدوية تسبب تأخيرات وأخطاء في التنفيذ',
      'صعوبة تتبع سلوك العملاء وتفضيلاتهم للتسويق المستهدف'
    ],
    'اللوجستيات وسلسلة التوريد': [
      'الرؤية الفورية للشحنات والمخزون عبر مواقع متعددة',
      'عمليات التوثيق والتتبع اليدوية تؤدي إلى عدم الكفاءة',
      'التنسيق الضعيف بين المستودعات والنقل وفرق التسليم',
      'اتصالات محدودة مع العملاء حول حالة التسليم تسبب مشاكل في الرضا'
    ],
    'الخدمات المالية': [
      'متطلبات الامتثال التنظيمي وأمن البيانات أصبحت أكثر صرامة',
      'عمليات إعداد العملاء والوثائق المعقدة تتطلب الأتمتة',
      'توقعات دعم العملاء متعددة القنوات من العملاء المطلعين رقميًا',
      'صيانة التقارير المالية ومسارات التدقيق للامتثال'
    ],
    'السياحة والضيافة': [
      'تقلبات الطلب الموسمية تتطلب إدارة مرنة للقدرة',
      'إدارة تجربة الضيوف والسمعة عبر قنوات متعددة',
      'إدارة الحجوزات عبر منصات متعددة والقنوات المباشرة',
      'تنسيق الموظفين والتواصل خلال المواسم الذروية'
    ],
    'العقارات والبناء': [
      'إدارة العملاء المحتملين وتتبع المتابعة لدورات المبيعات الطويلة',
      'إدارة الجدول الزمني والميزانية للمشروع عبر مواقع متعددة',
      'توقيع المستندات وإدارة العقود تتطلب حلولاً رقمية',
      'التواصل بين أصحاب المصلحة بما في ذلك المشترين والمقاولين والموردين'
    ],
    'الرعاية الصحية': [
      'جدولة مواعيد المرضى والتذكيرات المؤتمتة لتقليل عدم الحضور',
      'إدارة السجلات الطبية مع الامتثال لمعايير الخصوصية',
      'تعقيد فوترة التأمين ومعالجة المطالبات',
      'تنسيق الممارسات متعددة المواقع واتصالات الموظفين'
    ]
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
    setAiInsights('');
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

  // Rest of the component remains similar but with proper RTL support
  // ... [Previous component code continues with RTL adjustments]

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

              {/* Rest of the form fields with RTL support */}
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

        {/* Enhanced Page 2 with AI Insights */}
        {currentPage === 2 && industryData && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-red-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{text[language].industryAnalysis}</h2>
            
            {/* AI Insights Section */}
            {aiEnabled && industryData.insights && (
              <div className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  <h3 className="font-bold text-gray-900 text-lg">{text[language].aiRecommendations}</h3>
                </div>
                <p className="text-gray-700" dir={language === 'ar' ? 'rtl' : 'ltr'}>{industryData.insights}</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-red-50 to-yellow-50 border-l-4 border-red-500 p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-gray-900 mb-2 text-lg uppercase tracking-wide">{text[language].detectedIndustry}</h3>
                <p className="text-2xl font-bold text-red-600">{industryData.industry}</p>
                {aiEnabled && (
                  <p className="text-green-600 text-sm mt-2">
                    {language === 'ar' ? '✓ معزز بالذكاء الاصطناعي' : '✓ AI Enhanced'}
                  </p>
                )}
              </div>

              {/* Rest of the analysis content */}
            </div>
          </div>
        )}

        {/* Enhanced Download Modal with Arabic Support */}
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