import { ZapierConsultationPayload, ZapierUglaPayload, ZapierWebinarPayload, ZapierPropertyEnquiryPayload, ZapierSignupPayload, ZapierWaitlistPayload } from "@/types/main"

type ZapierPayload = ZapierUglaPayload | ZapierConsultationPayload | ZapierWebinarPayload | ZapierPropertyEnquiryPayload | ZapierSignupPayload | ZapierWaitlistPayload

const callZapierWebhook = async (payload: ZapierPayload) => {
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