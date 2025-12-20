import { Locale } from "../i18n-config";

type TeamContent = {
	[key in Locale]: {
		leadershipTeamTitle: string;
		leadershipTeamDescription: string;
		legalTeamTitle: string;
		legalTeamDescription: string;
	}
}

export const teamContent: TeamContent = {
	en: {
		leadershipTeamTitle: 'Our Leadership Team',
		leadershipTeamDescription: 'Our leadership team brings deep market expertise, innovation, and international property knowledge to help you invest with confidence in North Cyprus',
		legalTeamTitle: 'Our Legal Team',
		legalTeamDescription: 'Get to know the team that makes it happen.',
	},
	de: {
		leadershipTeamTitle: 'Unser Führungsteam',
		leadershipTeamDescription: 'Unser Führungsteam vereint fundierte Marktkenntnisse, Innovationskraft und internationale Immobilienexpertise, um Ihnen eine sichere Investition in Nordzypern zu ermöglichen.',
		legalTeamTitle: 'Unser Rechtsteam',
		legalTeamDescription: 'Lernen Sie das Team kennen, das alles möglich macht.',
	},
	tr: {
		leadershipTeamTitle: 'Liderlik Ekibimiz',
		leadershipTeamDescription: 'Liderlik ekibimiz, Kuzey Kıbrıs’ta güvenle yatırım yapabilmeniz için derin pazar bilgisi, yenilikçi yaklaşım ve uluslararası gayrimenkul deneyimi sunar.',
		legalTeamTitle: 'Hukuk Ekibimiz',
		legalTeamDescription: 'Bu süreci mümkün kılan ekibi yakından tanıyın.',
	},
	ru: {
		leadershipTeamTitle: 'Наша руководящая команда',
		leadershipTeamDescription: 'Наша руководящая команда сочетает глубокое знание рынка, инновационный подход и международную экспертизу в сфере недвижимости, чтобы вы могли инвестировать в Северный Кипр с уверенностью.',
		legalTeamTitle: 'Наша юридическая команда',
		legalTeamDescription: 'Познакомьтесь с командой, которая делает это возможным.',
	},
}