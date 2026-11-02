import fs from 'fs';

// 1. Update src/i18n/config.ts
let i18n = fs.readFileSync('src/i18n/config.ts', 'utf8');

// Update LOCALES
i18n = i18n.replace(
  "export const LOCALES = ['en', 'jp', 'ko', 'zh', 'ru', 'pt', 'tr', 'fr', 'es'] as const;",
  "export const LOCALES = ['en', 'jp', 'ko', 'zh', 'ru', 'pt', 'tr', 'fr', 'es', 'mr'] as const;"
);

// Add mr to LOCALE_METADATA
const mrMeta = `  mr: {
    code: 'mr',
    label: 'Marathi',
    nativeName: 'मराठी',
    htmlLang: 'mr',
    ogLocale: 'mr_IN',
  },
};`;

i18n = i18n.replace(/  es: \{[\s\S]*?  \},(\r?\n)\};/, (match, p1) => {
  return match.replace(/(\r?\n)\};/, p1 + mrMeta);
});

// Add mr to UI_TRANSLATIONS
const mrTrans = `  mr: {
    siteTitle: 'गिरीश लाडे — UI/UX डिझायनर आणि फुल-स्टॅक इंजिनिअर',
    siteDescription: 'प्रायव्हसी-फर्स्ट वेब टूल्स, ब्राउझर आयडीई, क्लायंट-साइड प्रोसेसिंग आणि आधुनिक सॉफ्टवेअर आर्किटेक्चर.',
    brandName: 'Girish Lade.',
    nav: {
      home: 'मुख्यपृष्ठ',
      info: 'माहिती',
      projects: 'प्रकल्प',
      journey: 'प्रवास',
      blog: 'ब्लॉग',
      languageLabel: 'भाषा निवडा',
    },
    home: {
      shellKicker: 'अ‍ॅस्ट्रो जेएस · बहुभाषिक आर्किटेक्चर',
      shellHeadline: 'प्रायव्हसी-फर्स्ट वेब इंजिनिअरिंग',
      shellSubtext: 'क्लाउड किंवा सर्व्हरवर डेटा न पाठवता थेट ब्राउझरमध्ये हाय-स्पीड प्रोसेसिंग देणारे आधुनिक डेव्हलपर टूल्स.',
      exploreBlogCta: 'ब्लॉग वाचा',
      infoTitle: '०१. माहिती',
      infoPlaceholder: 'माझा परिचय, तांत्रिक कौशल्ये आणि सॉफ्टवेअर दृष्टिकोन.',
      projectsTitle: '०२. प्रकल्प',
      projectsPlaceholder: 'LadeStack, GB Coder आणि सर्व लाइव्ह टूल्स.',
      journeyTitle: '०३. प्रवास',
      journeyPlaceholder: 'मेकॅनिकल इंजिनिअरिंग ते फुल-स्टॅक सॉफ्टवेअर इंजिनिअरिंगचा प्रवास.',
      awaitingContentLabel: 'सविस्तर माहिती खालील कार्ड्समध्ये उपलब्ध',
    },
    blog: {
      title: 'तांत्रिक ब्लॉग आणि विचार',
      subtitle: 'सॉफ्टवेअर आर्किटेक्चर, ब्राउझर कम्प्युटिंग आणि वेब डेव्हलपमेंटवरील अस्सल तांत्रिक लेख.',
      readArticle: 'लेख वाचा',
      backToBlog: 'सर्व लेखांकडे परत',
      publishedOn: 'प्रसिद्ध केले',
      readingTime: 'मि. वाचन',
      allPostsLabel: 'सर्व लेख',
      markdownBadge: 'मार्कडाउन → एचटीएमएल',
      availableLanguages: 'हा लेख इतर भाषांमध्ये वाचा',
      tableOfContents: 'अनुक्रमणिका',
      copyLink: 'लिंक कॉपी करा',
      copiedLink: 'लिंक कॉपी झाली',
      searchPlaceholder: 'शीर्षक, विषय किंवा टॅगनुसार लेख शोधा...',
      searchAriaLabel: 'ब्लॉग लेख शोधा',
      clearSearch: 'शोध साफ करा',
      noResultsTitle: 'कोणताही लेख सापडला नाही',
      noResultsHint: 'दुसरे शब्द वापरून पहा किंवा वेगळी कॅटेगरी निवडा.',
      filterAll: 'सर्व विषय',
      paginationPrev: 'मागील',
      paginationNext: 'पुढील',
      pageOf: 'पान {current} पैकी {total}',
      showingResults: '{count} लेख दाखवत आहे',
    },
    footer: {
      rights: 'सर्व हक्क राखीव.',
      seoNote: 'अ‍ॅस्ट्रो जेएस सह विकसित · १० भाषांमध्ये नेटिव्ह i18n आणि संपूर्ण SEO ऑप्टिमाइझ्ड',
      activeLocaleLabel: 'सध्याची भाषा',
    },
  },
};`;

