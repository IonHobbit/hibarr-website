import { Locale } from "../i18n-config";

export type GecitkaleConsultationContent = {
  [key in Locale]: {
    title: string;
    subtitle: string;
    features: string[];
    form: {
      title: string;
      subtitle: string;
      fields: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        interestReason: string;
        interestReasonOther: string;
        investmentTimeline: string;
      }
      options: {
        interestReasons: { label: string, value: string }[];
        investmentTimelines: { label: string, value: string }[];
      }
      placeholders: {
        interestReasonOther: string;
        chooseOne: string;
      }
      validationMessages: {
        firstName: string;
        lastName: string;
        email: string;
        emailInvalid: string;
        phoneNumber: string;
        interestReason: string;
        interestReasonOther: string;
        investmentTimeline: string;
      },
      submitButton: string;
      dataPrivacy: string;
    }
    caseStudiesTitle: string;
    caseStudiesDescription: string;
    images: string[];
    imageAlt: {
      rabih: string;
      project: string;
    }
    trust: string[];
    aboutRabih: {
      title: string;
      description: string;
    };
  }
}

const images = [
  'https://res.cloudinary.com/hibarr/image/upload/v1766086575/15_vallsy.webp',
  'https://res.cloudinary.com/hibarr/image/upload/v1766086572/16_ur1gbs.webp',
  'https://res.cloudinary.com/hibarr/image/upload/v1766086548/8_a8k0eg.webp',
  'https://res.cloudinary.com/hibarr/image/upload/v1766086548/13_kpecma.webp',
  'https://res.cloudinary.com/hibarr/image/upload/v1766086547/2_aav7h5.webp',
  'https://res.cloudinary.com/hibarr/image/upload/v1766086547/11_fjsddq.webp',
  'https://res.cloudinary.com/hibarr/image/upload/v1766086546/4_tsfsqt.webp',
]

