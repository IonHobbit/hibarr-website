import { Locale } from "../i18n-config";

type CareersContent = {
  [key in Locale]: {
    title: string;
    description: string;
    applyNow: string;
    ourOpenPositions: string;
    exploreOpenRolesDescription: string;
    exploreOpenRoles: string;
    noOpenPositions: string;
    pleaseCheckBackLater: string;
    submitApplication: string;
    applicationForm: {
      title: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      resume: string;
    }
    detailContent: {
      description: string;
      responsibilities: string;
      requirements: string;
      minimumExperience: string;
      applyForThisRole: string;
      backToCareers: string;
    }
  }
}

export const careersContent: CareersContent = {
  en: {
    title: 'Elevate Your Career at HIBARR',
    description: 'Join a team that works in a structured environment with international standards.',
    applyNow: 'Apply Now',
    ourOpenPositions: 'Our Open Positions',
    exploreOpenRolesDescription: 'Explore open roles and apply to join our team',
    exploreOpenRoles: 'Explore open roles and apply to join our team',
    noOpenPositions: 'No open positions at the moment.',
    pleaseCheckBackLater: 'Please check back later.',
    submitApplication: 'Submit Application',
    applicationForm: {
      title: 'Apply for this role',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone (optional)',
      resume: 'Resume / CV',
    },
    detailContent: {
      description: 'Job description',
      responsibilities: 'Responsibilities',
      requirements: 'Requirements',
      minimumExperience: 'Minimum Experience',
      applyForThisRole: 'Apply for this role',
      backToCareers: 'Back to Open Positions',
    },
  },
  de: {
    title: 'Karriere bei HIBARR',
    description: 'Schließen Sie sich einem Team an, das in einem strukturierten Umfeld nach internationalen Standards arbeitet.',
    applyNow: 'Jetzt bewerben',
    ourOpenPositions: 'Unsere offenen Stellen',
    exploreOpenRolesDescription: 'Entdecken Sie offene Stellen und werden Sie Teil unseres Teams',
    exploreOpenRoles: 'Offene Stellen erkunden',
    noOpenPositions: 'Aktuell sind keine offenen Stellen verfügbar.',
    pleaseCheckBackLater: 'Bitte schauen Sie zu einem späteren Zeitpunkt wieder vorbei.',
    submitApplication: 'Bewerbung absenden',
    applicationForm: {
      title: 'Für diese Stelle bewerben',
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail-Adresse',
      phone: 'Telefon (optional)',
      resume: 'Lebenslauf / CV',
    },
    detailContent: {
      description: 'Stellenbeschreibung',
      responsibilities: 'Aufgabenbereich',
      requirements: 'Anforderungen',
      minimumExperience: 'Berufserfahrung (Mindestdauer)',
      applyForThisRole: 'Für diese Stelle bewerben',
      backToCareers: 'Zurück zu den offenen Stellen',
    },
  },
  tr: {
    title: 'HIBARR’da Kariyer',
    description: 'Uluslararası standartlarda, yapılandırılmış bir ortamda çalışan bir ekibe katılın.',
    applyNow: 'Şimdi Başvur',
    ourOpenPositions: 'Açık Pozisyonlarımız',
    exploreOpenRolesDescription: 'Açık pozisyonları keşfedin ve ekibimize katılmak için başvurun',
    exploreOpenRoles: 'Açık pozisyonları keşfedin',
    noOpenPositions: 'Şu anda açık pozisyon bulunmamaktadır.',
    pleaseCheckBackLater: 'Lütfen daha sonra tekrar kontrol edin.',
    submitApplication: 'Başvuruyu Gönder',
    applicationForm: {
      title: 'Bu pozisyon için başvur',
      firstName: 'Ad',
      lastName: 'Soyad',
      email: 'E-posta Adresi',
      phone: 'Telefon (isteğe bağlı)',
      resume: 'Özgeçmiş / CV',
    },
    detailContent: {
      description: 'İş Tanımı',
      responsibilities: 'Sorumluluklar',
      requirements: 'Gereksinimler',
      minimumExperience: 'Minimum Deneyim',
      applyForThisRole: 'Bu pozisyona başvur',
      backToCareers: 'Açık Pozisyonlara Dön',
    },
  },
  ru: {
    title: 'Карьера в HIBARR',
    description: 'Присоединяйтесь к команде, работающей по международным стандартам в структурированной среде.',
    applyNow: 'Подать заявку',
    ourOpenPositions: 'Наши открытые вакансии',
    exploreOpenRolesDescription: 'Ознакомьтесь с открытыми вакансиями и присоединяйтесь к нашей команде',
    exploreOpenRoles: 'Посмотреть открытые вакансии',
    noOpenPositions: 'На данный момент нет открытых вакансий.',
    pleaseCheckBackLater: 'Пожалуйста, зайдите позже.',
    submitApplication: 'Отправить заявку',
    applicationForm: {
      title: 'Откликнуться на вакансию',
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Электронная почта',
      phone: 'Телефон (необязательно)',
      resume: 'Резюме / CV',
    },
    detailContent: {
      description: 'Описание вакансии',
      responsibilities: 'Обязанности',
      requirements: 'Требования',
      minimumExperience: 'Минимальный опыт',
      applyForThisRole: 'Откликнуться на эту роль',
      backToCareers: 'Назад к списку вакансий',
    },
  },
}