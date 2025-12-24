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
    description: 'Schließen Sie sich einem Team an, das in einer strukturierten Umgebung mit internationalen Standards arbeitet.',
    applyNow: 'Jetzt Bewerben',
    ourOpenPositions: 'Unsere Offenen Stellen',
    exploreOpenRolesDescription: 'Entdecken Sie offene Stellen und bewerben Sie sich bei unserem Team',
    exploreOpenRoles: 'Entdecken Sie offene Stellen und bewerben Sie sich bei unserem Team',
    noOpenPositions: 'Keine offenen Stellen zur Zeit.',
    pleaseCheckBackLater: 'Bitte prüfen Sie später erneut.',
    submitApplication: 'Bewerben Sie sich',
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
      responsibilities: 'Verantwortlichkeiten',
      requirements: 'Anforderungen',
      minimumExperience: 'Mindesterfahrung',
      applyForThisRole: 'Für diese Stelle bewerben',
      backToCareers: 'Zurück zu den offenen Stellen',
    },
  },
  tr: {
    title: 'HIBARR’da Kariyer',
    description: 'Açık pozisyonları keşfedin ve bize katılın',
    applyNow: 'Şimdi Başvur',
    ourOpenPositions: 'Açık Pozisyonlar',
    exploreOpenRolesDescription: 'Açık pozisyonları keşfedin ve bize katılın',
    exploreOpenRoles: 'Açık pozisyonları keşfedin ve bize katılın',
    noOpenPositions: 'Şu anda açık pozisyon yok.',
    pleaseCheckBackLater: 'Lütfen daha sonra tekrar deneyin.',
    submitApplication: 'Başvur',
    applicationForm: {
      title: 'Bu pozisyon için başvur',
      firstName: 'Adı',
      lastName: 'Soyadı',
      email: 'E-Mail Adresi',
      phone: 'Telefon (optional)',
      resume: 'Lebenslauf / CV',
    },
    detailContent: {
      description: 'Stellenbeschreibung',
      responsibilities: 'Verantwortlichkeiten',
      requirements: 'Anforderungen',
      minimumExperience: 'Mindesterfahrung',
      applyForThisRole: 'Für diese Stelle bewerben',
      backToCareers: 'Zurück zu den offenen Stellen',
    },
  },
  ru: {
    title: 'Карьера в HIBARR',
    description: 'Присоединяйтесь к команде, которая работает в структурированной среде с международными стандартами.',
    applyNow: 'Применить сейчас',
    ourOpenPositions: 'Наши открытые позиции',
    exploreOpenRolesDescription: 'Присоединяйтесь к команде, которая работает в структурированной среде с международными стандартами.',
    exploreOpenRoles: 'Присоединяйтесь к команде, которая работает в структурированной среде с международными стандартами.',
    noOpenPositions: 'На данный момент нет открытых позиций.',
    pleaseCheckBackLater: 'Пожалуйста, проверьте позже.',
    submitApplication: 'Применить сейчас',
    applicationForm: {
      title: 'Применить на эту должность',
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Email Address',
      phone: 'Phone (optional)',
      resume: 'Resume / CV',
    },
    detailContent: {
      description: 'Присоединяйтесь к команде, которая работает в структурированной среде с международными стандартами.',
      responsibilities: 'Ответственности',
      requirements: 'Требования',
      minimumExperience: 'Минимальный опыт',
      applyForThisRole: 'Применить на эту должность',
      backToCareers: 'Назад к открытым позициям',
    },
  },
}