i18n = i18n.replace(/  es: \{[\s\S]*?    \},(\r?\n)  \},(\r?\n)\};/, (match, p1, p2) => {
  return match.replace(/(\r?\n)\};$/, p2 + mrTrans);
});

fs.writeFileSync('src/i18n/config.ts', i18n, 'utf8');
console.log('src/i18n/config.ts updated with Marathi config!');

// 2. Update src/data/portfolioContent.ts
let port = fs.readFileSync('src/data/portfolioContent.ts', 'utf8');

const mrSection = `  mr: {
    eyebrow: 'गिरीश बाळासो लाडे · पोर्टफोलिओ आणि प्रॉडक्ट इकोसिस्टम',
    headline: 'UI/UX डिझायनर · फुल-स्टॅक डेव्हलपर · LadeStack चे संस्थापक',
    secondaryHeadline: 'शिक्षण मेकॅनिकल इंजिनिअरिंगचे. आवड आणि ध्येय मात्र उपयुक्त सॉफ्टवेअर प्रॉडक्ट्स घडवण्याचे.',
    location: 'पुणे, महाराष्ट्र, भारत',
    positioningQuote:
      'माझा भर नेहमी अशा सॉफ्टवेअरवर असतो जे वापरताना वापरकर्त्याला अडचण येणार नाही. डेटा पूर्णपणे सुरक्षित आणि प्रायव्हेट राहून लोकांची कामे वेगाने व्हावीत, हेच माझे उद्दिष्ट आहे.',
    oneLinePositioning:
      'पुण्यातील स्वतंत्र डेव्हलपर आणि प्रॉडक्ट डिझायनर; ब्राउझर-फर्स्ट, सुरक्षित आणि उपयुक्त टूल्सची LadeStack इकोसिस्टम विकसित करत आहे.',
    exploreProductsBtn: 'प्रॉडक्ट्स पहा',
    contactBtn: 'संपर्क साधा',
    expandAllLabel: 'सर्व विभाग उघडा',
    collapseAllLabel: 'सर्व विभाग बंद करा',
    clickToExpandHint: 'सविस्तर वाचण्यासाठी क्लिक करा',
    clickToCollapseHint: 'विभाग बंद करण्यासाठी क्लिक करा',
    overviewLabel: 'प्रकल्पाची माहिती',
    useCasesLabel: 'प्रमुख ३ उपयोग',
    techStackLabel: 'वापरलेले तंत्रज्ञान आणि आर्किटेक्चर',
    visitSiteLabel: 'वेबसाईट पहा',
    sourceCodeLabel: 'गिटहब कोड पहा',
    copyEmailLabel: 'admin@ladestack.in कॉपी करा',
    copiedEmailLabel: 'ईमेल कॉपी झाला',
    shortBio:
      'मी गिरीश लाडे. UI/UX डिझाइन आणि फुल-स्टॅक डेव्हलपमेंटच्या माध्यमातून मी विनामूल्य, जलद आणि प्रायव्हेट टूल्स तयार करतो.',
    mediumBio:
      'मी गिरीश बाळासो लाडे, पुण्यात राहणारा सॉफ्टवेअर इंजिनिअर आणि LadeStack चा निर्माता. मेकॅनिकल इंजिनिअरिंगच्या शिस्तीतून शिकलेले सिस्टिम थिंकिंग मी वेब डेव्हलपमेंट आणि एआय-सक्षम टूल्स बनवण्यासाठी वापरतो.',
    contactHeadline: 'चला, काहीतरी नवीन आणि उपयुक्त एकत्र तयार करूया.',
    contactBody:
      'नवीन प्रकल्प, सहकार्य किंवा काही कल्पना असतील तर माझ्याशी नक्की संपर्क साधा. माझे काम तुम्ही GitHub वर पाहू शकता किंवा मला थेट ईमेल करू शकता.',
    closingParagraph:
      'प्रत्येक प्रोजेक्टमधून वापरकर्त्याला खरोखर फायदा झाला पाहिजे, हाच माझा नेहमीचा प्रयत्न असतो. सोपे, सुंदर आणि लोकांच्या कामाला येणारे सॉफ्टवेअर मला घडवायचे आहे.',
    closingGoal:
      'ध्येय अगदी सरळ आहे: उपयुक्त सॉफ्टवेअर प्रत्येकाला सहज उपलब्ध झाले पाहिजे, समजायला सोपे असले पाहिजे आणि वापरताना समाधान दिले पाहिजे.',
    sectionTitles: {
      profile: {
        title: 'माझा परिचय आणि व्यावसायिक ओळख',
        subtitle: 'थोडक्यात माहिती, व्यावसायिक पार्श्वभूमी आणि डिझाइन दृष्टिकोन',
        badge: 'परिचय',
      },
      story: {
        title: 'माझा प्रवास — इंजिनिअरिंग ते कोडिंग',
        subtitle: 'मेकॅनिकल इंजिनिअरिंगपासून ते फुल-स्टॅक वेब डेव्हलपर बनण्यापर्यंतचा खराखुरा प्रवास',
        badge: '५ टप्पे',
      },
      education: {
        title: 'शिक्षण आणि शिकण्याची पद्धत',
        subtitle: 'इंजिनिअरिंगची पदवी, स्वतः शिकलेली कौशल्ये आणि सिस्टिम थिंकिंगचा पाया',
        badge: 'शिक्षण',
      },
      vision: {
        title: 'दृष्टिकोन आणि १० महत्त्वाची मूल्ये',
        subtitle: 'LadeStack चे उद्दिष्ट आणि सॉफ्टवेअर बनवताना पाळली जाणारी १० मूलभूत तत्त्वे',
        badge: '१० मूल्ये',
      },
      ecosystem: {
        title: 'LadeStack — ब्रँड आणि प्रॉडक्ट इकोसिस्टम',
        subtitle: 'ब्राउझर-फर्स्ट टूल्स, स्थानिक डेटा प्रोसेसिंग आणि १० भाषांमधील पोहोच',
        badge: 'ladestack.in',
      },
      products: {
        title: 'थेट लाइव्ह असलेले प्रमुख प्रकल्प',
        subtitle: 'GB Coder, LS PDF सह वापरण्यासाठी तयार असलेले सर्व ९ वेब अ‍ॅप्स',
        badge: '९ प्रकल्प',
      },
      prototypes: {
        title: 'नवीन प्रयोग आणि भविष्यातील दिशा',
        subtitle: 'एआय अ‍ॅप बिल्डर, व्हिज्युअल बुकमार्क मॅनेजर आणि क्लाउड संकल्पना',
        badge: '९ प्रयोग',
      },
      capabilities: {
        title: 'तांत्रिक कौशल्ये आणि कामाचे क्षेत्र',
        subtitle: 'फ्रंटएंड, बॅकएंड, थ्री.जेएस ३डी ग्राफिक्स आणि स्थानिक डेटा सुरक्षेतील प्रभुत्व',
        badge: '१० कौशल्ये',
      },
      practice: {
        title: 'मी काय योगदान देतो, ८ टप्प्यांची पद्धत आणि आव्हाने',
        subtitle: 'सॉफ्टवेअर डिझाइनची ८ टप्प्यांची कार्यपद्धती आणि सोडवलेली तांत्रिक आव्हाने',
        badge: 'पद्धत',
      },
      contact: {
        title: 'संपर्क, सोशल प्रोफाईल्स आणि लिंक्स',
        subtitle: 'GitHub, LinkedIn, Instagram आणि थेट ईमेल पत्ता',
        badge: 'संपर्क',
      },
    },
  },
};`;

port = port.replace(/  es: \{[\s\S]*?    \},(\r?\n)  \},(\r?\n)\};/, (match, p1, p2) => {
  return match.replace(/(\r?\n)\};$/, p2 + mrSection);
});

fs.writeFileSync('src/data/portfolioContent.ts', port, 'utf8');
console.log('src/data/portfolioContent.ts updated with Marathi overrides!');

