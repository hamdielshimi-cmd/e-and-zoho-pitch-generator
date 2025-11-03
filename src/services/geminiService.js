const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const generateAIContent = async ({ companyData, industry, knowledgeBase, selectedServices, objections, task, language = 'ar' }) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key not found');
  }

  const prompt = buildPrompt({ companyData, industry, knowledgeBase, selectedServices, objections, task, language });

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return getFallbackContent(task, language);
  }
};

const buildPrompt = ({ companyData, industry, knowledgeBase, selectedServices, objections, task, language }) => {
  const isArabic = language === 'ar';
  
  const basePrompt = isArabic ? `
أنت خبير مبيعات في Zoho One لشركة e& مصر. استخدم قاعدة المعرفة التالية ومعلومات الشركة لتوليد عروض أعمال احترافية.

معلومات الشركة:
- الاسم: ${companyData.companyName}
- الصناعة: ${industry}
- الوصف: ${companyData.description || 'غير مقدم'}
- الموقع الإلكتروني: ${companyData.companyUrl || 'غير مقدم'}
- وسائل التواصل الاجتماعي: ${companyData.facebook || 'غير مقدم'}, ${companyData.instagram || 'غير مقدم'}, ${companyData.linkedin || 'غير مقدم'}, ${companyData.tiktok || 'غير مقدم'}
- اعتراضات العميل: ${objections || 'لم يتم تقديم أي اعتراضات'}

سياق قاعدة المعرفة:
${knowledgeBase ? `المواد التدريبية المتاحة: تم معالجة ${knowledgeBase.pdfCount} ملف PDF` : 'لم يتم تحميل قاعدة المعرفة'}

المهمة: ${task}

` : `
You are a Zoho One sales expert for e& Egypt. Use the following knowledge base and company information to generate professional business proposals.

COMPANY INFORMATION:
- Name: ${companyData.companyName}
- Industry: ${industry}
- Description: ${companyData.description || 'Not provided'}
- Website: ${companyData.companyUrl || 'Not provided'}
- Social Media: ${companyData.facebook || 'Not provided'}, ${companyData.instagram || 'Not provided'}, ${companyData.linkedin || 'Not provided'}, ${companyData.tiktok || 'Not provided'}
- Client Objections: ${objections || 'None provided'}

KNOWLEDGE BASE CONTEXT:
${knowledgeBase ? `Training materials available: ${knowledgeBase.pdfCount} PDFs processed` : 'No knowledge base loaded'}

TASK: ${task}

`;

  if (isArabic) {
    switch (task) {
      case 'enhance_industry_analysis':
        return basePrompt + `
بناءً على معلومات الشركة وقاعدة معرفة Zoho، قدم تحليلًا محسنًا للصناعة ${industry} في السوق المصري. ركز على:
1. التحديات الحالية للسوق في مصر
2. فرص التحول الرقمي
3. كيف يمكن لـ Zoho One معالجة هذه التحديات
4. عوامل النجاح الرئيسية لهذه الصناعة

اجعل الرد موجزًا وقابل للتنفيذ.`;
      
      case 'generate_proposal_insights':
        return basePrompt + `
قم بتوليد رؤى وتوصيات رئيسية لـ ${companyData.companyName} في قطاع ${industry}. شمل:
1. 3 تطبيقات Zoho الأكثر ملاءمة لأعمالهم
2. تأثير الأعمال المتوقع وعائد الاستثمار
3. المزايا التنافسية في السوق المصري
4. اعتبارات التنفيذ

اجعلها محددة للتحديات والأهداف الموصوفة.`;
      
      case 'enhance_proposal_content':
        return basePrompt + `
عزز محتوى عرض الأعمال لـ ${companyData.companyName}. ركز على:
1. ملخص تنفيذي يسلط الضوء على الفوائد الرئيسية
2. مقترحات القيمة الخاصة بالصناعة
3. اعتبارات خارطة طريق التنفيذ
4. النتائج المتوقعة ومقاييس النجاح

اجعلها مقنعة ومصممة خصيصًا للسياق التجاري المصري.`;
      
      default:
        return basePrompt + 'قدم توصيات عامة لهذه الشركة بناءً على إمكانيات Zoho One.';
    }
  } else {
    switch (task) {
      case 'enhance_industry_analysis':
        return basePrompt + `
Based on the company information and Zoho knowledge base, provide enhanced industry analysis for ${industry} in the Egyptian market. Focus on:
1. Current market challenges specific to Egypt
2. Digital transformation opportunities
3. How Zoho One can address these challenges
4. Key success factors for this industry

Keep the response concise and actionable.`;
      
      case 'generate_proposal_insights':
        return basePrompt + `
Generate key insights and recommendations for ${companyData.companyName} in the ${industry} sector. Include:
1. 3 most relevant Zoho applications for their business
2. Expected business impact and ROI
3. Competitive advantages in Egyptian market
4. Implementation considerations

Make it specific to their described challenges and goals.`;
      
      case 'enhance_proposal_content':
        return basePrompt + `
Enhance the business proposal content for ${companyData.companyName}. Focus on:
1. Executive summary that highlights key benefits
2. Industry-specific value propositions
3. Implementation roadmap considerations
4. Expected outcomes and success metrics

Make it compelling and tailored to Egyptian business context.`;
      
      default:
        return basePrompt + 'Provide general recommendations for this company based on Zoho One capabilities.';
    }
  }
};

const getFallbackContent = (task, language) => {
  const isArabic = language === 'ar';
  
  if (isArabic) {
    switch (task) {
      case 'enhance_industry_analysis':
        return 'تحليل الصناعة: بناءً على قاعدة معرفة Zoho، نوصي بالتركيز على حلول Zoho One المتكاملة لتحسين الكفاءة التشغيلية وزيادة الإيرادات في السوق المصري.';
      case 'generate_proposal_insights':
        return 'الرؤى الرئيسية: Zoho One يوفر منصة متكاملة لتحويل الأعمال الرقمية في مصر مع دعم كامل للغة العربية ومراكز بيانات محلية.';
      case 'enhance_proposal_content':
        return 'ملخص تنفيذي: Zoho One هو نظام التشغيل الشامل للأعمال الذي يوفر 55+ تطبيقًا متكاملاً لتحقيق التحول الرقمي والتميز التشغيلي.';
      default:
        return 'توصيات Zoho One: منصة متكاملة لتحقيق النمو والكفاءة في السوق المصري.';
    }
  } else {
    switch (task) {
      case 'enhance_industry_analysis':
        return 'Industry Analysis: Based on Zoho knowledge base, we recommend focusing on Zoho One integrated solutions to improve operational efficiency and increase revenue in the Egyptian market.';
      case 'generate_proposal_insights':
        return 'Key Insights: Zoho One provides an integrated platform for digital business transformation in Egypt with full Arabic support and local data centers.';
      case 'enhance_proposal_content':
        return 'Executive Summary: Zoho One is the comprehensive business operating system that provides 55+ integrated applications for digital transformation and operational excellence.';
      default:
        return 'Zoho One Recommendations: Integrated platform for achieving growth and efficiency in the Egyptian market.';
    }
  }
};