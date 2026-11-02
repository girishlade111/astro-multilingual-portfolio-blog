const fs = require('fs');
const path = require('path');

const slug = 'honest-engineering-rejecting-vanity-metrics';
const pubDate = '2026-10-24';
const readingTime = 6;

const articles = {
  en: {
    title: "Honest Engineering: Why I Value Working Software Over Vanity Metrics",
    description: "In a tech culture obsessed with inflated user counts, exaggerated funding, and corporate buzzwords, here is why LadeStack chooses radical technical honesty.",
    category: "Engineering Ethics · Transparency",
    content: `If you spend an hour browsing tech Twitter, LinkedIn, or product launch forums, you will notice a pervasive pattern: almost everyone is claiming to build "revolutionary AI paradigms," bragging about astronomical user metrics, or presenting experimental weekend prototypes as battle-tested enterprise platforms.

The software industry has developed an obsession with vanity metrics:
- Fabricated total user numbers ("100,000+ developers rely on us!")
- Exaggerated uptime statistics and hypothetical revenue figures
- Conflating a concept on a Figma artboard with an actual shipped feature
- Claiming fancy degrees, corporate titles, or unearned certifications to manufacture false authority

When I built my portfolio and established **LadeStack** (https://ladestack.in/), I made a conscious choice to reject this entire circus. I believe that quiet, honest craftsmanship will always outlast loud marketing noise.

## The Danger of Inflated Credentials

In early drafts of online profiles and generic web agency templates, people often assume you should claim a Computer Science degree or invent extensive corporate experience to look credible. 

I explicitly reject that. My formal technical education is in **Mechanical Engineering**: I completed my Diploma in Mechanical Engineering at Fabtech Technical Campus in 2021, followed by engineering studies at SVERI's College of Engineering in Pandharpur.

I have never pretended to hold a university computer science degree, and I have never claimed certifications that I did not earn. Why? Because true technical credibility does not come from a decorative paper badge; it comes from your ability to write reliable software, understand real-world constraints, and solve concrete problems for users.

When someone opens **GB Coder** (https://code.ladestack.in/) or merges documents using **LS PDF** (https://pdf.ladestack.in/), the browser does not care what degree the programmer holds. The browser only cares whether the code executes efficiently, respects system memory, and handles errors without crashing.

## Distinguishing Shipped Features from Roadmap Concepts

Another major ethical problem in tech marketing is the temptation to present prototypes or future plans as completed, production-ready features.

At LadeStack, we enforce a strict standard of technical honesty:
- **Shipped Products**: Tools like **GB Coder**, **MD2PDF** (https://md2pdf.ladestack.in/), **LS PDF**, **LS Image Compressor** (https://img.ladestack.in/), **Swift Resume** (https://resume.ladestack.in/), and **Bharat Land Converter** (https://land.ladestack.in/) are live, accessible, and functional.
- **Roadmap Explorations**: Advanced ideas like our browser-based AI App Builder, cloud synchronization, or collaborative editing are clearly labeled as explorations or development concepts. We never advertise them as finished until they have been thoroughly tested and deployed.

Failing to make this distinction is not clever marketing; it is deceptive engineering.

## Why We Reject Fake User Metrics

It is remarkably easy to put a marketing banner on a homepage that says "Trusted by 50,000 engineers across 80 countries." Unless you have verifiable analytics and audit logs to back up those numbers, such statements are hollow.

At LadeStack:
- We do not install invasive tracking cookies to harvest user metrics.
- We do not invent customer satisfaction percentages out of thin air.
- We do not purchase fake GitHub stars or manipulate search rankings through link farms.

Our proof of work is completely public: anyone can visit my GitHub profile (https://github.com/girishlade111) and inspect my actual commit history, source code repositories, and release logs. The code speaks for itself.

## The Long-Term Reward of Honesty

Operating with technical honesty may not generate overnight viral hype, but it builds something infinitely more durable: **genuine trust**.

When a user knows that our privacy-first tools do not secretly upload their files, that our software does not hide predatory paywalls, and that our founder is completely candid about what the software can and cannot do, they return to our tools with confidence.

In an industry drowning in inflated claims, honest engineering is not just an ethical choice; it is our greatest competitive advantage.

Discover our tools at https://ladestack.in/ and review our open work at https://github.com/girishlade111.`
  },
  mr: {
    title: "खऱ्याखुऱ्या कामाचं महत्त्व: फुगवलेले आकडे आणि स्टार्टअप हाइप नाकारताना",
    description: "बनावट युझर्स संख्या, खोट्या पदव्या आणि स्टार्टअप्सच्या भूलथापांना नकार देत, LadeStack मध्ये तांत्रिक प्रामाणिकपणा का जपला जातो याचे वास्तव.",
    category: "Engineering Ethics · Transparency",
    content: `सध्या सोशल मीडिया, लिंक्डइन किंवा इंटरनेटवर नजर टाकली तर एक विचित्र प्रकार पाहायला मिळतो: प्रत्येक जण स्वतःला 'क्रांतिकारी AI फाउंडर' म्हणवून घेतो, अवघ्या दोन दिवसांत बनवलेल्या छोट्या ॲपला 'लाखो युझर्स वापरतात' असा खोटा दावा करतो आणि कंपन्यांचे फुगवलेले आकडे दाखवतो.

सॉफ्टवेअरच्या जगात सध्या खोटेपणाचा सुळसुळाट झाला आहे:
- युझर्सची बनावट आकडेवारी सांगणे ("आमचे १ लाख ग्राहक आहेत!").
- प्रत्यक्षात काम न करणाऱ्या फिचर्सना 'लाइव्ह' म्हणून दाखवणे.
- स्वतःचे वजन वाढवण्यासाठी कम्प्युटर सायन्सच्या खोट्या पदव्या किंवा न घेतलेली सर्टिफिकेट्स दाखवणे.

मी जेव्हा **LadeStack** (https://ladestack.in/) ची निर्मिती केली, तेव्हा मी एक पक्का निश्चय केला होता: मी या खोट्या दिखाव्यापासून चार हात लांब राहीन. माझं काम प्रामाणिक असेल आणि जे खरं आहे तेच जगासमोर मांडेन.

## खोट्या पदव्यांपेक्षा प्रत्यक्ष काम श्रेष्ठ

अनेकांना वाटतं की लोकांचा विश्वास जिंकण्यासाठी कम्प्युटर सायन्सची पदवी दाखवलीच पाहिजे. मी हे साफ नाकारतो. माझं औपचारिक शिक्षण हे **मेकॅनिकल इंजिनिअरिंग**मध्ये झालं आहे. २०२१ मध्ये मी फॅबटेक टेक्निकल कॅम्पसमधून मेकॅनिकल इंजिनिअरिंगचा डिप्लोमा केला आणि त्यानंतर पंढरपूरच्या स्वेरी (SVERI) इंजिनिअरिंग कॉलेजमधून शिक्षण घेतलं.

मी कधीही कम्प्युटर सायन्सची पदवी असल्याचा खोटा दावा केला नाही किंवा बनावट सर्टिफिकेट्सचा आधार घेतला नाही. कारण खरं ज्ञान कागदाच्या तुकड्यावर नव्हे, तर तुमच्या हातून तयार होणाऱ्या सॉफ्टवेअरमध्ये असतं.

जेव्हा एखादा युझर **GB Coder** (https://code.ladestack.in/) मध्ये कोड लिहितो किंवा **LS PDF** (https://pdf.ladestack.in/) मध्ये फाईल जोडतो, तेव्हा तुमच्या कम्प्युटरला डेव्हलपरच्या पदवीशी काही देणंघेणं नसतं; ब्राऊझरला फक्त एवढंच समजतं की लिहिलेला कोड किती वेगाने आणि बिनचूक काम करतो.

## जे चालू आहे तेच दाखवणे: फसवणुकीला नकार

टेक मार्केटमध्ये दुसरी एक वाईट सवय असते: कागदावरची कल्पना सुद्धा प्रत्यक्षात तयार झाल्यासारखी सांगणे.

LadeStack मध्ये आम्ही पूर्ण पारदर्शकता ठेवतो:
- **प्रत्यक्ष चालू असलेली टूल्स**: **GB Coder**, **MD2PDF** (https://md2pdf.ladestack.in/), **LS PDF**, **LS Image Compressor** (https://img.ladestack.in/), **Swift Resume** (https://resume.ladestack.in/), आणि **Bharat Land Converter** (https://land.ladestack.in/) ही टूल्स पूर्णपणे तयार असून आज कोणीही वापरू शकतं.
- **प्रयोगाच्या टप्प्यातील संकल्पना**: आमचा आगामी AI ॲप बिल्डर किंवा क्लाऊड प्रोजेक्ट्स हे अजून प्रयोगाच्या टप्प्यात आहेत, आणि आम्ही तसं स्पष्टपणे नमूद करतो. जोपर्यंत एखादं टूल संपूर्ण सुरक्षित होत नाही, तोपर्यंत आम्ही त्याला 'पूर्ण झाले' म्हणत नाही.

## खोट्या आकड्यांची आम्हाला गरज नाही

वेबसाईटवर "५० हजार लोकांनी वापरले" असा खोटा बोर्ड लावणं सोपं असतं. पण जोपर्यंत तुमच्याकडे त्याचा खरा पुरावा नाही, तोपर्यंत अशी विधाने करणे ही युझरची फसवणूक असते.

- आम्ही युझरवर हेरगिरी करणारे ट्रॅकर्स वापरत नाही.
- आम्ही युझर्सची खोटी आकडेवारी प्रसिद्ध करत नाही.
- आम्ही पैसे देऊन खोटे स्टार्स किंवा रिव्ह्यूज विकत घेत नाही.

माझं सर्व काम उघडं आहे: कोणीही माझ्या GitHub प्रोफाइलवर (https://github.com/girishlade111) जाऊन माझा खरा कोड आणि कमिट्स तपासू शकतं.

## प्रामाणिकपणा हाच खरा पाया

खऱ्या कामाला प्रसिद्धी मिळायला वेळ लागतो, पण त्यामुळे निर्माण होणारा विश्वास कायमस्वरूपी टिकतो. जेव्हा युझरला खात्री असते की हे टूल आपल्याला फसवत नाही, तेव्हा तो आनंदाने पुन्हा पुन्हा येतो.

LadeStack च्या पारदर्शक प्रवासात सहभागी व्हा: https://ladestack.in/ आणि GitHub: https://github.com/girishlade111.`
  },
  jp: {
    title: "誠実なものづくり：見せかけの指標よりも動くソフトウェアを重視する理由",
    description: "誇張されたユーザー数や虚飾の肩書きに背を向け、LadeStackが徹底した技術的誠実さを貫く理由。",
    category: "Engineering Ethics · Transparency",
    content: `現在のテック業界は、虚飾の指標（バニティメトリクス）に侵されています。「10万人の開発者が愛用」「革命的な次世代AI」といった実体の伴わない誇大広告が日常茶飯事となっています。

私が **LadeStack**（https://ladestack.in/）を立ち上げた際、誇張や虚偽を一切排除し、誠実なものづくりに徹することを固く誓いました。

## 肩書きの誇張を排し、コードで語る

一般的なテンプレートでは、実態と異なる学位や肩書きを掲げて権威づけを行う誘惑が存在します。しかし私は、自身の機械工学ディプロマ（Fabtech 2021年卒）およびSVERI工科大学での学びの経歴をありのままに公表し、未取得の学位や資格を名乗ることは絶対にしません。

ブラウザがコードを実行する際、開発者の学歴は一切関係ありません。重要なのは、メモリを浪費せず、安全にバグなく動作するかどうかだけです。

## 実装済みの機能と構想を厳格に分ける

もう一つの悪習は、構想段階のプロトタイプを「完成品」として宣伝することです。LadeStackでは、稼働中のツール（GB Coder、LS PDF、MD2PDFなど）と、開発中の将来構想（AI Builderなど）を明確に区別して開示しています。

虚偽のユーザー数や購入したGitHubスターを掲げることはありません。全ての開発実績はGitHub（https://github.com/girishlade111）で公開されており、誰でも検証可能です。

誠実なエンジニアリングこそが、長期的なユーザーの信頼を築く唯一の道であると確信しています。詳細は https://ladestack.in/ をご覧ください。`
  },
  ko: {
    title: "정직한 엔지니어링: 허상뿐인 지표 대신 실제로 작동하는 소프트웨어를 만드는 이유",
    description: "부풀려진 사용자 수와 허황된 마케팅을 거부하고, LadeStack이 철저한 기술적 투명성을 고집하는 이유.",
    category: "Engineering Ethics · Transparency",
    content: `오늘날 스타트업 생태계는 겉포장에 집착합니다. 실제 검증되지 않은 사용자 수("10만 개발자 선택!"), 시제품에 불과한 아이디어를 완성된 플랫폼으로 포장하는 마케팅이 넘쳐납니다.

저는 **LadeStack**(https://ladestack.in/)을 만들며 이러한 과장된 관행을 철저히 배격하기로 결심했습니다. 진정한 기술적 가치는 조작된 수치가 아닌, 사용자가 마주하는 안정적인 동작에서 나오기 때문입니다.

## 학력과 경력의 투명성

저는 기계공학 디플로마(Fabtech 2021년 수료)와 SVERI 공과대학에서의 수학 과정을 숨김없이 밝히며, 취득하지 않은 컴퓨터공학 학위나 검증되지 않은 자격증을 내세우지 않습니다.

소프트웨어가 브라우저에서 실행될 때, 컴퓨터는 개발자의 학벌을 확인하지 않습니다. 코드가 얼마나 효율적으로 메모리를 관리하고 예외를 견고하게 처리하는가만이 유일한 진실입니다.

## 배포된 제품과 로드맵의 엄격한 분리

- **정식 배포 제품**: GB Coder, LS PDF, MD2PDF, Swift Resume 등은 누구나 지금 즉시 사용할 수 있습니다.
- **연구 및 개발 단계**: 브라우저 기반 AI 빌더와 같은 미래 구상은 명확히 프로토타입으로 표기하며 완성품으로 호도하지 않습니다.

저희는 조작된 사용자 리뷰나 유료 GitHub 스타를 구매하지 않습니다. 모든 개발 과정과 커밋 내역은 GitHub(https://github.com/girishlade111)에 온전히 공개되어 있습니다. 진정한 신뢰는 정직함에서 시작됩니다. https://ladestack.in/`
  },
  zh: {
    title: "诚实的工程实践：为什么我选择真实可用的软件，而非虚荣指标",
    description: "拒绝虚夸的用户量、虚假的融资噱头与空洞口号。LadeStack坚持以技术诚实为核心准则的深层思考。",
    category: "Engineering Ethics · Transparency",
    content: `在当今科技圈，虚荣指标（Vanity Metrics）蔚然成风：“十万工程师信赖”、“颠覆性AI架构”，这类夸大其词的宣传充斥网络。

在创建 **LadeStack**（https://ladestack.in/）之初，我便立下规矩：坚决摒弃任何虚伪与夸大，坚持彻底的技术透明与工匠精神。

## 坦诚面对背景：实力胜于标签

我从未伪造计算机科学文凭。我的正规工程教育是**机械工程**：2021年毕业于Fabtech Technical Campus并获得专科文凭，随后在SVERI工程学院继续求学。我从不罗列未经考核的证书或虚构企业背景。

当用户在 **GB Coder**（https://code.ladestack.in/）中调试代码，或通过 **LS PDF**（https://pdf.ladestack.in/）处理文件时，浏览器的JavaScript引擎只在乎代码是否健壮、资源开销是否节制，与开发者的文凭毫无瓜葛。

## 严格区分已上线产品与规划愿景

科技营销的另一大弊病，是把草图当作上线功能兜售。在LadeStack：
- 已交付上线的工具（如GB Coder、MD2PDF、LS PDF、Bharat Land Converter等）具备完整的可用性。
- 探索中的概念（如端侧AI应用构建器）被明确标注为研发原型，绝不混淆视听。

我们拒绝虚假刷量、拒绝购买GitHub Star。每一个补丁与版本发布，均可在我的GitHub（https://github.com/girishlade111）透明查证。唯有诚实，才能赢得用户经久不衰的信赖。访问 https://ladestack.in/ 了解更多。`
  },
  ru: {
    title: "Честная разработка: почему работающий код важнее дутых метрик",
    description: "В мире раздутых цифр и стартап-хайпа LadeStack выбирает абсолютную честность: отказ от фальшивых регалий и маркетинговых уловок.",
    category: "Engineering Ethics · Transparency",
    content: `Современная IT-индустрия глубоко больна культом внешнего блеска: накрученные пользователи, громкие заявления об «ИИ-революции» и выдача сырых прототипов за готовые сервисы.

Создавая **LadeStack** (https://ladestack.in/), я сознательно отказался от этой ярмарки тщеславия. Честный и надежный софт всегда переживет любой шумный маркетинг.

## Никаких фальшивых регалий

Я открыто говорю о своем образовании: я окончил Fabtech Technical Campus по специальности «Машиностроение» в 2021 году и учился в SVERI в Пандхарпуре. Я никогда не приписывал себе несуществующих дипломов по информатике.

Когда пользователь запускает **GB Coder** (https://code.ladestack.in/) или **LS PDF** (https://pdf.ladestack.in/), браузер выполняет инструкции процессора, а не проверяет корочки разработчика. Важна лишь чистота архитектуры и надежность.

## Четкая граница между фактом и планами

В LadeStack действует строгое правило:
- Работающие продукты (GB Coder, MD2PDF, Bharat Land Converter) открыты для свободного использования.
- Будущие идеи (например, браузерный AI Builder) честно обозначаются как прототипы в разработке.

Мы не покупаем звезд на GitHub и не выдумываем статистику. Вся история разработки открыта на https://github.com/girishlade111. Доверие создается годами безупречной работы. Подробнее: https://ladestack.in/.`
  },
  pt: {
    title: "Engenharia Honesta: Por Que Valorizo Software Funcional Acima de Métricas de Vaidade",
    description: "Em uma cultura tech obcecada por números inflados e promessas exageradas, a LadeStack prioriza a verdade técnica e o software auditável.",
    category: "Engineering Ethics · Transparency",
    content: `O ecossistema de startups frequentemente prioriza a ilusão sobre a substância: contagens infladas de usuários, títulos corporativos vazios e protótipos instáveis vendidos como plataformas definitivas.

Ao criar a **LadeStack** (https://ladestack.in/), escolhi o caminho oposto: rejeitar métricas de vaidade e focar na qualidade do software entregue.

## Verdade Sobre Minha Formação

Minha base é a **Engenharia Mecânica** (diplomado pelo Fabtech Technical Campus em 2021, com estudos subsequentes na SVERI em Pandharpur). Não invento diplomas de Ciência da Computação nem certificações não obtidas.

O navegador não se importa com títulos; importa-se apenas se o código executa com precisão e sem consumir memória excessiva em ferramentas como **GB Coder** (https://code.ladestack.in/) ou **LS PDF** (https://pdf.ladestack.in/).

## Separação Estrita Entre Produção e Futuro

Recusamo-nos a vender ideias em rascunho como produtos prontos. Nossos utilitários publicados funcionam plenamente hoje, enquanto conceitos em desenvolvimento (como o AI App Builder) são identificados claramente como pesquisas em andamento.

Não compramos estrelas no GitHub nem fabricamos dados de uso. Tudo o que fazemos é aberto e auditável em https://github.com/girishlade111. A honestidade é nossa maior força. Conheça o ecossistema em https://ladestack.in/.`
  },
  tr: {
    title: "Dürüst Mühendislik: Neden Şişirilmiş Metrikler Yerine Çalışan Yazılıma Değer Veriyorum",
    description: "Şişirilmiş kullanıcı sayıları ve boş vaatler yerine LadeStack'in benimsediği radikal teknik şeffaflık ve dürüst mühendislik felsefesi.",
    category: "Engineering Ethics · Transparency",
    content: `Yazılım dünyasında içi boş metrikler yarışına tanık oluyoruz: "Yüz binlerce aktif kullanıcı", yapay zeka balonuyla süslenmiş basit scriptler ve abartılı unvanlar.

**LadeStack**'i (https://ladestack.in/) inşa ederken bu yapay dünyayı reddettim. Sağlam mühendislik, gürültülü pazarlamadan her zaman daha değerlidir.

## Gerçek Geçmiş, Gerçek Yetkinlik

Eğitimim **Makine Mühendisliği** alanındadır (2021 Fabtech mezuniyeti ve SVERI mühendislik çalışmaları). Sahip olmadığım bilgisayar mühendisliği diplomalarını veya sertifikaları asla iddia etmedim.

Kullanıcı **GB Coder** (https://code.ladestack.in/) veya **LS PDF** (https://pdf.ladestack.in/) kullandığında, tarayıcı geliştiricinin unvanına değil kodun hatasız çalışıp çalışmadığına bakar.

## Yayındaki Ürünler ile Planlar Arasındaki Net Ayrım

Hazır olmayan bir fikri "tamamlanmış ürün" gibi sunmak dürüstlükten uzaktır. LadeStack'te yayında olan araçlar ile geliştirme aşamasındaki kavramsal projeler açıkça birbirinden ayrılır.

Yapay değerlendirmeler veya sahte GitHub yıldızları satın almıyoruz. Tüm çalışma geçmişim https://github.com/girishlade111 adresinde herkesin denetimine açıktır. Güven, dürüstlükle inşa edilir: https://ladestack.in/.`
  },
  fr: {
    title: "Ingénierie honnête: Pourquoi je privilégie les logiciels fonctionnels aux métriques vaniteuses",
    description: "Face aux chiffres d'utilisateurs gonflés et aux diplômes enjolivés, découvrez pourquoi LadeStack mise sur la transparence technique absolue.",
    category: "Engineering Ethics · Transparency",
    content: `L'écosystème numérique contemporain souffre d'une addiction aux métriques de vanité: chiffres d'utilisateurs fictifs, labels 'IA révolutionnaire' posés sur de simples interfaces et fausses accréditations.

En créant **LadeStack** (https://ladestack.in/), j'ai délibérément banni ces faux-semblants pour me consacrer à une ingénierie rigoureuse et vérifiable.

## Pas d'artifice sur mon parcours

Ma formation académique est ancrée dans le **génie mécanique** (diplôme du Fabtech Technical Campus en 2021, puis études d'ingénierie au SVERI à Pandharpur). Je ne prétends pas détenir un master d'informatique universitaire imaginaire.

Lorsqu'un internaute manipule **GB Coder** (https://code.ladestack.in/) ou **LS PDF** (https://pdf.ladestack.in/), le navigateur n'évalue pas un parchemin d'école: il exécute des instructions avec rigueur et sécurité.

## Distinguer formellement le réel de l'ambition

Sur LadeStack, ce qui est en ligne est pleinement fonctionnel. Les projets prospectifs, comme notre futur générateur d'applications assisté par IA, sont sans équivoque présentés comme des prototypes en recherche.

Nous n'achetons ni abonnés, ni étoiles GitHub. L'ensemble de mon code source est publiquement auditable sur https://github.com/girishlade111. C'est cette intégrité qui fonde la crédibilité de nos outils: https://ladestack.in/.`
  },
  es: {
    title: "Ingeniería Honesta: Por Qué Valoro el Software Funcional Sobre las Métricas de Vanidad",
    description: "Frente a las métricas infladas y el marketing engañoso, LadeStack defiende una honestidad radical: código abierto, transparencia y hechos verificables.",
    category: "Engineering Ethics · Transparency",
    content: `La cultura tecnológica actual abusa de las métricas de vanidad: estadísticas de usuarios abultadas sin respaldo, títulos rimbombantes y prototipos inestables vendidos como soluciones corporativas consolidadas.

Al estructurar **LadeStack** (https://ladestack.in/), opté por la transparencia absoluta. El software útil y honesto siempre prevalece sobre el ruido publicitario.

## Autenticidad en Mi Trayectoria

Mi formación de base es la **Ingeniería Mecánica** (diploma en Fabtech Technical Campus en 2021 y estudios posteriores en SVERI, Pandharpur). No finjo poseer títulos de ciencias de la computación que no he cursado.

Cuando alguien utiliza **GB Coder** (https://code.ladestack.in/) o procesa archivos en **LS PDF** (https://pdf.ladestack.in/), el navegador no consulta diplomas; ejecuta algoritmos y gestiona memoria.

## Claridad Entre Productos Vivos y Conceptos

No publicitamos borradores como software finalizado. Lo que está disponible en LadeStack funciona hoy; las exploraciones futuras (como nuestro generador de apps en navegador) se identifican con total franqueza como prototipos en desarrollo.

No compramos estrellas en GitHub ni inflamos métricas. Nuestro código es público y auditable en https://github.com/girishlade111. Construir con honestidad es nuestro mayor valor: https://ladestack.in/.`
  }
};

for (const [lang, data] of Object.entries(articles)) {
  const dir = path.join(__dirname, '..', 'src', 'content', 'blog', lang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${slug}.md`);

  const fileContent = `---
title: "${data.title.replace(/"/g, '\\"')}"
description: "${data.description.replace(/"/g, '\\"')}"
pubDate: "${pubDate}"
readingTime: ${readingTime}
category: "${data.category}"
slug: "${slug}"
lang: "${lang}"
---

${data.content.trim()}
`;

  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log(`Wrote ${lang}/${slug}.md`);
}
