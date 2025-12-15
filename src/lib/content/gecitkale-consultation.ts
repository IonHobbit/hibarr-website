import { Locale } from "../i18n-config";

type GecitkaleConsultationContent = {
  [key in Locale]: {
    title: string;
    subtitle: string;
    features: string[];
    form: {
      title: string;
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

export const gecitkaleConsultationContent: GecitkaleConsultationContent = {
  en: {
    title: 'Invest now at pre-sales prices',
    subtitle: 'Affordable resort-style real estate in North Cyprus',
    features: [
      'From €12,300 down payment',
      '€680/month - 0% interest (48 months)',
      'No broker commission',
      'Full privacy - outside of the EU'
    ],
    form: {
      title: 'Request a consultation now',
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
          { label: 'Rental income', value: 'Rental income' },
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
      submitButton: 'Book now',
      dataPrivacy: '100% privacy: Your data will not be shared',
    },
    imageAlt: {
      rabih: 'Picture of HIBARR Founder Rabih Rabih',
      project: 'Picture of CIELO Vista Resort Project'
    },
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
    title: 'Jetzt investieren bei Vorverkaufspreisen',
    subtitle: 'Günstige Resort-Stil-Immobilien in Nordzypern',
    features: [
      'Von €12,300 abzahlbarer Anzahlung',
      '€680/Monat - 0% Zinsen (48 Monate)',
      'Keine Maklermission',
      'Vollständige Privatsphäre - außerhalb der EU'
    ],
    form: {
      title: 'Jetzt eine Beratungsanfrage stellen',
      fields: {
        firstName: 'Vorname',
        lastName: 'Nachname',
        email: 'E-Mail-Adresse',
        phoneNumber: 'Telefonnummer',
        interestReason: 'Was hat Ihre Interesse an diesem Investitionsangebot heute ausgelöst?',
        interestReasonOther: 'Bitte spezifizieren',
        investmentTimeline: 'Wann planen Sie, zu investieren?',
      },
      options: {
        interestReasons: [
          { label: 'Rentenkapital wächst nicht', value: 'Pension capital not growing' },
          { label: 'Inflationsschutz', value: 'Inflation protection' },
          { label: 'Mieteinnahmen', value: 'Rental income' },
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
        chooseOne: 'Wählen Sie eins',
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
      submitButton: 'Jetzt eine Beratungsanfrage stellen',
      dataPrivacy: '100% Privatsphäre: Ihre Daten werden nicht geteilt',
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
    subtitle: 'Kuzey Kıbrıs\'ta uygun fiyatlı resort-stilinde gerçek bir emlak',
    features: [
      '€12,300\'den başlayan azalışlı peşinat',
      '€680/ay - 0% faiz (48 ay)',
      'Maklermit götürmez',
      'Tam gizlilik - Avrupa Birliği dışında'
    ],
    form: {
      title: 'Şimdi ön satış fiyatlarıyla yatırım yapın',
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
          { label: 'Kira geliri', value: 'Rental income' },
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
      submitButton: 'Şimdi ön satış fiyatlarıyla yatırım yapın',
      dataPrivacy: '%100 gizlilik: Verileriniz paylaşılmayacak',
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
    title: 'Запишитесь на бесплатную консультацию по недвижимости',
    subtitle: 'Доступная недвижимость в Северном Кипре по ценам предпродажи',
    features: [
      'От €12,300 начального взноса',
      '€680/месяц - 0% процентов (48 месяцев)',
      'Без комиссии брокера',
      'Полная конфиденциальность - вне ЕС'
    ],
    form: {
      title: 'Запишитесь на бесплатную консультацию по недвижимости',
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
          { label: 'Арендный доход', value: 'Rental income' },
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
      submitButton: 'Записаться на консультацию',
      dataPrivacy: '100% конфиденциальность: Ваши данные не будут переданы',
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