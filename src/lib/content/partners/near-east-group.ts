import type { Locale } from '@/lib/i18n-config';

type NearEastGroupContent = {
  [key in Locale]: {
    about: string;
    trustSignals: string[];
    investorBenefits: string;
    history: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  }
}

export const nearEastGroupContent = {
  en: {
    about:
      "The Near East Group is not just a business conglomerate; it is a foundational pillar of Northern Cyprus's economy and society. With a history spanning over three decades, the group has pioneered developments in education, finance, healthcare, and tourism. Partnering with Near East Group means investing in a legacy of trust, innovation, and unwavering commitment to quality. Their ecosystem is integrated, meaning real estate investors benefit from associated banking, legal, and lifestyle privileges that standalone developers simply cannot offer.",
    trustSignals: [
      'Over 35 years of trusted operational history',
      "Owners of the largest university and hospital in the region",
      'Award-winning banking and financial services division',
      'A verified track record of delivering high-yield real estate projects on time',
    ],
    investorBenefits:
      "For our investors, this partnership translates to security and exclusivity. You gain access to pre-launch allocations, preferred mortgage rates through Near East Bank, and rental guarantees backed by the consistent demand from the university and hospital ecosystem. It is an investment shielded by the strongest corporate infrastructure on the island.",
    history:
      'Founded in 1988, Near East Group began with a vision to transform education in Cyprus. Today, it stands as the largest private employer in the TRNC, having expanded from the iconic Near East University to include a state-of-the-art University Hospital, a full-service Bank, and a portfolio of luxury developments. This trajectory of growth mirrors the rising value of the region itself.',
    faqs: [
      {
        question: 'Why invest with Near East Group?',
        answer:
          "Investing with Near East guarantees that you are backed by the island's most robust financial and operational infrastructure, minimising risk and maximizing long-term value.",
      },
      {
        question: 'Can I get financing through Near East Bank?',
        answer:
          'Yes, exclusive to this partnership, international investors can access mortgage products and financing options directly through Near East Bank.',
      },
    ],
  },
  de: {
    about:
      'Die Near East Group ist nicht nur ein Unternehmenskonglomerat; sie ist ein Grundpfeiler der Wirtschaft und Gesellschaft Nordzyperns. Mit einer über 30-jährigen Geschichte leistet die Gruppe Pionierarbeit in den Bereichen Bildung, Finanzen, Gesundheitswesen und Tourismus. Eine Partnerschaft mit der Near East Group bedeutet eine Investition in ein Vermächtnis aus Vertrauen, Innovation und unerschütterlichem Qualitätsanspruch.',
    trustSignals: [
      'Über 35 Jahre vertrauenswürdige Unternehmensgeschichte',
      'Eigentümer der größten Universität und des größten Krankenhauses der Region',
      'Preisgekrönte Bank- und Finanzdienstleistungssparte',
      'Nachgewiesene Erfolgsbilanz bei der pünktlichen Übergabe von Projekten',
    ],
    investorBenefits:
      'Für unsere Investoren bedeutet diese Partnerschaft Sicherheit und Exklusivität. Sie erhalten Zugang zu Pre-Launch-Zuteilungen, bevorzugten Hypothekenzinsen über die Near East Bank und Mietgarantien, die durch die stetige Nachfrage des Universitäts- und Krankenhaus-Ökosystems abgesichert sind.',
    history:
      'Die Near East Group wurde 1988 mit der Vision gegründet, die Bildung in Zypern zu transformieren. Heute ist sie der größte private Arbeitgeber in der TRNC und hat sich von der ikonischen Near East University zu einem hochmodernen Universitätsklinikum, einer Vollbank und einem Portfolio an Luxusentwicklungen erweitert.',
    faqs: [
      {
        question: 'Warum mit der Near East Group investieren?',
        answer:
          'Eine Investition bei Near East garantiert Ihnen den Rückhalt durch die robusteste finanzielle und operative Infrastruktur der Insel, was Risiken minimiert.',
      },
      {
        question: 'Kann ich über die Near East Bank finanzieren?',
        answer:
          'Ja, exklusiv für diese Partnerschaft können internationale Investoren Hypothekenprodukte und Finanzierungsoptionen direkt nutzen.',
      },
    ],
  },
  tr: {
    about:
      'Near East Group sadece bir şirketler topluluğu değil, Kuzey Kıbrıs ekonomisinin ve toplumunun temel direğidir. Eğitim, finans, sağlık ve turizm alanlarında 30 yılı aşkın bir geçmişe sahip olan grup, kalite ve güvenin simgesidir.',
    trustSignals: [
      '35 yılı aşkın güvenilir işletme geçmişi',
      'Bölgenin en büyük üniversitesi ve hastanesinin sahibi',
      'Ödüllü bankacılık ve finans hizmetleri',
      'Projeleri zamanında teslim etme konusunda kanıtlanmış başarı',
    ],
    investorBenefits:
      'Yatırımcılarımız için bu ortaklık güvenlik ve ayrıcalık anlamına gelir. Near East Bank aracılığıyla tercihli kredi oranlarına ve üniversite ekosisteminden gelen sürekli talep ile desteklenen kira garantilerine erişim sağlarsınız.',
    history:
      "1988 yılında kurulan Near East Group, Yakın Doğu Üniversitesi ile başlayan yolculuğunu bugün hastane, banka ve lüks konut projeleriyle genişleterek KKTC'nin en büyük özel işvereni haline gelmiştir.",
    faqs: [
      {
        question: 'Neden Near East Group ile yatırım yapmalısınız?',
        answer:
          'Near East ile yatırım yapmak, adanın en güçlü finansal ve operasyonel altyapısı tarafından desteklenmek demektir.',
      },
      {
        question: 'Near East Bank üzerinden finansman sağlayabilir miyim?',
        answer:
          'Evet, bu ortaklığa özel olarak uluslararası yatırımcılar doğrudan finansman seçeneklerinden yararlanabilir.',
      },
    ],
  },
  ru: {
    about:
      'Near East Group — это не просто конгломерат, это фундамент экономики Северного Кипра. С историей более 30 лет группа является пионером в образовании, финансах и медицине. Партнерство с Near East Group означает инвестиции в надежность и качество.',
    trustSignals: [
      'Более 35 лет безупречной репутации',
      'Владелец крупнейшего университета и больницы в регионе',
      'Награды в сфере банковских услуг',
      'Доказанная история сдачи проектов в срок',
    ],
    investorBenefits:
      'Для инвесторов это означает безопасность. Вы получаете доступ к льготной ипотеке через Near East Bank и гарантии аренды, обеспеченные спросом со стороны университета.',
    history:
      'Основанная в 1988 году, группа выросла от университета до крупнейшего частного работодателя ТРСК, включая банк, больницу и элитную недвижимость.',
    faqs: [
      {
        question: 'Почему стоит инвестировать с Near East Group?',
        answer:
          'Инвестиции с Near East гарантируют поддержку самой мощной инфраструктурой острова.',
      },
      {
        question: 'Могу ли я получить финансирование?',
        answer:
          'Да, международные инвесторы могут получить ипотеку напрямую через Near East Bank.',
      },
    ],
  },
} as NearEastGroupContent;
