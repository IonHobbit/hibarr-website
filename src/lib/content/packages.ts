import type { Locale } from '@/lib/i18n-config';

type PackageContent = {
  description: string;
  whoIsItFor: string;
  benefits: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

type PackagesContent = {
  [key in Locale]: {
    'basic-package': PackageContent;
    'standard-package': PackageContent;
    'premium-package': PackageContent;
  }
}

export const packagesContent = {
  en: {
    'basic-package': {
      description:
        "Our Basic Banking Package is the perfect entry point for individuals and small business owners looking to establish a secure financial footing in Cyprus. This package is designed to strip away the complexity of international banking, offering you a streamlined, hassle-free account opening process. Whether you are a student, a freelancer, or just starting your investment journey, the Basic Package provides all the essential tools you need to manage your daily finances with ease and confidence.",
      whoIsItFor:
        'This package is ideal for students, digital nomads, freelancers, and individuals relocating to Cyprus who need a reliable personal bank account without the burden of excessive fees or complex requirements. It is also suitable for those making their first property investment and needing a local account for transaction purposes.',
      benefits: [
        'Rapid account setup with minimal documentation',
        'Low monthly maintenance fees',
        'Access to online and mobile banking 24/7',
        'Free local transfers within our partner network',
        'Dedicated English-speaking support team',
      ],
      faqs: [
        {
          question: 'What documents are required?',
          answer:
            'We need just your valid passport and a proof of address (utility bill or bank statement) from your home country.',
        },
        {
          question: 'Can I upgrade later?',
          answer:
            'Absolutely. As your financial needs grow, you can seamlessly upgrade to our Pro or Premium packages.',
        },
      ],
    },
    'standard-package': {
      description:
        'The Standard Banking Package is tailored for growing businesses and active investors who require more than just the basics. This comprehensive solution offers higher transaction limits, multi-currency capabilities, and priority support. It bridges the gap between personal banking and corporate financial management, giving you the flexibility to operate internationally while enjoying robust local banking stability.',
      whoIsItFor:
        'Designed for established SME owners, property investors with multiple units, and expatriate families who manage finances across borders. If you frequently make international transfers or need a business account that scales with your operations, this is the right choice.',
      benefits: [
        'Multi-currency accounts (EUR, USD, GBP, TRY)',
        'Higher daily transaction and withdrawal limits',
        'Priority customer support with a dedicated relationship manager',
        'Preferential exchange rates for international transfers',
        'Business debit card with travel insurance perks',
      ],
      faqs: [
        {
          question: 'Are there fees for international transfers?',
          answer:
            'You enjoy reduced fees compared to standard rates, and the first 3 transfers per month are commission-free.',
        },
        {
          question: 'Does this include a business credit card?',
          answer:
            'Yes, subject to a quick credit check, a business credit card with a generous limit is included.',
        },
      ],
    },
    'premium-package': {
      description:
        'Our Premium Banking Package represents the pinnacle of financial service, crafted exclusively for high-net-worth individuals and large corporations. This bespoke offering unlocks a world of privileges, from personalized wealth management advice to exclusive investment opportunities. We understand that your time is valuable; therefore, the Premium Package ensures that every interaction is expedited, seamless, and handled with the utmost discretion and professionalism.',
      whoIsItFor:
        'Ideal for large-scale investors, corporations with significant turnover, and HNWI seeking asset protection and wealth growth. This package serves those who demand excellence and a banking partner that acts as a strategic advisor.',
      benefits: [
        'Dedicated private banker available 24/7',
        'Unlimited free international transfers',
        'Exclusive access to off-market real estate investment opportunities',
        'Customized wealth management and tax planning advisory',
        'Concierge services and VIP lounge access at select airports',
      ],
      faqs: [
        {
          question: 'Is there a minimum deposit required?',
          answer:
            'Yes, the Premium tier requires a minimum maintained balance, which ensures you receive our highest level of service and waived fees.',
        },
        {
          question: 'Can I manage multiple corporate entities?',
          answer:
            'Yes, this package supports complex corporate structures with unified reporting and management.',
        },
      ],
    },
  },
  de: {
    'basic-package': {
      description:
        'Unser Basic Banking Paket ist der perfekte Einstieg für Einzelpersonen und Kleinunternehmer, die in Zypern Fuß fassen möchten. Dieses Paket wurde entwickelt, um die Komplexität internationaler Bankgeschäfte zu reduzieren und Ihnen eine unkomplizierte Kontoeröffnung zu ermöglichen. Egal, ob Sie Student, Freiberufler oder Investitionseinsteiger sind – das Basic Paket bietet alle wesentlichen Werkzeuge, um Ihre täglichen Finanzen sicher und einfach zu verwalten.',
      whoIsItFor:
        'Ideal für Studenten, digitale Nomaden, Freiberufler und Personen, die nach Zypern umziehen und ein zuverlässiges persönliches Bankkonto ohne übermäßige Gebühren benötigen.',
      benefits: [
        'Schnelle Kontoeinrichtung mit minimalen Unterlagen',
        'Niedrige monatliche Führungsgebühren',
        '24/7 Zugang zu Online- und Mobile-Banking',
        'Kostenlose Überweisungen innerhalb unseres Partnernetzwerks',
        'Engagierter deutschsprachiger Support',
      ],
      faqs: [
        {
          question: 'Welche Dokumente werden benötigt?',
          answer:
            'Wir benötigen lediglich Ihren gültigen Reisepass und einen Adressnachweis (Versorgerrechnung oder Kontoauszug) aus Ihrem Heimatland.',
        },
        {
          question: 'Kann ich später upgraden?',
          answer:
            'Absolut. Wenn Ihre finanziellen Bedürfnisse wachsen, können Sie nahtlos auf unsere Pro- oder Premium-Pakete umsteigen.',
        },
      ],
    },
    'standard-package': {
      description:
        'Das Standard Banking Paket ist auf wachsende Unternehmen und aktive Investoren zugeschnitten, die mehr als nur die Grundlagen benötigen. Diese umfassende Lösung bietet höhere Transaktionslimits, Mehrwährungsfunktionen und priorisierten Support. Es schlägt die Brücke zwischen privatem Banking und Unternehmensfinanzierung und bietet Ihnen die Flexibilität, international zu agieren, während Sie lokale Bankenstabilität genießen.',
      whoIsItFor:
        'Entwickelt für etablierte KMU-Inhaber, Immobilieninvestoren mit mehreren Einheiten und Expat-Familien, die Finanzen grenzüberschreitend verwalten.',
      benefits: [
        'Mehrwährungskonten (EUR, USD, GBP, TRY)',
        'Höhere tägliche Transaktions- und Abhebelimits',
        'Priorisierter Kundensupport mit festem Ansprechpartner',
        'Vorzugskurse für internationale Überweisungen',
        'Business-Debitkarte mit Reiseversicherungsschutz',
      ],
      faqs: [
        {
          question: 'Gibt es Gebühren für Auslandsüberweisungen?',
          answer:
            'Sie profitieren von reduzierten Gebühren im Vergleich zu Standardraten, und die ersten 3 Überweisungen pro Monat sind provisionsfrei.',
        },
        {
          question: 'Ist eine Firmenkreditkarte enthalten?',
          answer:
            'Ja, vorbehaltlich einer schnellen Bonitätsprüfung ist eine Firmenkreditkarte mit großzügigem Limit inbegriffen.',
        },
      ],
    },
    'premium-package': {
      description:
        'Unser Premium Banking Paket stellt die Spitze der Finanzdienstleistungen dar, exklusiv für vermögende Privatpersonen und Großunternehmen. Dieses maßgeschneiderte Angebot eröffnet eine Welt voller Privilegien, von persönlicher Vermögensberatung bis hin zu exklusiven Investitionsmöglichkeiten. Wir verstehen, dass Ihre Zeit kostbar ist; daher garantiert das Premium Paket, dass jede Interaktion beschleunigt, nahtlos und mit höchster Diskretion behandelt wird.',
      whoIsItFor:
        'Ideal für Großinvestoren, Unternehmen mit signifikantem Umsatz und HNWI, die Vermögensschutz und -wachstum suchen.',
      benefits: [
        'Persönlicher Private Banker rund um die Uhr verfügbar',
        'Unbegrenzte kostenlose internationale Überweisungen',
        'Exklusiver Zugang zu Off-Market Immobilienangeboten',
        'Maßgeschneiderte Vermögens- und Steuerberatung',
        'Concierge-Service und VIP-Lounge-Zugang',
      ],
      faqs: [
        {
          question: 'Ist eine Mindesteinlage erforderlich?',
          answer:
            'Ja, die Premium-Stufe erfordert ein Mindestguthaben, das unseren höchsten Servicestandard und Gebührenbefreiungen sichert.',
        },
        {
          question: 'Kann ich mehrere Firmenstrukturen verwalten?',
          answer:
            'Ja, dieses Paket unterstützt komplexe Unternehmensstrukturen mit einheitlichem Reporting.',
        },
      ],
    },
  },
  tr: {
    'basic-package': {
      description:
        "Temel Bankacılık Paketimiz, Kıbrıs'ta güvenli bir finansal temel oluşturmak isteyen bireyler ve küçük işletme sahipleri için mükemmel bir giriş noktasıdır. Bu paket, uluslararası bankacılığın karmaşıklığını ortadan kaldırarak size akıcı ve sorunsuz bir hesap açma süreci sunar.",
      whoIsItFor:
        "Öğrenciler, serbest çalışanlar ve Kıbrıs'a yeni taşınanlar için idealdir.",
      benefits: [
        'Minimum belge ile hızlı hesap kurulumu',
        'Düşük aylık bakım ücretleri',
        '7/24 internet ve mobil bankacılık erişimi',
        'Anlaşmalı ağımız içinde ücretsiz yerel transferler',
        'Özel destek ekibi',
      ],
      faqs: [
        {
          question: 'Hangi belgeler gerekli?',
          answer:
            'Sadece geçerli pasaportunuz ve kendi ülkenizden bir adres kanıtı (fatura veya banka beyanı) gereklidir.',
        },
        {
          question: 'Daha sonra yükseltebilir miyim?',
          answer:
            'Kesinlikle. Finansal ihtiyaçlarınız arttıkça Pro veya Premium paketlerimize sorunsuz geçiş yapabilirsiniz.',
        },
      ],
    },
    'standard-package': {
      description:
        'Standart Bankacılık Paketi, temelden fazlasını gerektiren büyüyen işletmeler ve aktif yatırımcılar için tasarlanmıştır. Bu kapsamlı çözüm, daha yüksek işlem limitleri, çoklu para birimi özellikleri ve öncelikli destek sunar.',
      whoIsItFor:
        'KOBİ sahipleri ve birden fazla mülkü olan yatırımcılar için tasarlanmıştır.',
      benefits: [
        'Çoklu dçviz hesapları (EUR, USD, GBP, TRY)',
        'Daha yüksek günlük işlem limitleri',
        'Özel müşteri temsilcisi ile öncelikli destek',
        'İndirimli döviz kurları',
        'Seyahat sigortası avantajlı ticari banka kartı',
      ],
      faqs: [
        {
          question: 'Uluslararası transfer ücreti var mı?',
          answer:
            'Standart oranlara göre indirimli ücretlerden yararlanırsınız ve ayda ilk 3 transfer ücretsizdir.',
        },
        {
          question: 'Ticari kredi kartı dahil mi?',
          answer:
            'Evet, hızlı bir kredi kontrolüne tabi olarak, yüksek limitli bir ticari kredi kartı dahildir.',
        },
      ],
    },
    'premium-package': {
      description:
        'Premium Bankacılık Paketimiz, yüksek varlıklı bireyler ve büyük şirketler için özel olarak hazırlanmış finansal hizmetin zirvesini temsil eder. Bu paket, kişiselleştirilmiş varlık yönetimi tavsiyesinden özel yatırım fırsatlarına kadar ayrıcalıklarla dolu bir dünyanın kapılarını aralar.',
      whoIsItFor:
        "Büyük ölçekli yatırımcılar ve varlık koruması arayan HNWI'ler için idealdir.",
      benefits: [
        '7/24 ulaşılabilir özel bankacı',
        'Sınırsız ücretsiz uluslararası transfer',
        'Piyasa dışı özel gayrimenkul fırsatlarına erişim',
        'Özel varlık yönetimi ve vergi planlaması',
        'Havalimanlarında VIP lounge erişimi',
      ],
      faqs: [
        {
          question: 'Minimum mevduat gerekli mi?',
          answer:
            'Evet, Premium seviye, en yüksek hizmet standardımızı sağlamak için minimum bakiye gerektirir.',
        },
        {
          question: 'Birden fazla şirketi yönetebilir miyim?',
          answer:
            'Evet, bu paket karmaşık kurumsal yapıları destekler.',
        },
      ],
    },
  },
  ru: {
    'basic-package': {
      description:
        'Наш Базовый Банковский Пакет — идеальная отправная точка для частных лиц и владельцев малого бизнеса, желающих закрепиться на Кипре. Этот пакет разработан, чтобы убрать сложности международного банкинга, предлагая вам простой и быстрый процесс открытия счета.',
      whoIsItFor:
        'Идеально подходит для студентов, фрилансеров и тех, кто переезжает на Кипр и нуждается в надежном личном счете без лишних комиссий.',
      benefits: [
        'Быстрое открытие счета с минимальным пакетом документов',
        'Низкая ежемесячная плата за обслуживание',
        'Круглосуточный доступ к онлайн-банкингу',
        'Бесплатные переводы внутри нашей партнерской сети',
        'Выделенная служба поддержки',
      ],
      faqs: [
        {
          question: 'Какие документы требуются?',
          answer:
            'Нам нужен только ваш действующий паспорт и подтверждение адреса (счет за коммунальные услуги) из вашей страны.',
        },
        {
          question: 'Могу ли я перейти на другой тариф позже?',
          answer:
            'Конечно. По мере роста ваших финансовых потребностей вы можете легко перейти на пакеты Pro или Premium.',
        },
      ],
    },
    'standard-package': {
      description:
        'Стандартный Банковский Пакет создан для растущего бизнеса и активных инвесторов. Это комплексное решение предлагает более высокие лимиты транзакций, мультивалютные возможности и приоритетную поддержку, позволяя вам вести дела на международном уровне с уверенностью в местной стабильности.',
      whoIsItFor:
        'Предназначен для владельцев малого и среднего бизнеса и инвесторов с несколькими объектами недвижимости.',
      benefits: [
        'Мультивалютные счета (EUR, USD, GBP, TRY)',
        'Повышенные лимиты на транзакции и снятие наличных',
        'Приоритетная поддержка с персональным менеджером',
        'Льготные курсы обмена валют',
        'Бизнес-дебетовая карта со страховкой путешествий',
      ],
      faqs: [
        {
          question: 'Есть ли комиссия за международные переводы?',
          answer:
            'Вы получаете сниженные комиссии, а первые 3 перевода в месяц — без комиссии.',
        },
        {
          question: 'Входит ли бизнес-кредитная карта?',
          answer:
            'Да, после быстрой кредитной проверки предоставляется карта с щедрым лимитом.',
        },
      ],
    },
    'premium-package': {
      description:
        'Наш Премиальный Банковский Пакет представляет собой вершину финансового сервиса для состоятельных лиц и крупных корпораций. Это индивидуальное предложение открывает мир привилегий, от персонального управления капиталом до эксклюзивных инвестиционных возможностей.',
      whoIsItFor:
        'Идеально для крупных инвесторов и корпораций, ищущих защиту и приумножение капитала.',
      benefits: [
        'Персональный банкир, доступный 24/7',
        'Неограниченные бесплатные международные переводы',
        'Эксклюзивный доступ к закрытым объектам недвижимости',
        'Индивидуальное налоговое и инвестиционное планирование',
        'Консьерж-сервис и доступ в VIP-залы',
      ],
      faqs: [
        {
          question: 'Требуется ли минимальный депозит?',
          answer:
            'Да, уровень Premium требует поддержания минимального баланса для обеспечения высшего стандарта обслуживания.',
        },
        {
          question: 'Могу ли я управлять несколькими компаниями?',
          answer:
            'Да, этот пакет поддерживает сложные корпоративные структуры.',
        },
      ],
    },
  },
} as PackagesContent;