export const gecitkaleConsultationContent: GecitkaleConsultationContent = {
  en: {
    title: 'Invest now at pre-sales prices',
    subtitle: 'Affordable investment opportunity in North Cyprus',
    features: [
      'From £10,750 down payment',
      '£600/month - 0% interest (48 months)',
      'No broker commission',
      'Full privacy - outside of the EU'
    ],
    images: images,
    form: {
      title: 'Request a consultation now',
      subtitle: 'Your details will be used exclusively to plan and prepare your consultation for the Cielo Vista project. Your data will not be passed on to third parties for advertising purposes',
      fields: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        phoneNumber: 'Phone Number',
        interestReason: 'What sparked your interest in this investment opportunity today?',
        interestReasonOther: 'Please specify',
        investmentTimeline: 'When do you plan to invest?',
      },
      options: {
        interestReasons: [
          { label: 'Pension capital not growing', value: 'Pension capital not growing' },
          { label: 'Inflation protection', value: 'Inflation protection' },
          { label: 'Passive income', value: 'Passive income' },
          { label: 'Diversifying outside the EU', value: 'Diversifying outside the EU' },
          { label: 'Attractive pricing', value: 'Attractive pricing' },
        ],
        investmentTimelines: [
          { label: 'As soon as possible', value: 'As soon as possible' },
          { label: 'Within 3 months', value: 'Within 3 months' },
          { label: 'Within 6–12 months', value: 'Within 6–12 months' },
          { label: 'I\'m still researching', value: 'I\'m still researching' },
        ],
      },
      placeholders: {
        interestReasonOther: 'Please specify',
        chooseOne: 'Choose one',
      },
      validationMessages: {
        firstName: 'First name is required',
        lastName: 'Last name is required',
        email: 'Email is required',
        emailInvalid: 'Invalid email address',
        phoneNumber: 'Phone number is required',
        interestReason: 'Please select an interest reason',
        interestReasonOther: 'Please specify your reason',
        investmentTimeline: 'Please select a timeline',
      },
      submitButton: 'Pick a time',
      dataPrivacy: 'I agree that HIBARR may contact me by phone and email to prepare my consultation and regarding the Cielo Vista project. I have read the Privacy Policy.',
    },
    imageAlt: {
      rabih: 'Picture of HIBARR Founder Rabih Rabih',
      project: 'Picture of CIELO Vista Resort Project'
    },
    caseStudiesTitle: 'Case Studies',
    caseStudiesDescription: 'See how our clients have benefited from investing in our projects',
    aboutRabih: {
      title: 'About Rabih Rabea',
      description: 'Rabih Rabea is the visionary founder and CEO of HIBARR, a leading company in the exclusive financial sector in Northern Cyprus. With over two decades of experience in the financial industry, Rabih has developed a profound understanding of the market, earning a reputation for expertise and innovative leadership.',
    },
    trust: [
      'More than 25 years of industry experience',
      'Over 1,000 satisfied clients',
      'Over €500 million in investment volume',
    ]
  },
  de: {
    title: 'Jetzt investieren zu Vorverkaufspreisen',
    subtitle: 'Erschwingliche Investitionsmöglichkeiten in Nordzypern',
    features: [
      'Ab £10,750 Anzahlung',
      '£600/Monat - 0% Zinsen (48 Monate)',
      'Keine Maklerprovision',
      'Vollständige Privatsphäre - außerhalb der EU'
    ],
    caseStudiesTitle: 'Fallstudien',
    caseStudiesDescription: 'Erfahren Sie, wie unsere Kunden durch Investitionen in unsere Projekte profitieren.',
    images: images,
    form: {
      title: 'Jetzt eine Beratungsanfrage stellen',
      subtitle: 'Ihre Angaben werden ausschließlich zur Planung und Vorbereitung Ihrer Beratung für das Projekt Cielo Vista verwendet. Ihre Daten werden nicht zu Werbezwecken an Dritte weitergegeben.',
      fields: {
        firstName: 'Vorname',
        lastName: 'Nachname',
        email: 'E-Mail-Adresse',
        phoneNumber: 'Telefonnummer',
        interestReason: 'Was hat Ihr Interesse an diesem Investitionsangebot heute ausgelöst?',
        interestReasonOther: 'Bitte spezifizieren',
        investmentTimeline: 'Wann planen Sie, zu investieren?',
      },
      options: {
        interestReasons: [
          { label: 'Rentenkapital wächst nicht', value: 'Pension capital not growing' },
          { label: 'Inflationsschutz', value: 'Inflation protection' },
          { label: 'Passives Einkommen', value: 'Passive income' },
          { label: 'Diversifizierung außerhalb der EU', value: 'Diversifying outside the EU' },
          { label: 'Attraktive Preise', value: 'Attractive pricing' },
        ],
        investmentTimelines: [
          { label: 'So schnell wie möglich', value: 'As soon as possible' },
          { label: 'Innerhalb von 3 Monaten', value: 'Within 3 months' },
          { label: 'Innerhalb von 6–12 Monaten', value: 'Within 6–12 months' },
          { label: 'Ich recherchiere noch', value: 'I\'m still researching' },
        ],
      },
      placeholders: {
        interestReasonOther: 'Bitte spezifizieren',
        chooseOne: 'Wählen Sie aus',
      },
      validationMessages: {
        firstName: 'Vorname ist erforderlich',
        lastName: 'Nachname ist erforderlich',
        email: 'E-Mail-Adresse ist erforderlich',
        emailInvalid: 'Ungültige E-Mail-Adresse',
        phoneNumber: 'Telefonnummer ist erforderlich',
        interestReason: 'Bitte wählen Sie einen Interessensgrund',
        interestReasonOther: 'Bitte geben Sie Ihren Grund an',
        investmentTimeline: 'Bitte wählen Sie einen Zeitrahmen',
      },
      submitButton: 'Zeit wählen',
      dataPrivacy: 'Ich erkläre mich hiermit einverstanden, dass HIBARR mich zur Vorbereitung meiner Beratung sowie in Bezug auf das Projekt Cielo Vista telefonisch und per E-Mail kontaktieren darf. Die Datenschutzerklärung habe ich gelesen.',
    },
    imageAlt: {
      rabih: 'Bild von HIBARR Gründer Rabih Rabih',
      project: 'Bild des CIELO Vista Resort Projekts'
    },
    aboutRabih: {
      title: 'Über Rabih Rabea',
      description: 'Rabih Rabea ist der visionäre Gründer und CEO von HIBARR, einem führenden Unternehmen im exklusiven Finanzsektor in Nordzypern. Mit über zwei Jahrzehnten Erfahrung in der Finanzbranche hat Rabih ein tiefgreifendes Verständnis des Marktes entwickelt und sich einen Ruf für Expertise und innovative Führung erworben.',
    },
    trust: [
      'Mehr als 25 Jahre Branchenerfahrung',
      'Über 1.000 zufriedene Kunden',
      'Über €500 Millionen Investitionsvolumen',
    ]
  },
  tr: {
    title: 'Şimdi ön satış fiyatlarıyla yatırım yapın',
    subtitle: 'Kuzey Kıbrıs\'ta uygun fiyatlı investitionsfırsatları',
    features: [
      '£10,750\'den başlayan azalışlı peşinat',
      '£600/ay - 0% faiz (48 ay)',
      'Maklermit götürmez',
      'Tam gizlilik - Avrupa Birliği dışında'
    ],
    caseStudiesTitle: 'Vaka Çalışmaları',
    caseStudiesDescription: 'Müşterilerimizin projelerimize yatırım yaparak nasıl fayda sağladığını keşfedin.',  
    images: images,
    form: {
      title: 'Şimdi ön satış fiyatlarıyla yatırım yapın',
      subtitle: 'Verileriniz yalnızca Cielo Vista projesi için planlama ve hazırlık için kullanılacaktır. Verileriniz reklam amaçlı üçüncü taraflara aktarılmayacaktır',
      fields: {
        firstName: 'Adı',
        lastName: 'Soyadı',
        email: 'E-Posta Adresi',
        phoneNumber: 'Telefon Numarası',
        interestReason: 'Bu yatırım fırsatına bugün neden ilgi duyduğunuzu belirtiniz?',
        interestReasonOther: 'Lütfen belirtiniz',
        investmentTimeline: 'Yatırım planınız ne zaman olacak?',
      },
      options: {
        interestReasons: [
          { label: 'Emeklilik sermayesi büyümüyor', value: 'Pension capital not growing' },
          { label: 'Enflasyona karşı korunma', value: 'Inflation protection' },
          { label: 'Pasif gelir', value: 'Passive income' },
          { label: 'AB dışında çeşitlendirme', value: 'Diversifying outside the EU' },
          { label: 'Cazip fiyatlandırma', value: 'Attractive pricing' },
        ],
        investmentTimelines: [
          { label: 'Mümkün olan en kısa sürede', value: 'As soon as possible' },
          { label: '3 ay içinde', value: 'Within 3 months' },
          { label: '6–12 ay içinde', value: 'Within 6–12 months' },
          { label: 'Hala araştırıyorum', value: 'I\'m still researching' },
        ],
      },
      placeholders: {
        interestReasonOther: 'Lütfen belirtiniz',
        chooseOne: 'Seçiniz',
      },
      validationMessages: {
        firstName: 'Ad gereklidir',
        lastName: 'Soyad gereklidir',
        email: 'E-posta adresi gereklidir',
        emailInvalid: 'Geçersiz e-posta adresi',
        phoneNumber: 'Telefon numarası gereklidir',
        interestReason: 'Lütfen bir ilgi nedeni seçiniz',
        interestReasonOther: 'Lütfen nedeninizi belirtiniz',
        investmentTimeline: 'Lütfen bir zaman çerçevesi seçiniz',
      },
      submitButton: 'Zaman seç',
      dataPrivacy: 'HIBARR\'a telefon ve e-posta ile ulaşabileceğimi ve Cielo Vista projesine ilişkin benimle görüşmeyi planlamam ve bu konuda benimle iletişime geçebileceğimi onaylıyorum. Gizlilik Politikası\'nı okudum.',
    },
    imageAlt: {
      rabih: 'HIBARR Kurucusu Rabih Rabih\'in resmi',
      project: 'CIELO Vista Resort Projesi\'nin resmi'
    },
    aboutRabih: {
      title: 'Rabih Rabea Hakkında',
      description: 'Rabih Rabea, Kuzey Kıbrıs\'taki özel finans sektöründe lider bir şirket olan HIBARR\'ın vizyoner kurucusu ve CEO\'sudur. Finans sektöründe yirmi yılı aşkın deneyime sahip olan Rabih, pazara derin bir anlayış geliştirmiş ve uzmanlık ve yenilikçi liderlik konusunda bir üne kavuşmuştur.',
    },
    trust: [
      '25 yıldan fazla sektör deneyimi',
      '1.000\'den fazla memnun müşteri',
      '€500 milyondan fazla yatırım hacmi',
    ]
  },
  ru: {
    title: 'Инвестируйте сейчас по ценам предпродажи',
    subtitle: 'Доступные инвестиционные возможности на Северном Кипре по ценам предпродажи',
    features: [
      'От £10,750 начального взноса',
      '£600/месяц - 0% процентов (48 месяцев)',
      'Без комиссии брокера',
      'Полная конфиденциальность - вне ЕС'
    ],
    images: images,
    caseStudiesTitle: 'Кейсы',
    caseStudiesDescription: 'Узнайте, как наши клиенты получили выгоду, инвестируя в наши проекты.',
    form: {
      title: 'Запросить консультацию сейчас',
      subtitle: 'Ваши данные будут использоваться исключительно для планирования и подготовки вашей консультации по проекту Cielo Vista. Ваши данные не будут переданы третьим лицам для рекламных целей',
      fields: {
        firstName: 'Имя',
        lastName: 'Фамилия',
        email: 'Электронная почта',
        phoneNumber: 'Телефонный номер',
        interestReason: 'Почему вы заинтересовались этой инвестиционной возможностью сегодня?',
        interestReasonOther: 'Пожалуйста, укажите',
        investmentTimeline: 'Когда вы планируете инвестировать?',
      },
      options: {
        interestReasons: [
          { label: 'Пенсионный капитал не растет', value: 'Pension capital not growing' },
          { label: 'Защита от инфляции', value: 'Inflation protection' },
          { label: 'Пассивный доход', value: 'Passive income' },
          { label: 'Диверсификация вне ЕС', value: 'Diversifying outside the EU' },
          { label: 'Привлекательные цены', value: 'Attractive pricing' },
        ],
        investmentTimelines: [
          { label: 'Как можно скорее', value: 'As soon as possible' },
          { label: 'В течение 3 месяцев', value: 'Within 3 months' },
          { label: 'В течение 6–12 месяцев', value: 'Within 6–12 months' },
          { label: 'Я все еще изучаю', value: 'I\'m still researching' },
        ],
      },
      placeholders: {
        interestReasonOther: 'Пожалуйста, укажите',
        chooseOne: 'Выберите один',
      },
      validationMessages: {
        firstName: 'Имя обязательно',
        lastName: 'Фамилия обязательна',
        email: 'Электронная почта обязательна',
        emailInvalid: 'Неверный адрес электронной почты',
        phoneNumber: 'Телефонный номер обязателен',
        interestReason: 'Пожалуйста, выберите причину интереса',
        interestReasonOther: 'Пожалуйста, укажите вашу причину',
        investmentTimeline: 'Пожалуйста, выберите временные рамки',
      },
      submitButton: 'Выбрать время',
      dataPrivacy: 'Я согласен(на), что HIBARR может связаться со мной по телефону и электронной почте для подготовки моей консультации и в отношении проекта Cielo Vista. Я прочитал(а) политику конфиденциальности.',
    },
    imageAlt: {
      rabih: 'Фотография основателя HIBARR Рабиха Рабиха',
      project: 'Фотография проекта CIELO Vista Resort'
    },
    aboutRabih: {
      title: 'О Рабихе Рабее',
      description: 'Рабих Рабеа является дальновидным основателем и генеральным директором HIBARR, ведущей компании в эксклюзивном финансовом секторе на Северном Кипре. Обладая более чем двадцатилетним опытом работы в финансовой индустрии, Рабих развил глубокое понимание рынка, заслужив репутацию эксперта и инновационного лидера.',
    },
    trust: [
      'Более 25 лет опыта в отрасли',
      'Более 1 000 довольных клиентов',
      'Более €500 миллионов инвестиционного объема',
    ]
  }
}