import { EventRequest, ServerEvent, UserData } from "facebook-nodejs-business-sdk";
import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { cookies } from "next/headers";

const accessToken = process.env.META_ACCESS_TOKEN;
const accountId = process.env.META_ACCOUNT_ID;

// const facebookAdsAPI = FacebookAdsApi.init(accessToken!);

const hash = (value: string) => {
  if (!value) return '';
  return createHash('sha256').update(value).digest('hex');
}

export async function POST(req: Request): Promise<NextResponse> {
  const currentTime = Math.floor(Date.now() / 1000);
  const cookieStore = await cookies();
  const { email, firstName, lastName, phone } = await req.json();

  const clickID = cookieStore.get('_fbc')?.value || '';
  const browserID = cookieStore.get('_fbp')?.value || '';

  const userData = new UserData()
    .setEmails([hash(email)])
    .setPhones([hash(phone)])
    .setFirstNames([hash(firstName)])
    .setLastNames([hash(lastName)])
    .setFbc(clickID)
    .setFbp(browserID)
    .setClientIpAddress(req.headers.get('x-forwarded-for') || '')
    .setClientUserAgent(req.headers.get('user-agent') || '')

  const serverEvent = new ServerEvent()
    .setUserData(userData)
    .setEventName("Consultation")
    .setEventTime(currentTime)
    .setActionSource("website")
    .setEventSourceUrl(req.url)
    .setActionSource("website")

  const eventsData = [serverEvent];

  const eventRequest = new EventRequest(accessToken!, accountId!, eventsData);

  const response = await eventRequest.execute();

  return NextResponse.json({
    success: true,
    message: "Event sent successfully",
    data: response,
  });
}
