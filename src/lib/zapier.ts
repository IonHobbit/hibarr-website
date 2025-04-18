import { ZapierConsultationPayload, ZapierUglaPayload, ZapierWebinarPayload } from "@/types/main"

const callZapierWebhook = async (payload: ZapierUglaPayload | ZapierConsultationPayload | ZapierWebinarPayload) => {
  try {
    const response = await fetch('https://hooks.zapier.com/hooks/catch/21571202/20j64i8/', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return response.json()
  } catch (error) {
    console.error(error)
  }
}

export { callZapierWebhook }