import type { Locale } from '@/lib/i18n-config';
import type { ExpandedTestimonial } from '@/lib/content/expanded-content.types';

export const EXPANDED_TESTIMONIALS_BY_LOCALE = {
  en: [
    {
      clientName: 'Sarah Thompson',
      role: 'Property Investor, UK',
      comment:
        "I was initially hesitant about investing abroad, but the transparency and guidance from the team were exceptional. They didn't just sell me a property; they educated me on the market. The rental yield has exceeded my expectations, consistently delivering over 8% annually. I've since purchased a second unit.",
      image:
        'https://res.cloudinary.com/hibarr/image/upload/v1/testimonials/sarah.jpg',
      date: '2024-03-15',
    },
    {
      clientName: 'Michael Weber',
      role: 'Retiree, Germany',
      comment:
        'Finding a dream home for retirement is stressful, but the personalized verified listings made it easy. The team handled everything from the title deed transfer to setting up my utilities. Now, I wake up to a sea view every morning. It was the best decision for my golden years.',
      image:
        'https://res.cloudinary.com/hibarr/image/upload/v1/testimonials/michael.jpg',
      date: '2024-01-22',
    },
    {
      clientName: 'Elena Rostova',
      role: 'Entrepreneur, Russia',
      comment:
        "I needed a fast and reliable banking setup for my business relocation. The 'Pro' package was a lifesaver. Within days, I had my accounts operational and my residency application in progress. The professionalism and speed are unmatched in the region.",
      image:
        'https://res.cloudinary.com/hibarr/image/upload/v1/testimonials/elena.jpg',
      date: '2023-11-10',
    },
    {
      clientName: 'Ahmed Al-Fayed',
      role: 'Real Estate Developer, UAE',
      comment:
        'As a developer myself, I look for fundamentals. The partnership with Near East Group convinced me. The build quality, the strategic locations near the university, and the clear legal framework provided exactly the security I look for in an asset class.',
      date: '2023-09-05',
    },
  ],
  de: [
    {
      clientName: 'Sarah Thompson',
      role: 'Immobilieninvestorin, UK',
      comment:
        'Anfangs zögerte ich, im Ausland zu investieren, aber die Transparenz und Beratung des Teams waren außergewöhnlich. Sie haben mir nicht nur eine Immobilie verkauft, sondern mich über den Markt aufgeklärt. Die Mietrendite hat meine Erwartungen übertroffen und liegt konstant bei über 8% jährlich.',
      date: '2024-03-15',
    },
    {
      clientName: 'Michael Weber',
      role: 'Rentner, Deutschland',
      comment:
        'Ein Traumhaus für den Ruhestand zu finden ist stressig, aber die personalisierten Angebote machten es einfach. Das Team kümmerte sich um alles, von der Eigentumsübertragung bis zur Anmeldung der Versorger. Jetzt wache ich jeden Morgen mit Meerblick auf.',
      date: '2024-01-22',
    },
    {
      clientName: 'Elena Rostova',
      role: 'Unternehmerin, Russland',
      comment:
        "Ich brauchte eine schnelle und zuverlässige Banklösung für meinen Firmenumzug. Das 'Pro'-Paket war meine Rettung. Innerhalb von Tagen waren meine Konten einsatzbereit. Die Professionalität und Geschwindigkeit sind in der Region unübertroffen.",
      date: '2023-11-10',
    },
    {
      clientName: 'Ahmed Al-Fayed',
      role: 'Immobilienentwickler, VAE',
      comment:
        'Als Entwickler achte ich auf Fundamentaldaten. Die Partnerschaft mit der Near East Group hat mich überzeugt. Die Bauqualität, die strategischen Lagen nahe der Universität und der klare rechtliche Rahmen boten genau die Sicherheit, die ich suche.',
      date: '2023-09-05',
    },
  ],
  tr: [
    {
      clientName: 'Sarah Thompson',
      role: 'Gayrimenkul Yatırımcısı, İngiltere',
      comment:
        'Yurtdışında yatırım yapma konusunda başta tereddütlüydüm ama ekibin şeffaflığı ve rehberliği olağanüstüydü. Bana sadece bir mülk satmadılar, piyasa hakkında eğittiler. Kira getirisi beklentilerimi aştı.',
      date: '2024-03-15',
    },
    {
      clientName: 'Michael Weber',
      role: 'Emekli, Almanya',
      comment:
        'Emeklilik için hayalimdeki evi bulmak zordu ama kişiselleştirilmiş listeler işimi kolaylaştırdı. Tapu devrinden fatura aboneliklerine kadar her şeyi hallettiler.',
      date: '2024-01-22',
    },
  ],
  ru: [
    {
      clientName: 'Sarah Thompson',
      role: 'Инвестор, Великобритания',
      comment:
        'Я сомневалась насчет инвестиций за границей, но прозрачность команды меня успокоила. Арендная доходность превысила 8% годовых.',
      date: '2024-03-15',
    },
    {
      clientName: 'Elena Rostova',
      role: 'Предприниматель, Россия',
      comment:
        "Мне нужно было быстро открыть счета для релокации бизнеса. Пакет 'Pro' спас ситуацию. Все было готово за несколько дней. Профессионализм на высшем уровне.",
      date: '2023-11-10',
    },
  ],
} satisfies Record<Locale, ExpandedTestimonial[]>;
