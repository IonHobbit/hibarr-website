import { WebinarRegistrationForm } from "@/types/main";

const registerWebinar = async (payload: WebinarRegistrationForm) => {
    try {
        const response = await fetch('https://staging.api.hibarr.net/registration/webinar', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '363769e1290c4d5ea6d351ef8c23dc6e',
            },
            mode: 'cors',
            credentials: 'omit',
        })
        return response.json()
    } catch (error) {
        console.error(error)
    }
}

export { registerWebinar }